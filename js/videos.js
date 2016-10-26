$(document).ready(function() {
	

	$.post(OC.generateUrl('/apps/videos/api/getVideos')).success(function (resp) {

		var videos = JSON.parse(resp.data);
		console.log(videos);

        videos.forEach(function (video) {
            var item = $('<div></div>');
            item.attr('data-size',video.size);
            item.attr('data-mime',video.mimetype);
            item.attr('data-file',video.name);
            item.attr('data-id',video.fileid);
            item.attr('data-path',video.path);

            item.addClass('video-item');

            var link = $('<a href="#"></a>');
            link.attr('name', '/index.php/apps/files/download/'+video.path);
            var thumbnail = OC.webroot + '/core/img/filetypes/video.svg';
            link.html('<img id="video-'+video.fileid+'" class="thumb" src="'+thumbnail+'" />');
            link.click(function(){
                videoViewer.onView(video.name, {
                    dir: video.dir,
                    $file: item
                });
            });
    
            var data = {
                fileid: video.fileid,
                path: video.path
            };

            $.post(OC.generateUrl('/apps/videos/api/getThumbnail'), data).success(function (resp) {
                if (resp.success) {
                    var thumbnail = OC.webroot + resp.path;
                    $('#video-' + video.fileid).attr('src', thumbnail);
                }
            });

            // setTimeout(changeTumb(video.fileid), 1000);


            item.append(link);

            item.append('<p class="videoName">'+video.name+'</p>');

            $('#videos').append(item);
        });
		
	});
	
	

});

