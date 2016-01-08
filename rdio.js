var qpath = 'https://ws.spotify.com/search/1/album.json',
isOpenSpotifyDirect = null;

var spotifyPage = function () {
    var subjectsCon = $('.main_content'),
    menuLeft = subjectsCon.offset().left - 220;
    $('.Album:not(:has(span.spotify-btn))').each(
        function (index) {
            var itemCon = $(this), meta = $(this).find('.metadata'),
            album = meta.find('a.album_title').text(),
            artist = meta.find('a.artist_title').text();
            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            addSpotifyBtn(meta.find('a.album_title'), q, menuLeft, ret.albums);
                        }
                    }
                   });
        });
};

chrome.extension.sendRequest({method:"getLocalStorage", key:"isOpenSpotifyDirect"},
                             function(response) {
                                 isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                 if ($('#loading,.App_Loading').length > 0) {
                                     var counter = 0,
                                     t = setInterval(
                                         function () {
                                             if (!$('#loading,.App_Loading').is(':visible') || counter > 10) {
                                                 clearInterval(t);
                                                 spotifyPage();
                                             }
                                             counter++;
                                         }, 3000);
                                 }
                             });