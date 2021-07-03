// Working on the pages
// *://music.douban.com/recommended
// *://music.douban.com/tag/*

var spotifyPage = function () {
  var subjectsCon = $('.pl2'),
      menuLeft = subjectsCon.offset().left + subjectsCon.width();
  $('.item').each(
    function (index) {
      var itemCon = $(this), album = $(this).find('.pl2>a').text(),
          infos = $(this).find('.pl').eq(0).text().split('/'),
          artist = infos[0].replace(' ', '');

      chrome.extension.sendRequest({method:"queryAlbums", title: album + ' ' + artist}, function (ret) {
        if (ret.albums.total && ret.albums.total > 0) {
          var q = '';
          addSpotifyBtn(itemCon.find('.pl2>a').first(), q, menuLeft, ret.albums.items, ret.isOpenSpotifyDirect);
        }    
      });
    });
};

spotifyPage();
