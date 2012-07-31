var qpath = 'http://ws.spotify.com/search/1/track.json', tracksInfo = {},
isOpenSpotifyDirect = null;

var spotifyMenu,
showSpotifyMenu = function (con) {
    if (!spotifyMenu) {
        var menuLeft = $('#record_viewer').offset().left - 256; // menu width
        spotifyMenu = $('<div id="spotify-items"></div>').appendTo('body').css('left', menuLeft);
    }
    var tracks = tracksInfo[$(con).attr('data-q')];
    spotifyMenu.empty();
    $.each(tracks, function (idx, track) {
               var link = isOpenSpotifyDirect ? track.href : 'http://open.spotify.com/track/'.concat(track.href.split(':')[2]),
               target = isOpenSpotifyDirect ? '' : '_blank';
               $('<a class="spotify-item" href="'.concat(link, '" target="', target, '"><span>', track.name, ' - ', track.artists[0].name, '</span></a>'))
                   .appendTo(spotifyMenu).hover(
                       function () {
                           $(this).addClass('mover');
                       }, function () {
                           $(this).removeClass('mover');
                       });
           });
    return spotifyMenu.css({top:con.offset().top});
};

var addSpotifyBtn = function (con, q) {
    var link = '';
    $('<span title="Albums on Spotify" class="spotify-btn" data-q="'.concat(q, '">▸</span>')).appendTo($(con))
        .mouseenter(function () {
                        showSpotifyMenu($(this));
                    });
};

var main = function () {
    $('#record_viewer .props').each(
        function () {
            var nameCon = $(this).children('.song_title'), name = nameCon.text(),
            artist = $(this).children('.performer').text(),
            q = name.concat(' artist:', artist);
            $.ajax({url:qpath, 
                    crossDomain:true,
                    data:{q:q},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            tracksInfo[q] = ret.tracks;
                            addSpotifyBtn(nameCon, q);
                        }
                    }
                   });
        });
};

chrome.extension.sendRequest({method:"getLocalStorage", key:"isOpenSpotifyDirect"},
                             function(response) {
                                 isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                 main();
                             });