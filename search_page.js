var qpath = 'https://api.spotify.com/v1/search?type=album',
isOpenSpotifyDirect = null;

var spotifyPage = function () {
    var subjectsCon = $('.article'),
    menuLeft = subjectsCon.offset().left + subjectsCon.width();
    $('.item').each(
        function (index) {
            var itemCon = $(this), album = $(this).find('.pl2>a').text(),
            infos = $(this).find('.pl').eq(0).text().split('/'),
            artist = infos[infos.length - 1].replace(' ', '');;
            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:album.concat(' artist:', artist)},
                    success:function (ret) {
                        if (ret.albums.total && ret.albums.total > 0) {
                            // var q = ret.info.query;
                            var q = '';
                            addSpotifyBtn(itemCon.find('.pl2 a').first(), q, menuLeft, ret.albums.items);
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
