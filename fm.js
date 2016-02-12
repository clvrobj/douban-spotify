var qpath = 'https://api.spotify.com/v1/search?type=track',
isOpenSpotifyDirect = null;

var main = function () {
    $('#record_viewer .props').each(
        function () {
            var nameCon = $(this).children('.song_title'), name = nameCon.text(),
            artist = $(this).children('.performer').text(),
            q = name.concat(' artist:', artist),
            menuLeft = $('#record_viewer').offset().left - 256;
            $.ajax({url:qpath,
                    crossDomain:true,
                    data:{q:q},
                    success:function (ret) {
                        if (ret.tracks.total && ret.tracks.total > 0) {
                            // var q = ret.info.query;
                            var q = '';
                            addSpotifyBtn(nameCon, q, menuLeft, ret.tracks.items);
                        }
                    }
                   });
        });
};

chrome.extension.sendRequest({method:"getLocalStorage", key:"isOpenSpotifyDirect"},
                             function(response) {
                                 isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                 setTimeout(main, 1500);
                             });
