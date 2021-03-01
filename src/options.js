function save_options() {
const hide_chats = document.getElementById('hide_chats').checked;
  chrome.storage.sync.set({
    hide_chats
  }, function() {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';

    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

function restore_options() {
  chrome.storage.sync.get({
    hide_chats: true
  }, function(items) {
    document.getElementById('hide_chats').checked = items.hide_chats;
  });
}

document.getElementById('hide_chats').addEventListener('change', save_options);
document.addEventListener('DOMContentLoaded', restore_options);