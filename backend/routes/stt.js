const express = require('express');
const router = express.Router();
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const speechConfig = sdk.SpeechConfig.fromSubscription("f34cc604a9614af5892dfe09d5085c50", "eastus");
const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();
const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);

router.get('/', (req, res) => {

})


module.exports = router;
