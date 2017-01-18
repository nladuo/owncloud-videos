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
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 * @return array
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

		$data = [];
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
		
		return ['videos' => $data];
	}
	
}