<?php
/**
 * ownCloud - videos
 *
 * @author kalen blue <kalen25115@gmail.com>
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
	   	['name' => 'api#getVideos', 'url' => '/api/get_videos', 'verb' => 'GET'],
	   	['name' => 'api#getThumbnail', 'url' => '/api/get_thumbnail', 'verb' => 'GET'],
    ]
];
