$(document).ready(function() {
    var shade;

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

            shade = $('<div><img style="width: 60px;margin: 40px auto 0 auto;cursor: pointer" src="../../../core/img/actions/vedio-play.png"/></div>');
            shade.addClass('shade');

            var link = $('<a href="#" style="margin: 0 auto"></a>');
            link.attr('name', '/index.php/apps/files/download/'+video.path);
            var thumbnail = OC.webroot + '/core/img/filetypes/video.svg';
            link.html('<img id="video-'+video.fileid+'" class="thumb" src="'+thumbnail+'" />');
            shade.click(function() {
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

            item.append(shade);
            item.append(link);
            item.append('<p class="videoName">'+video.name+'</p>');

            $('#videos').append(item);

        });


        //set the width of shade
        function setwidth() {
            var _width = $('.thumb').css('width');
            $('.shade').css("width", _width);
        }

        setwidth();
        $(window).resize(setwidth); //

        //mouse enter the video-item
        $('.video-item a img').mouseenter(function () {
            $('.shade').hide();
            $(this).parent().parent().find('.shade').show();
        });

        //mouse leave the video-item
        $('.shade').mouseleave(function () {
            $('.shade').hide();
        });

        $('.shade img').mouseenter(function () {
            $(this).parent().css("opacity","0.4")
        });
        $('.shade img').mouseleave(function () {
            $(this).parent().css("opacity","0.2")
        });
		
	});
    

});




