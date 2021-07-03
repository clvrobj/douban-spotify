$(function () {
  var openUrl = function (url) {
    chrome.tabs.create({url: url});
    var popup = chrome.extension.getViews({type: 'popup'})[0];
    popup && popup.close();
  };

  $('#open-options').click(
    function () {
      openUrl(chrome.extension.getURL("options.html"));
    });

  $('#sign-in').click(
    function () {
      chrome.runtime.sendMessage({ message: 'login' }, function (response) {
        if (response.message === 'success') window.close();
      });
    });

  chrome.extension.sendRequest(
    {method:"getLocalStorage", key:"spotify_signed_in"},
    function(response) {
      if (response.data == 'true') {
        $('#sign-in').hide();
      }
    });
  
});
