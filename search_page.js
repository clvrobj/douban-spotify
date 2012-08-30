var qpath = 'http://ws.spotify.com/search/1/album.json', albumsInfo = {},
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
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            albumsInfo[q] = ret.albums;
                            addSpotifyBtn(itemCon.find('.pl2'), q, menuLeft);
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