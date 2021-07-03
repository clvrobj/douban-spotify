// Working on the page www.douban.com/search

var qpath = 'https://api.spotify.com/v1/search?type=album'
, isOpenSpotifyDirect = null;

var spotifyPage = function () {
  var subjectsCon = $('.result-list')
  , menuLeft = subjectsCon.offset().left + subjectsCon.width() + 10;

  $(".result:has(a.nbg[href*=music]):not(:has(span.spotify-btn))").each(
    function (index) {
      var itemCon = $(this)
      , album = $(this).find('.title h3 a').text()
      , artistInfos = $(this).find('.rating-info .subject-cast').text().split('/')
      , artist = artistInfos[0];

      chrome.extension.sendRequest({method:"queryAlbums", title: album + ' ' + artist}, function (ret) {
        if (ret.albums.total && ret.albums.total > 0) {
          var q = '';
          addSpotifyBtn(itemCon.find('.title h3').first(), q, menuLeft, ret.albums.items, ret.isOpenSpotifyDirect);
        }    
      });
    });
};

spotifyPage();

// Handle the click on "Show more" button
var refresh_interval = 850;
$(".result-list-ft:has(a[data-subtype=item])").delegate(
  "a", "click", function() {
    setTimeout(spotifyPage, refresh_interval);
  });
