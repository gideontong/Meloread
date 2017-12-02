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
	//message.innerText = parsedText.replace(/(\r\n|\n|\r)/gm," ").replace(/['"]+/g," ");
	// To-Do: Strip inline CSS

	//* THIS DOESN'T WORK. I DON'T KNOW WHY, BUT IT ALSO BREAKS HTML.

	/* function getTone(text) {
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
			if (error).
				console.log("Error found at: ", error);
			else
				console.log(JSON.stringify(response, null, 2));
		})
	} */
	function processTone(mydata){
		tonescare = ["disgust", "anger", "fear", "joy", "sadness"];
		var myDocTone;
		var myDocToneScore = 0;
		for (pretone in mydata["document_tone"]["tones"]) {
			tone = mydata["document_tone"]["tones"][pretone];
			console.log(tone);
			if (tonescare.indexOf(tone["tone_id"]) != -1
			//$.inArray(tone["tone_id"], tonescare)
			) {
				if (tone["score"] > myDocToneScore) {
					myDocToneScore = tone["score"];
					myDocTone = tone["tone_id"];
				}
			}
		}

		if (!myDocTone) {
			// DO SOMETHING WHEN THERE IS NO TONE
			no_tone.innerText = "No tone.";
		} else {
			no_tone.innerText = myDocTone;
		}
	}

	function getWatson(parsedText){
		$.ajax("https://@gateway.watsonplatform.net/tone-analyzer/api/v3/tone?version=2017-09-21", {
			"data": JSON.stringify({"text": parsedText.replace(/(\r\n|\n|\r)/gm," ").replace(/['"]+/g," ")}),
			"type": "post",
			"processData": false,
			"contentType": "application/json",
			"success": function(data) {
				//tone_answer.innerText = JSON.stringify(data);
				processTone(data);
			}
		})
	}

	mydata = getWatson(parsedText);

	/*
	var parsedTone = getTone(parsedText);
	tone_answer.innerText = parsedTone;
	*/


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
