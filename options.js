// Saves options to chrome.storage
function save_options() {
  var hide_chats = document.getElementById('hide_chats').checked;
  var hide_search = document.getElementById('hide_search').checked;
  chrome.storage.sync.set({
    hide_chats,
    hide_search
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
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
    hide_chats: true,
    hide_search: false
  }, function(items) {
    document.getElementById('hide_chats').checked = items.hide_chats;
    document.getElementById('hide_search').checked = items.hide_search;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);