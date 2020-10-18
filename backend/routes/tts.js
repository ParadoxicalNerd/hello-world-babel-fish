var express = require('express');
var router = express.Router();
const https = require('https');
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const path = require('path');
const cors = require('cors');

async function synthesizeSpeech(input) {
    const speechConfig = sdk.SpeechConfig.fromSubscription("f34cc604a9614af5892dfe09d5085c50", "eastus");
    const audioConfig = sdk.AudioConfig.fromAudioFileOutput(path.join(__dirname, "../audio/audioFile.wav"));

    const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    await synthesizer.speakTextAsync(
        input,
        result => {
            if (result) {
                console.log(JSON.stringify(result));
            }
            synthesizer.close();
        },
        error => {
            console.log(error);
            synthesizer.close();
        });
}
router.get('/', (req, res) => {
     let userIn = req.query.text;
     console.log(userIn)
     synthesizeSpeech(userIn)
 })

 router.get('/returnfile', cors(), (req, res) => {
     res.contentType('audio/wav')
     res.sendFile(path.join(__dirname, "../audio/audioFile.wav"))
 })

module.exports = router;
