const CLIENT_ID = encodeURIComponent('');
const EXTENSION_ID = '';
const RESPONSE_TYPE = encodeURIComponent('token');
const REDIRECT_URI = encodeURIComponent('https://' + EXTENSION_ID + '.chromiumapp.org/');
// The search API require the `user-read-private` scope, see https://developer.spotify.com/documentation/general/guides/scopes/
const SCOPE = encodeURIComponent('user-read-private');
const SHOW_DIALOG = encodeURIComponent('true');
let STATE = '';
let ACCESS_TOKEN = localStorage['spotify_access_token'];

let user_signed_in = localStorage['spotify_signed_in'];

var createSpotifyEndpoint = function() {
  STATE = encodeURIComponent('meet' + Math.random().toString(36).substring(2, 15));

  let oauth2_url =
      `https://accounts.spotify.com/authorize
?client_id=${CLIENT_ID}
&response_type=${RESPONSE_TYPE}
&redirect_uri=${REDIRECT_URI}
&state=${STATE}
&scope=${SCOPE}
&show_dialog=${SHOW_DIALOG}
`;

  return oauth2_url;
};

var queryAlbum = function(title, cb) {
  $.ajax({url:qpath,
          crossDomain:true,
          headers: {"Authorization": "Bearer " + ACCESS_TOKEN},
          data:{q: data},
          success:function (ret) {
            cb(ret.albums);
          }
         });
};

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'login') {
    if (user_signed_in) {
      console.log("User is already signed in.");
    } else {
      // sign the user in with Spotify
      chrome.identity.launchWebAuthFlow({
        url: createSpotifyEndpoint(),
        interactive: true
      }, function (redirect_url) {
        if (chrome.runtime.lastError) {
          sendResponse({ message: 'fail' });
        } else {
          if (redirect_url.includes('callback?error=access_denied')) {
            sendResponse({ message: 'fail' });
          } else {
            ACCESS_TOKEN = redirect_url.substring(redirect_url.indexOf('access_token=') + 13);
            ACCESS_TOKEN = ACCESS_TOKEN.substring(0, ACCESS_TOKEN.indexOf('&'));
            let state = redirect_url.substring(redirect_url.indexOf('state=') + 6);

            if (state === STATE) {
              console.log("SUCCESS")

              localStorage['spotify_signed_in'] = true;
              localStorage['spotify_access_token'] = ACCESS_TOKEN;

              chrome.browserAction.setPopup({ popup: './popup.html' }, () => {
                sendResponse({ message: 'success' });
              });
            } else {
              sendResponse({ message: 'fail' });
            }
          }
        }
      });
    }
    
    return true;
  }
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
  if (request.method == "getLocalStorage") {
    sendResponse({data: localStorage[request.key]});
  } else if (request.method == "queryAlbums") {
    console.log('queryAlbums: ' + request.title);
    var qpath = 'https://api.spotify.com/v1/search?type=album';
    $.ajax({url:qpath,
            crossDomain:true,
            headers: {"Authorization": "Bearer " + ACCESS_TOKEN},
            data:{q: request.title},
            success:function (ret) {
              sendResponse({
                albums: ret.albums,
                isOpenSpotifyDirect: localStorage['isOpenSpotifyDirect']});
            }
           });    
  } else {
    sendResponse({}); // snub them.
  }
});
