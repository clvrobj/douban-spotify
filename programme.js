var qpath = 'http://ws.spotify.com/search/1/track.json', tracksInfo = {},
isOpenSpotifyDirect = null;

var spotifyPage = function(){
    $('.song-item-wrapper').each(
        function(){
            var info = $(this).children('div')[0];
            name = $(info).attr('data-title');
            artist = $(info).attr('data-performer');

            $.ajax({url:qpath, 
                crossDomain:true,
                data:{q: name + ' ' + artist},
                success:function (ret) {
                    console.log(ret);
                    if (ret.info.num_results && ret.info.num_results > 0) {
                        var q = ret.info.query;
                        tracksInfo[q] = ret.tracks;
                        addSpotifyBtn($(info).find('.song-info'), q);
                    }
                }
            });
        }
    );
};

chrome.extension.sendRequest({method:"getLocalStorage", key:"isOpenSpotifyDirect"},
                             function(response) {
                                 isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                 spotifyPage();
                             });
