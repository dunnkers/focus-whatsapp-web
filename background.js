// chrome.webNavigation.onCompleted.addListener(function() {
//     alert("This is my favorite website!");
// }, {url: [{urlMatches : 'https://web.whatsapp.com/*'}]});

chrome.storage.onChanged.addListener(changes => {
    console.log('chrome.storage.onChanged')
    const { hide_chats } = changes;
    console.log(hide_chats);

    chrome.tabs.query({url:'https://web.whatsapp.com/*'}, tabs => {
        // tabs is empty when whatsapp not open.
        for (const tab of tabs) {
            console.log(tab);
            // chrome.tabs.sendMessage(tab.id, {
            //     hide_chats: hide_chats.newValue
            // }, function(response) {});


            const port = chrome.tabs.connect(tab.id);
            port.postMessage({ hide_chats: hide_chats.newValue });
            port.onMessage.addListener((response) => {
              console.log(response);
            });
        


        }

    });
    
});



// console.log('giezer!');
// chrome.storage.sync.get({
//     hide_chats: true
//   }, function(items) {
//     console.log('storage:',items)
//     if (items && items.hide_chats) {
//         const registeredScript = chrome.contentScripts.register({
//             css: [{
//                 file: 'hide.css'
//             }],
//             matches: [
//                 'https://web.whatsapp.com/*'
//             ]
//         }).then(function(res) {
//             console.log('hide chats');
//             console.log(res);
//         });
//     } else {
//         const registeredScript = chrome.contentScripts.register({
//             css: [{
//                 file: 'show.css'
//             }],
//             matches: [
//                 'https://web.whatsapp.com/*'
//             ]
//         }).then(function(res) {
//             console.log('show chats');
//             console.log(res);
//         });
//     }
//   });


// chrome.browserAction.onClicked.addListener(function(tab) {
//     // No tabs or host permissions needed!
//     console.log('Turning ' + tab.url + ' red!');
//     chrome.tabs.executeScript({
//       code: 'document.body.style.backgroundColor="red"'
//     });
//   });