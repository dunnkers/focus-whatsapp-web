export function addListeners() {
  console.log('addListeners()');
  console.log(document);
  console.log(window);
  const startup = document.querySelector('#startup');
  console.log('startup:', startup);
  if (!!startup) { // we are loading
    console.log('WhatsApp web is still loading, observing loader...');

    const observer = new MutationObserver((mutationsList, observer) => {
      console.log('is app loaded now? maybe. ', mutationsList);
      observer.disconnect();
      addHideButton();
    });

    const appWrapper = document.querySelector('.app-wrapper-web');
    observer.observe(appWrapper, { childList: true, subtree: true });
    console.log('Added observer.');
  }
};

export function addHideButton() {
  console.log('addHideButton.');
  const spans = document.querySelectorAll('.app-wrapper-web > span');
  console.log(spans.length, 'spans found.')

  const observer = new MutationObserver((mutationsList, observer) => {
    console.log('MutationObserver triggered: ', mutationsList);
    for (const mutation of mutationsList) {
      if (mutation.type !== 'childList') continue;
      if (!mutation.addedNodes.length) continue;
      
      console.log('adding hide chat button...');

      // add context menu.
      const elem = mutation.addedNodes[0].firstElementChild;
      if (elem.tagName !== 'UL') continue;
      const ul = elem;
      console.log('found <ul>', ul);
      const li = ul.firstElementChild.cloneNode(true);
      for (const div of li.children) {
        if (div.getAttribute('role') === 'button' && div.textContent) {
          div.textContent = 'Hide chat';
          div.setAttribute('aria-label', 'Hide chat');
        }
      }
      li.style.opacity = 1; // set opacity.
      ul.append(li)
    }
  })

  for (const span of spans) {
    observer.observe(span, { childList: true, subtree: true });
  }
}
addHideButton();

export function addHideChatButton(ul) {
  console.log('addHideChatButton()');
  return;
};