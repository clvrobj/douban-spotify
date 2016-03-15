var qpath = 'https://api.spotify.com/v1/search?type=track',
isOpenSpotifyDirect = null;

var spotifyPage = function(){
    var subjectsCon = $('#songlist-wrapper')
    , menuLeft = subjectsCon.offset().left + subjectsCon.width();
    $('.song-item-wrapper').each(
        function(){
            var info = $(this).children('div')[0];
            name = $(info).attr('data-title');
            artist = $(info).attr('data-performer');

            $.ajax({url:qpath,
                crossDomain:true,
                data:{q: name + ' ' + artist},
                success:function (ret) {
                    if (ret.tracks.total && ret.tracks.total > 0) {
                        // var q = ret.info.query;
                        var q = '';
                        addSpotifyBtn($(info).find('.song-info'), q, menuLeft, ret.tracks.items);
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
