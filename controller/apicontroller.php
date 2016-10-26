<?php
/**
 * Created by PhpStorm.
 * User: kalen
 * Date: 10/11/16
 * Time: 5:04 PM
 */
namespace OCA\Videos\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\Controller;

class ApiController extends Controller {
	/**
	 * Simply method that posts back the payload of the request
	 * @NoAdminRequired
	 */
	public function getVideos() {
		$videos = \OCP\Files::searchByMime('video');
		$list = array_filter(
			$videos,
			function($item){
				//filter Deleted
				if (strpos($item['path'], '_trashbin')===0){
					return false;
				}
				return true;
			}
		);

		$vids = array();
		foreach ($list as $key=>$vid) {
			$fileData = $vid->getData();
			$vids[$key]['fileid'] = $vid->getId();
			$vids[$key]['path'] = $fileData->getPath();
			$vids[$key]['name'] = $vid->getName();
			$vids[$key]['etag'] = $vid->getEtag();
			$vids[$key]['size'] = $vid->getSize();
			$vids[$key]['mimetype'] = $vid->getMimeType();
			$vids[$key]['owner'] = $vid->getOwner();
			$vids[$key]['dir'] = rtrim($vids[$key]['path'], $vids[$key]['name']);


			$vids[$key]['icon'] = preg_replace('/\.png$/', '.svg', \OCP\Template::mimetype_icon($vid['mimetype']));
			$vids[$key]['hasPreview'] = \OC::$server->getPreviewManager()->isMimeSupported($vid['mimetype']);
			$fileIds[] = $vid['fileid'];
		}

		usort($vids, function($a, $b){
			return @$b['mtime']-@$a['mtime'];
		});

		return new DataResponse(['data' => json_encode($vids)]);
	}
}