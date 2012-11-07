var qpath = 'http://ws.spotify.com/search/1/album.json', albumsInfo = {},
isOpenSpotifyDirect = null;

var spotifyPage = function () {
    var subjectsCon = $('.article'),
    menuLeft = subjectsCon.offset().left + subjectsCon.width() + 10;
    $('.status-item[data-target-type=music]').each(
        function (index) {
            var itemCon = $(this), album = $(this).find('p.text>a').eq(1).text(),
            infos = $(this).find('.description').text().split('/'),
            artist = infos[0];
            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            albumsInfo[q] = ret.albums;
                            addSpotifyBtn(itemCon.find('p.text'), q, menuLeft);
                        }
                    }
                   });
        });
};

chrome.extension.sendRequest({method:"getLocalStorage", key:"isOpenSpotifyDirect"},
                             function(response) {
                                 isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                 spotifyPage();
                             });
