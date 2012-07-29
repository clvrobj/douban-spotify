var qpath = 'http://ws.spotify.com/search/1/album.json', albumsInfo = {},
isOpenSpotifyDirect = null;

var albumsMenu,
showAlbumsMenu = function (itemCon) {
    if (!albumsMenu) {
        var menuLeft = $('.grid-view').offset().left + $('.grid-view').width();
        albumsMenu = $('<div id="spotify-items"></div>').appendTo('body').css('left', menuLeft);
    }
    var albums = albumsInfo[$(itemCon).attr('data-q')];
    // add albums
    albumsMenu.empty();
    $.each(albums, function (idx, album) {
               var link = isOpenSpotifyDirect ? album.href : 'http://open.spotify.com/album/'.concat(album.href.split(':')[2]),
               target = isOpenSpotifyDirect ? '' : '_blank';
               $('<div class="spotify-item"><a href="'.concat(link, '" target="', target, '">', album.name, ' - ', album.artists[0].name, '</a></div>'))
                   .appendTo(albumsMenu).hover(
                       function () {
                           $(this).addClass('mover');
                       }, function () {
                           $(this).removeClass('mover');
                       });
           });
    return albumsMenu.css({top:itemCon.offset().top});
},

addSpotifyBtn = function (itemCon, q) {
    var link = '';
    $('<span title="Albums on Spotify" class="spotify-btn" data-q="'.concat(q, '">▸</span>')).appendTo($(itemCon).find('.title'))
        .mouseenter(function () {
                        showAlbumsMenu($(this));
                    });
};

var spotifyPage = function () {
    $('.item').each(
        function (index) {
            var itemCon = $(this), album = $(this).find('.title>a>em').text();
            $.ajax({url:qpath, 
                    crossDomain:true,
                    data:{q:album},
                    success:function (ret) {
                        if (ret.info.num_results && ret.info.num_results > 0) {
                            var q = ret.info.query;
                            albumsInfo[q] = ret.albums;
                            addSpotifyBtn(itemCon, q);
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