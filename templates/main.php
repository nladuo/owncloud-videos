<?php
script('files_videoplayer', 'viewer');
script('videos', 'videos');
style('videos', 'style')
?>

<div id="app">
	<div id="app-content">
		<?php print_unescaped($this->inc('part.content')); ?>
	</div>
</div>
