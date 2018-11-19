// This causes the Chrome extension to add a listener for the button to read the Chrome page.
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
  	chrome.pageAction.show(sender.tab.id);
    sendResponse();
  });