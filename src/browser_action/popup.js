var superTone;

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
	function strip(html) {
		var tmp = document.createElement("DIV");
		tmp.innerHTML = html;
		return tmp.textContent || tmp.innerText || "";
	}

	var parsedText = strip(request.source);
	
	function processTone(mydata){
		tonescare = ["disgust", "anger", "fear", "joy", "sadness"];
		var myDocTone;
		var myDocToneScore = 0;
		for (pretone in mydata["document_tone"]["tones"]) {
			tone = mydata["document_tone"]["tones"][pretone];
			console.log(tone);
			if (tonescare.indexOf(tone["tone_id"]) != -1
			) {
				if (tone["score"] > myDocToneScore) {
					myDocToneScore = tone["score"];
					myDocTone = tone["tone_id"];
					superTone = myDocTone;
					console.log(superTone);
				}
			}
		}

		// Do something when there is no tone found.
		if (!myDocTone) {
			no_tone.innerText = "No tone.";
		} else {
			var wow = myDocTone.charAt(0).toUpperCase() + myDocTone.slice(1);
			no_tone.innerText = wow;
		}
	}

	function getWatson(parsedText){
		$.ajax("", {
			"data": JSON.stringify({"text": parsedText.replace(/(\r\n|\n|\r)/gm," ").replace(/['"]+/g," ")}),
			"type": "post",
			"processData": false,
			"contentType": "application/json",
			"success": function(data) {
				processTone(data);
			}
		})
	}

	mydata = getWatson(parsedText);
	
	console.log(superTone + "hi");
	
	$('#click').bind('click', function() {
		if(true) {
			$.when(getWatson(parsedText)).then(playSong());
		}
		else {
			console.log("?");
		}
	});
	
	function playSong() {
		var i = Math.floor(Math.random()*3) + 1;
		var audio = new Audio("/songs/" + superTone + i + ".mp3");
		console.log(superTone);
		audio.play();
	}

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

document.addEventListener('DOMContentLoaded', function () {
    var links = document.getElementsByTagName("a");
    for (var i = 0; i < links.length; i++) {
        (function () {
            var ln = links[i];
            var location = ln.href;
            ln.onclick = function () {
                chrome.tabs.create({active: true, url: location});
            };
        })();
    }
});