var isAlbumSoundtrack = function() {
  var result;

  $infos = $("#info").find('span.pl');
  $infos.each(function(index, info){
    if ($(info).text().indexOf("相关电影") != -1) {
      result = true;
    }
  });

  return result;
}

if (/^https?:\/\/music.douban.com\/subject\/\d+\/$/.test(location.href)) {
    var qpath = 'https://api.spotify.com/v1/search?type=album';
    var album = $('h1 span').text();
    // artist will be in first or 2nd span
    var artist = $('#info span:first a').text() || $('#info span:eq(2) a').text();

    isOpenSpotifyDirect = null;

    var showAlbumsMenu = function (albums) {
        $('<h2><span class="spotify-btn"></span>'.concat(album, ' on Spotify</h2><div id="spotify-items"></div>')).prependTo('.aside');
        var albumsMenu = $('#spotify-items');
        $.each(albums, function (idx, album) {
                   var link = isOpenSpotifyDirect ? album.uri : 'http://open.spotify.com/album/'.concat(album.uri.split(':')[2]),
                   target = isOpenSpotifyDirect ? '' : '_blank';
                   $('<a class="spotify-item" href="'.concat(link, '" target="', target, '"><span>', album.name, ' - ', artist, '</span></a>'))
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
                                   // if the album is a movie soundtrack
                                   // don't include the artist info
                                     var data;
                                     if (isAlbumSoundtrack()) {
                                       data = album;
                                     } else {
                                       data = album.concat(' artist:', artist);
                                     }
                                     isOpenSpotifyDirect = (response.data == 'false') ? false : true;
                                     $.ajax({url:qpath,
                                             crossDomain:true,
                                             data:{q: data},
                                             success:function (ret) {
                                                 if (ret.albums.total && ret.albums.total > 0) {
                                                     // var q = ret.info.query;
                                                     showAlbumsMenu(ret.albums.items);
                                                 }
                                             }
                                            });
                                 });
}
