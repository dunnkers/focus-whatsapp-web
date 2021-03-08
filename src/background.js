function applyConfig(config) {
    chrome.tabs.query({url:'https://web.whatsapp.com/*'}, tabs => {
        // tabs is empty when whatsapp not open.
        for (const tab of tabs) {
            const display = config.hide_chats ? 'none' : 'inline';
            const id = 'pane-side';
            console.log(`Setting #${id} visibility to: ${display}`)
            chrome.tabs.insertCSS(tab.id, {
                code: `#${id} { display: ${display} }`
            })
        }
    });
}

function getAndApplyConfig() {
    chrome.storage.sync.get({
        hide_chats: true
    }, applyConfig);    
}

chrome.storage.onChanged.addListener(changes => {
    const { hide_chats } = changes;
    applyConfig({
        hide_chats: hide_chats.newValue
    });
});

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === 'insertCSS') { // content script
            getAndApplyConfig();
        }
        if (request.action === 'hideChat') {
            console.log('Hiding chat', request);
        }
    }
);
  
getAndApplyConfig();