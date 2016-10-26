<?php
/**
 * ownCloud - videos
 *
 * This file is licensed under the Affero General Public License version 3 or
 * later. See the COPYING file.
 *
 * @author kalen blue <1078239741@qq.com>
 * @copyright kalen blue 2016
 */

/**
 * Create your routes in here. The name is the lowercase name of the controller
 * without the controller part, the stuff after the hash is the method.
 * e.g. page#index -> OCA\Videos\Controller\PageController->index()
 *
 * The controller class has to be registered in the application.php file since
 * it's instantiated in there
 */
return [
    'routes' => [
	   	['name' => 'page#index', 'url' => '/', 'verb' => 'GET'],
	   	['name' => 'api#get_videos', 'url' => '/api/getVideos', 'verb' => 'POST'],
	   	['name' => 'api#get_thumbnail', 'url' => '/api/getThumbnail', 'verb' => 'POST'],
    ]
];
