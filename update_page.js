var qpath = 'https://ws.spotify.com/search/1/album.json',
isOpenSpotifyDirect = null;

var spotifyPage = function () {
    var subjectsCon = $('.article'),
    menuLeft = subjectsCon.offset().left + subjectsCon.width() + 10;
    $('.status-item[data-target-type=music]').each(
        function (index) {
            var itemCon = $(this), album = $(this).find('.title>a').text(),
            artist = $(this).find('.info span').eq(1).text();
            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            addSpotifyBtn(itemCon.find('.title'), q, menuLeft, ret.albums);
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
