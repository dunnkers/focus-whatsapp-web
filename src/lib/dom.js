export function addListeners() {
  console.log('addListeners()');
  console.log(document);
  console.log(window);
  const startup = document.querySelector('#startup');
  console.log('startup:', startup);
  if (!!startup) { // we are loading
    console.log('WhatsApp web is still loading, observing loader...');

    const observer = new MutationObserver((mutationsList, observer) => {
      console.log('MutationObserver triggered: ', mutationsList);
    });
    
    const appWrapper = document.querySelector('.app-wrapper-web');
    observer.observe(appWrapper, { childList: true, subtree: true });
    console.log('Added observer.');
  }
};

export function addHideChatButton(ul) {
  console.log('addHideChatButton()');
  return;
  // add listener to <span> that always remains in DOM
  const observer = new MutationObserver((mutationsList, observer) => {
    console.log('MutationObserver triggered: ', mutationsList);
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes.length) {
        console.log('adding hide chat button...');
        // add context menu.
        const ul = mutation.addedNodes[0].firstElementChild;
        console.log('found <ul>', ul);
        const li = ul.firstElementChild.cloneNode(true);
        for (const div of li.children) {
          if (div.getAttribute('role') === 'button' && div.textContent) {
            div.textContent = 'Hide chat';
            div.setAttribute('aria-label', 'Hide chat');
          }
        }
        ul.append(li)
      }
    }
  })

  const div = ul.parentElement;
  const span = div.parentElement;
  observer.observe(span, { childList: true, subtree: true });

  // remove div
  const divNode = div.cloneNode(true);
  span.removeChild(div);
  span.appendChild(divNode);
};