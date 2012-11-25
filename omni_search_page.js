var qpath = 'http://ws.spotify.com/search/1/album.json'
, albumsInfo = {}
, isOpenSpotifyDirect = null

var spotifyPage = function () {
    var subjectsCon = $('.result-list')
    , menuLeft = subjectsCon.offset().left + subjectsCon.width() + 10

    $(".result:has(a.nbg[href*=music]):not(:has(span.spotify-btn))").each(
        function (index) {
            var itemCon = $(this)
	    , albumName = $(this).find('.title h3 a').text()
	    , artistInfos = $(this).find('.rating-info .subject-cast').text().split('/')
            , artistName = artistInfos[0]

            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:albumName.concat(' artist:', artistName)},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            albumsInfo[q] = ret.albums;
                            addSpotifyBtn(itemCon.find('.title h3'), q, menuLeft);
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

				 $(".result-list-ft:has(a[data-subtype=item])").delegate("a", "click", function() {
				     setTimeout(spotifyPage, refresh_interval);
				 });

                             });
