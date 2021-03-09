console.log('[Focus for Whatsapp Web] connected, request insertCSS injection..')
chrome.runtime.sendMessage({ action: 'insertCSS' });

function observe(element, callback) {
  const observer = new MutationObserver(callback);
  observer.observe(element, { childList: true });
}

function elemExists(selector) {
  return !!document.querySelector(selector)
}

function isLoadingWhatsapp() {
  return elemExists('#startup');
}

function fadeInOpacity(element) {
  element.style.opacity = 0;
  let i = 0;
  let k = window.setInterval(function () {
    if (i >= 10) {
      clearInterval(k);
    } else {
      element.style.opacity = i / 10;
      i++;
    }
  }, 35); // milliseconds * 10 for the animation to run.
}

function addContextMenuItem(ul) {
  console.log('Adding `hide chat` button to <ul>:', ul);

  const li = ul.firstElementChild.cloneNode(true);
  for (const div of li.children) {
    if (div.getAttribute('role') === 'button' && div.textContent) {
      div.textContent = 'Hide chat';
      div.setAttribute('aria-label', 'Hide chat');
    }
  }
  li.classList.add('fwa-dropdown');
  li.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'hideChat' });
  });
  fadeInOpacity(li);
  ul.append(li)
}

function addHideButton() {
  const span = document.querySelector('.app-wrapper-web > span:nth-child(4)');
  if (!span) return;

  observe(span, _ => {
    const ul = span.querySelector('ul');
    if (ul) addContextMenuItem(ul);
  });
}

// When loading - listen for loaded event
if (isLoadingWhatsapp()) {
  console.log('WhatsApp web is still loading, observing loader...');
  const app = document.querySelector('.app-wrapper-web');
  observe(app, (_, observer) => {
    if (!elemExists('#side')) return;
    console.log('WhatsApp loaded ✓ (`#side` element exists)');
    observer.disconnect();
    addHideButton();
  });
}
addHideButton();
