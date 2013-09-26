var qpath = 'http://ws.spotify.com/search/1/album.json',
isOpenSpotifyDirect = null;

var spotifyPage = function () {
    var subjectsCon = $('.guess3-list'),
    menuLeft = subjectsCon.offset().left + subjectsCon.width() + 10;
    $('.subject-item[unique_id*=1003]:not(:has(span.spotify-btn))').each(
        function (index) {
            var itemCon = $(this),
            album = $(this).find('.title>a').eq(0).text(),
            artist = $(this).find('.from .value').eq(0).text();
            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            addSpotifyBtn(itemCon.find('div.rating'), q, menuLeft, ret.albums);
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
                                 $("div.guess-more").delegate("a", "click",
                                                              function() {
                                                                  setTimeout(spotifyPage, refresh_interval);
                                                              });

                             });
