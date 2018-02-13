# Meloread

A Chrome extension that plays a song based on the mood of the currently browsed webpage. It scrapes the currently browsed webpage for the text of the article and/or document (ex. Google Docs) and parses it, transmitting it to IBM Watson Tone Analysis in order to determine the tone/mood of the current reading. It then offers the user an option to play ambient music that is related to the mood of the song.

Created by Gideon Tong and Jane Zhang at Hackathon by the Sea from December 1st, 2017 to December 2nd, 2017 in a 19-hour time period.

## Download

You can download the extension from the [Google Chrome Web Store](https://chrome.google.com/webstore/detail/meloread/cmbecjhbnopocdcmekllaggbigkionmp).

## Beta Releases

We are now supporting beta releases! To test the beta releases, there are several prerequisites:

1. using a computer (Firefox Mobile is currently unsupported) on *nix, Windows, or macOS
2. Google Chrome
3. IBM Watson API key

Once you have these prerequisites, clone the repository and add the IBM Watson API key, then import the root directory in as an unpackaged extension into Google Chrome with developer mode enabled. To compile, follow normal steps for compiling a Chrome extension.

## Contribution

Contribution is greatly appreciated! You can visit our website or the GitHub issue tracker to see a list of things that need to be done, or visit our website to simply provide feedback. Thank you so much for your support!