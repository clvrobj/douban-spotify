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
  });
