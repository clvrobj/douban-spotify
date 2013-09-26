var itemsMenu,
showItemsMenu = function (con, menuLeft, items) {
    if (!itemsMenu) {
        itemsMenu = $('<div id="spotify-items"></div>').appendTo('body').css('left', menuLeft);
    }
    itemsMenu.empty();
    $.each(items, function (idx, item) {
               var itemInfo = item.href.split(':'),
               link = isOpenSpotifyDirect ? item.href :
                   'http://open.spotify.com/'.concat(itemInfo[1], '/', itemInfo[2]),
               target = isOpenSpotifyDirect ? '' : '_blank';
               $('<a class="spotify-item" href="'.concat(link, '" target="', target, '"><span>', item.name, ' - ', item.artists[0].name, '</span></a>'))
                   .appendTo(itemsMenu).hover(
                       function () {
                           $(this).addClass('mover');
                       }, function () {
                           $(this).removeClass('mover');
                       });
           });
    return itemsMenu.css({top:con.offset().top});
},

addSpotifyBtn = function (con, q, menuLeft, items) {
    var link = '';
    $('<span title="Items on Spotify" class="spotify-btn" data-q="'.concat(q, '">▸</span>')).appendTo(con)
        .mouseenter(function () {
                        showItemsMenu($(this), menuLeft, items);
                    });
};
