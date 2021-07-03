
var spotifyPage = function () {
  var subjectsCon = $('.grid-view'),
      menuLeft = subjectsCon.offset().left + subjectsCon.width();
  $('.item').each(
    function (index) {
      var itemCon = $(this), album = $(this).find('.title>a>em').text(),
          infos = $(this).find('.intro').text().split('/'),
          artist = infos[0].replace(' ', '');;

      chrome.extension.sendRequest({method:"queryAlbums", title: album + ' ' + artist}, function (ret) {
        if (ret.albums.total && ret.albums.total > 0) {
          var q = '';
          addSpotifyBtn(itemCon.find('.title').first(), q, menuLeft, ret.albums.items, ret.isOpenSpotifyDirect);
        }    
      });
    });
};

spotifyPage();
