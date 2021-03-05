export function addHideChatButton(ul) {
  console.log('giezer!');
  debugger;
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