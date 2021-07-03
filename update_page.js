// Working on the pages:
// www.douban.com/
// www.douban.com/?p=*
// www.douban.com/people/*/statuses

var spotifyPage = function () {
  var subjectsCon = $('.article'),
      menuLeft = subjectsCon.offset().left + subjectsCon.width() + 10;
  $('.status-item[data-target-type=music]').each(
    function (index) {
      var itemCon = $(this), album = $(this).find('.title>a').text(),
          artist = $(this).find('.info span').eq(1).text();

      chrome.extension.sendRequest({method:"queryAlbums", title: album + ' ' + artist}, function (ret) {
        if (ret.albums.total && ret.albums.total > 0) {
          var q = '';
          addSpotifyBtn(itemCon.find('.title').first(), q, menuLeft, ret.albums.items, ret.isOpenSpotifyDirect);
        }    
      });

    });
};

spotifyPage();
