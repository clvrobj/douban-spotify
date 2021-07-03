var itemsMenu;
var showItemsMenu = function (con, menuLeft, items, isOpenSpotifyDirect) {
  if (!itemsMenu) {
    itemsMenu = $('<div id="spotify-items"></div>').appendTo('body').css('left', menuLeft);
  }
  itemsMenu.empty();
  $.each(items, function (idx, item) {
    var itemInfo = item.uri.split(':'),
        link = isOpenSpotifyDirect ? item.uri :
        'http://open.spotify.com/'.concat(itemInfo[1], '/', itemInfo[2]),
        target = isOpenSpotifyDirect ? '' : '_blank';
    var artist = item.artists ? ' - ' + item.artists[0].name : '';// have artist when search tracks
    $('<a class="spotify-item" href="'.concat(link, '" target="', target, '"><span>', item.name, artist, '</span></a>'))
      .appendTo(itemsMenu).hover(
        function () {
          $(this).addClass('mover');
        }, function () {
          $(this).removeClass('mover');
        });
  });
  return itemsMenu.css({top:con.offset().top});
};

var addSpotifyBtn = function (con, q, menuLeft, items, isOpenSpotifyDirect) {
  console.log('add spotify btn', con);
  var link = '';
  $('<span title="Items on Spotify" class="spotify-btn" data-q="'.concat(q, '">▸</span>')).appendTo(con)
    .mouseenter(function () {
      showItemsMenu($(this), menuLeft, items, isOpenSpotifyDirect);
    });
};
