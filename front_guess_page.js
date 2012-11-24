var qpath = 'http://ws.spotify.com/search/1/album.json'
, albumsInfo = {}
, isOpenSpotifyDirect = null

var spotifyPage = function () {
    var subjectsCon = $('.guess3-list')
    , menuLeft = subjectsCon.offset().left + subjectsCon.width() + 10

    $('.subject-item[unique_id*=1003]:not(:has(span.spotify-btn))').each(
        function (index) {
            var itemCon = $(this)
	    , album = $(this).find('.title>a').eq(0).text()
	    , artist = $(this).find('.from .value').text()

            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            albumsInfo[q] = ret.albums;
                            addSpotifyBtn(itemCon.find('div.rating'), q, menuLeft);
                        }
                    }
                   });
        });
};

chrome.extension.sendRequest({method:"getLocalStorage", key:"isOpenSpotifyDirect"},
                             function(response) {
                                 isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                 spotifyPage();
				 
				 var refresh_interval = 850;

				 $("div.guess-more").delegate("a", "click", function() {
				     setTimeout(spotifyPage, refresh_interval);
				     //setTimeout(spotifyPage, refresh_interval * 5); //refresh in case the request failed.
				 });

                             });
