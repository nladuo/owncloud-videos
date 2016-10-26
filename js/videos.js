$(document).ready(function() {
	

	$.post(OC.generateUrl('/apps/videos/api/getVideos')).success(function (resp) {

		var videos = JSON.parse(resp.data);
		console.log(videos);


		for (var i = 0; i < videos.length; i++) {
			var video = videos[i];

            var row = $('<tr></tr>');
            row.attr('data-size',video.size);
            row.attr('data-mime',video.mimetype);
            row.attr('data-file',video.name);
            row.attr('data-id',video.fileid);
            row.attr('data-path',video.path);

            var cell = $('<td></td>');
            cell.addClass('filename');

            var link = $('<a href="#"></a>');
            link.attr('name', '/index.php/apps/files/download/'+video.path);
            var iconUrl = "http://ubuntu" + video.icon;
            link.html('<img class="thumb" src="'+iconUrl+'" />');
            link.css('margin-left','10px');
            link.addClass('viewVid');
			link.click(function(){
				videoViewer.onView(video.name, {
					dir: video.dir,
					$file: row
				});
			});

            cell.append(link);

            cell.append('<br/><span class="fileName">'+video.name+'</span>');
            row.append(cell);

            $('#videos').append(row);

		}
		
	});
	
	

});

