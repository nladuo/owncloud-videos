$(document).ready(function() {
    var modal;

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

            modal = $('<div><img style="width: 60px;margin: 40px auto 0 auto;cursor: pointer" src="../../../core/img/actions/vedio-play.png"/></div>');
            modal.addClass('modal');

            var link = $('<a href="#" style="margin: 0 auto"></a>');
            link.attr('name', '/index.php/apps/files/download/'+video.path);
            var thumbnail = OC.webroot + '/core/img/filetypes/video.svg';
            link.html('<img id="video-'+video.fileid+'" class="thumb" src="'+thumbnail+'" />');
            modal.click(function(){
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

            item.append(modal);

            item.append(link);
            item.append('<p class="videoName">'+video.name+'</p>');

            $('#videos').append(item);




        });


        //设置遮罩层宽度
        var _width=$('.thumb').css('width');
        $('.modal').css("width",_width);

        //鼠标移入
        $('.video-item a img').mouseenter(function () {
            $('.modal').hide();
            $(this).parent().parent().find('.modal').show();
        });

        //鼠标移出
        $('.modal').mouseleave(function () {
            $('.modal').hide();
        });


        $('.modal img').mouseenter(function () {
            $(this).parent().css("opacity","0.4")
        });
        $('.modal img').mouseleave(function () {
            $(this).parent().css("opacity","0.2")
        });
		
	});



});

