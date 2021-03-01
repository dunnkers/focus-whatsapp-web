function setVisibility(visibility, id) {
    const display = visibility ? 'none' : 'inline';
    console.log(`[Focus for Whatsapp] Setting #${id} visibility to: ${display}`)

    var styleElem = document.createElement('style');
    styleElem.innerHTML = `#${id} { display: ${display} }`;
    document.documentElement.insertBefore(styleElem, null);
}

function setSidepaneVisibility(visibility) {
    setVisibility(visibility, 'pane-side');
}

function applyConfig(config) {
    setSidepaneVisibility(config.hide_chats);
}

chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(config => {
        applyConfig(config);
        port.postMessage({ action: 'received' });
    }); 
});

chrome.storage.sync.get({
    hide_chats: true
}, applyConfig);  // passes `items` into applyConfig

