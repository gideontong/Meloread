chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    // message.innerText = request.source;
	function strip(html) {
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		// return tmp.indexOf("head");
		return tmp.textContent || tmp.innerText || "";
	}
	
	var parsedText = strip(request.source);
	message.innerText = parsedText;
	// To-Do: Strip inline CSS
	
	function getTone(text) {
		var ToneAnalyzerV3 = require('https://gateway.watsonplatform.net/tone-analyzer/api');
		var tone_analyzer = new ToneAnalyzerV3({
		 username: '',
		 password: '',
		 version_date: '2017-09-21'
		});
		var params = {
			// Get the text from the JSON file.
			text: text, //require('tone.json').text,
			tones: ['disgust', 'fear', 'joy', 'sadness', 'anger']
		};
		
		tone_analyzer.tone(params, function(error, response) {
			if (error)
				console.log("Error found at: ", error);
			else
				console.log("JSON.stringify(response, null, 2));
		}
	}
	
	var parsedTone = getTone(parsedText);
	tone_answer.innerText = parsedTone;
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
