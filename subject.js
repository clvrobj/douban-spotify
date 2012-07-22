var qpath = 'http://ws.spotify.com/search/1/album.json', album = $('h1 span').text(),
isOpenSpotifyDirect = null;

var showAlbumsMenu = function (albums) {
    $('<h2><span class="spotify-btn"></span>'.concat(album, ' on Spotify</h2><div id="spotify-albums"></div>')).prependTo('.aside');
    var albumsMenu = $('#spotify-albums');
    $.each(albums, function (idx, album) {
               var link = isOpenSpotifyDirect ? album.href : 'http://open.spotify.com/album/'.concat(album.href.split(':')[2]),
               target = isOpenSpotifyDirect ? '' : '_blank';
               $('<div class="spotify-album"><a href="'.concat(link, '" target="', target, '">', album.name, ' - ', album.artists[0].name, '</a></div>'))
                   .appendTo(albumsMenu).hover(
                       function () {
                           $(this).addClass('mover');
                       }, function () {
                           $(this).removeClass('mover');
                       });
           });
    return albumsMenu;
};

chrome.extension.sendRequest({method:"getLocalStorage", key:"isOpenSpotifyDirect"},
                             function(response) {
                                 isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                 $.ajax({url:qpath, 
                                         crossDomain:true,
                                         data:{q:album},
                                         success:function (ret) {
                                             if (ret.info.num_results && ret.info.num_results > 0) {
                                                 var q = ret.info.query;
                                                 showAlbumsMenu(ret.albums);
                                             }
                                         }
                                        });
                             });