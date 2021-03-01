// Saves options to chrome.storage
function save_options() {
  var hide_chats = document.getElementById('hide_chats').checked;
  // var hide_search = document.getElementById('hide_search').checked;
  chrome.storage.sync.set({
    hide_chats
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';


    // document.getElementById('pane-side').style.display = hide_chats ? 'none' : 'inline';
    // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    //   chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    //     console.log(response);
    //   });
    // });

  //   if (hide_chats) {
  //     const registeredScript = chrome.contentScripts.register({
  //         css: [{
  //             file: 'hide.css'
  //         }],
  //         matches: [
  //             'https://web.whatsapp.com/*'
  //         ]
  //     }).then(function(res) {
  //         console.log('hide chats');
  //         console.log(res);
  //     });
  //   } else {
  //     const registeredScript = chrome.contentScripts.register({
  //         css: [{
  //             file: 'show.css'
  //         }],
  //         matches: [
  //             'https://web.whatsapp.com/*'
  //         ]
  //     }).then(function(res) {
  //         console.log('show chats');
  //         console.log(res);
  //     });
  // }



    



    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    hide_chats: true
  }, function(items) {
    document.getElementById('hide_chats').checked = items.hide_chats;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
// document.getElementById('save').addEventListener('click',
//     save_options);

document.getElementById('hide_chats').addEventListener('change',
        save_options);