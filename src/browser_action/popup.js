chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    // message.innerText = request.source;
	function strip(html) {
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		ree.innerText = temp.indexOf("<head>");
		return tmp.textContent || tmp.innerText || "";
	}
	var parsedText = strip(request.source);
	var startOfHead = parsedText.indexOf("<head>");
	// ree.innerText = startOfHead;
  }
});

function onWindowLoad() {

  var message = document.querySelector('#message');

  chrome.tabs.executeScript(null, {
    file: "/src/browser_action/getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });

}

window.onload = onWindowLoad;
