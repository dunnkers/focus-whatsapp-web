function applyConfig(config) {
    chrome.tabs.query({url:'https://web.whatsapp.com/*'}, tabs => {
        // tabs is empty when whatsapp not open.
        for (const tab of tabs) {
            console.log('Running insertCSS...')
            const display = config.hide_chats ? 'none' : 'inline';
            chrome.tabs.insertCSS(tab.id, {
                code: `#pane-side { display: ${display} }`
            })
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

// chrome.management.onDisabled.addListener(() => console.log('Focus for whatsapp disabled!!!'));

chrome.runtime.onSuspend.addListener(() => {
    localStorage.setItem('duderino!!!!', 'giezer');
})
