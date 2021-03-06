// Working on the pages
// *://music.douban.com/subject_search*
// *://search.douban.com/music/subject_search*
// *://music.douban.com/recommended
 
var spotifyPage = function () {
  var subjectsCon = $('.title'),
      menuLeft = subjectsCon.offset().left + subjectsCon.width();
  $('.item-root').each(
    function (index) {
      var itemCon = $(this), album = $(this).find('.title>a').text(),
          infos = $(this).find('.abstract').eq(0).text().split('/'),
          artist = infos[0].replace(' ', '');

      chrome.extension.sendRequest({method:"queryAlbums", title: album + ' ' + artist}, function (ret) {
        if (ret.albums.total && ret.albums.total > 0) {
          var q = '';
          addSpotifyBtn(itemCon.find('.title').first(), q, menuLeft, ret.albums.items, ret.isOpenSpotifyDirect);
        }    
      });
    });
};

spotifyPage();
