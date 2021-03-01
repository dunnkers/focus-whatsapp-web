console.log('[Focus for Whatsapp Web] connected, request insertCSS injection..')
chrome.runtime.sendMessage({ action: 'insertCSS' });