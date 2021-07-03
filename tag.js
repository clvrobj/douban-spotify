// Working at page: music.douban.com/tag/*

var spotifyPage = function () {
  var subjectsCon = $('#subject_list'),
      menuLeft = subjectsCon.offset().left + subjectsCon.width();
  $('.item').each(
    function (index) {
      var itemCon = $(this),
          album = $(this).find('.pl2>a').text().split('/')[0],
          infos = $(this).find('p.pl').text().split('/'),
          artist = infos[infos.length - 1].replace(/^\s\s*/, '').replace(/\s\s*$/, '');

      chrome.extension.sendRequest({method:"queryAlbums", title: album + ' ' + artist}, function (ret) {
        if (ret.albums.total && ret.albums.total > 0) {
          var q = '';
          addSpotifyBtn(itemCon.find('.pl2').first(), q, menuLeft, ret.albums.items, ret.isOpenSpotifyDirect);
        }    
      });
      
    });
};

spotifyPage();
