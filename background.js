// chrome.webNavigation.onCompleted.addListener(function() {
//     alert("This is my favorite website!");
// }, {url: [{urlMatches : 'https://web.whatsapp.com/*'}]});


console.log('giezer!');
chrome.storage.sync.get({
    hide_chats: true
  }, function(items) {
    console.log('storage:',items)
    if (items.hide_chats) {
        const registeredScript = chrome.contentScripts.register({
            css: [{
                file: 'hide.css'
            }],
            matches: [
                'https://web.whatsapp.com/*'
            ]
        }).then(function(res) {
            console.log('hide chats');
            console.log(res);
        });
    } else {
        const registeredScript = chrome.contentScripts.register({
            css: [{
                file: 'show.css'
            }],
            matches: [
                'https://web.whatsapp.com/*'
            ]
        }).then(function(res) {
            console.log('show chats');
            console.log(res);
        });
    }
  });
// chrome.browserAction.onClicked.addListener(function(tab) {
//     // No tabs or host permissions needed!
//     console.log('Turning ' + tab.url + ' red!');
//     chrome.tabs.executeScript({
//       code: 'document.body.style.backgroundColor="red"'
//     });
//   });