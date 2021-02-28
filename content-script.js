// chrome.runtime.onInstalled.addListener(function() {
//     console.log("The color is green.");
// });


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
});

chrome.storage.sync.get({
    hide_chats: true
}, function(items) {
    // document.getElementById('hide_chats').checked = items.hide_chats;
    // document.getElementById('hide_search').checked = items.hide_search;

    var css = "body { border: 20px dotted pink; }";

    // browser.browserAction.onClicked.addListener(() => {

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var insertingCSS = chrome.tabs.insertCSS({code: css});
        insertingCSS.then(function(s) {
            console.log(`Success: ${s}`);
        }, onError);
    // });
});

