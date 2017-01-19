# owncloud-videos
An [ownCloud](https://owncloud.org/) videos app. 

## Dependency
1. [files_videoplayer](https://github.com/owncloud/files_videoplayer) <br>
2. [ffmpeg](http://ffmpeg.org/)

## Installation
1. enter ownCloud directory
  ```
  cd owncloud
  ```
2. clone the repository
  ```
  git clone https://github.com/nladuo/owncloud-videos.git .apps/videos/
  ```
3. add enable_previews in your config/config.php
  ``` php
  $CONFIG = array (
    'enable_previews' => true,
    'enabledPreviewProviders' => array(
          'OC\Preview\PNG',
          'OC\Preview\JPEG',
          'OC\Preview\GIF',
          'OC\Preview\BMP',
          'OC\Preview\XBitmap',
          'OC\Preview\MP3',
          'OC\Preview\TXT',
          'OC\Preview\MarkDown',
          'OC\Preview\Movie'
    )
  );
  ```
## ScreenShot
![ScreenShot](./screenshot.png)

## LICENSE
MIT
