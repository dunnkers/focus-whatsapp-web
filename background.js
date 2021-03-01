function applyConfig(config) {
    chrome.tabs.query({url:'https://web.whatsapp.com/*'}, tabs => {
        // tabs is empty when whatsapp not open.
        for (const tab of tabs) {
            const port = chrome.tabs.connect(tab.id);
            port.postMessage(config); // send new config to tab
            chrome.tabs.sendMessage(tab.id, config);
            console.log('New settings sent to content script ✓');

            // console.log('Running insertCSS...')
            // chrome.tabs.insertCSS(tab.id, {
            //     code: `#pane-side { display: ${config.hide_chats ? 'none' : 'inline'}`
            // })
            // console.log('WhatsApp tab is open, but could not communicate -');
            // console.log('with content script. Inserting it manually...');

            // chrome.tabs.executeScript(tab.id, {
            //     file: 'content-script.js',
            // });
            // port.onMessage.addListener((msg) => {
            //     console.log('msg', msg);
            // })
        }
    });
}

chrome.storage.onChanged.addListener(changes => {
    const { hide_chats } = changes;
    applyConfig({
        hide_chats: hide_chats.newValue
    });
});

chrome.storage.sync.get({
    hide_chats: true
}, applyConfig);
