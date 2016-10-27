<?php
/**
 * ownCloud - videos
 *
 * @author kalen blue <kalen25115@gmail.com>
 * @copyright kalen blue 2016
 */
namespace OCA\Videos\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

class ApiController extends Controller {

	private $userId;

	public function __construct($AppName, IRequest $request, $UserId){
		parent::__construct($AppName, $request);
		$this->userId = $UserId;
	}

	/**
	 * @return DataResponse
	 */
	public function getVideos() {
		$videos = \OCP\Files::searchByMime('video');
		$list = array_filter(
			$videos,
			function($item){
				if (strpos($item['path'], '_trashbin')===0){
					return false;
				}
				return true;
			}
		);

		$data = array();
		foreach ($list as $key=>$video) {
			$fileData = $video->getData();
			$data[$key]['fileid'] = $video->getId();
			$data[$key]['path'] = $fileData->getPath();
			$data[$key]['name'] = $video->getName();
			$data[$key]['etag'] = $video->getEtag();
			$data[$key]['size'] = $video->getSize();
			$data[$key]['mimetype'] = $video->getMimeType();
			$data[$key]['owner'] = $video->getOwner();
			$data[$key]['dir'] = rtrim($data[$key]['path'], $data[$key]['name']);
		}

		usort($data, function($a, $b){
			return @$b['mtime']-@$a['mtime'];
		});
		
		return new DataResponse(['data' => json_encode($data)]);
	}


	public function getThumbnail($fileid, $path) {

		$this->generateThumbnail($fileid, $path);
		$png_path = \OC::$SERVERROOT.'/apps/videos/thumbnails/' . $this->userId. '-' . $fileid . '.png';
		if (file_exists($png_path)) {
			$path = '/apps/videos/thumbnails/' . $this->userId. '-' . $fileid . '.png';
			return new DataResponse([
				'success' => true,
				'path' => $path
			]);
		} else {
			return new DataResponse([
				'success' => false,
				'path' => '/core/img/filetypes/video.svg'
			]);
		}
	}


	private function generateThumbnail($fileid, $path) {

		$config = new \OC\Config(\OC::$configDir);
		$datadirectory = $config->getValue('datadirectory', '');
		$video_path = $datadirectory . '/' . $this->userId .'/files'. $path;
		$png_path = \OC::$SERVERROOT.'/apps/videos/thumbnails/' . $this->userId. '-' . $fileid . '.png';

		// if the thumb exist and return
		if(file_exists($png_path)){
			return;
		}

		$exe = 'ffmpeg -y -ss 5 -i "' . $video_path
			. '" -vcodec png -vframes 1 -an -f rawvideo -vf scale=320:-1 "'.$png_path.'"';
		@shell_exec($exe);
	}
}