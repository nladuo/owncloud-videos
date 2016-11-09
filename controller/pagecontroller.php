<?php
/**
 * ownCloud - videos
 *
 *
 * @author kalen blue <kalen25115@gmail.com>
 * @copyright kalen blue 2016
 */

namespace OCA\Videos\Controller;

use OCP\IRequest;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Controller;

class PageController extends Controller {


	private $userId;

	public function __construct($AppName, IRequest $request, $UserId){
		parent::__construct($AppName, $request);
		$this->userId = $UserId;
	}

	/**
	 * @NoAdminRequired
	 * @NoCSRFRequired
	 */
	public function index() {
		$params = ['user' => $this->userId];
		return new TemplateResponse('videos', 'main', $params);  // templates/main.php
	}

}