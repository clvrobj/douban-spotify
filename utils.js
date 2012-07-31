var albumsMenu,
showAlbumsMenu = function (con, menuLeft) {
    if (!albumsMenu) {
        albumsMenu = $('<div id="spotify-items"></div>').appendTo('body').css('left', menuLeft);
    }
    var albums = albumsInfo[$(con).attr('data-q')];
    // add albums
    albumsMenu.empty();
    $.each(albums, function (idx, album) {
               var link = isOpenSpotifyDirect ? album.href : 'http://open.spotify.com/album/'.concat(album.href.split(':')[2]),
               target = isOpenSpotifyDirect ? '' : '_blank';
               $('<a class="spotify-item" href="'.concat(link, '" target="', target, '"><span>', album.name, ' - ', album.artists[0].name, '</span></a>'))
                   .appendTo(albumsMenu).hover(
                       function () {
                           $(this).addClass('mover');
                       }, function () {
                           $(this).removeClass('mover');
                       });
           });
    return albumsMenu.css({top:con.offset().top});
},

addSpotifyBtn = function (con, q, menuLeft) {
    var link = '';
    $('<span title="Albums on Spotify" class="spotify-btn" data-q="'.concat(q, '">▸</span>')).appendTo(con)
        .mouseenter(function () {
                        showAlbumsMenu($(this), menuLeft);
                    });
};
