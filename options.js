$(function () {
      var isOpenSpotifyDirect = localStorage['isOpenSpotifyDirect'];
      isOpenSpotifyDirect = (!isOpenSpotifyDirect || isOpenSpotifyDirect == 'false') ? false : true;
      if (!isOpenSpotifyDirect) {
          $('#spotify-wrap').attr('checked', true);
      } else {
          $('#spotify-nowrap').attr('checked', true);
      }

      $('#spotify-wrap').click(function () {
                                   localStorage['isOpenSpotifyDirect'] = false;
                               });
      $('#spotify-nowrap').click(function () {
                                   localStorage['isOpenSpotifyDirect'] = true;
                               });
  });