// chrome.runtime.onInstalled.addListener(function() {
//     console.log("The color is green.");
// });

// function setVisibility(visibility, id) {

// }

// function setSidepaneVisibility(visibility) {

// }


chrome.runtime.onConnect.addListener((port) => {
    console.log(port,'connected')
    port.onMessage.addListener(settings => {
        console.log(settings);
        
        var customStyles = document.createElement('style');
        const display = settings.hide_chats ? 'none' : 'inline';
        customStyles.innerHTML = `#pane-side { display: ${display} }`;
        document.documentElement.insertBefore(customStyles, null);
    
    //   if (msg.function == 'html') {
    //     port.postMessage({ html: document.documentElement.outerHTML, description: document.querySelector("meta[name=\'description\']").getAttribute('content'), title: document.title });
    //   }
    });
  });

// chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
//     console.log(msg);
//     // if (msg.action == 'open_dialog_box') {
//     //   alert("Message recieved!");
//     // }
//   });

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOMContentLoaded');
});

chrome.storage.sync.get({
    hide_chats: true
}, function(items) {
    // document.getElementById('hide_chats').checked = items.hide_chats;
    // document.getElementById('hide_search').checked = items.hide_search;



    var customStyles = document.createElement('style');
    const display = items.hide_chats ? 'none' : 'inline';
    customStyles.innerHTML = `#pane-side { display: ${display} }`;
    document.documentElement.insertBefore(customStyles, null);
});

