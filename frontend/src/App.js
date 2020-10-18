import * as Speech from "microsoft-cognitiveservices-speech-sdk";
import React, { useRef, useState } from 'react'
import './style.css';
import { FaMicrophone } from 'react-icons/fa'
import { GiSpeaker } from 'react-icons/gi'

const App = () => {
    let [input, setInput] = useState('');
    let [translated, setTranslated] = useState('');
    let [language, setLanguage] = useState('yoda')
    let player = useRef(null)
    let [canPlay, setCanPlay] = useState(false)

    const transcribe = () => {
        const speechConfig = Speech.SpeechConfig.fromSubscription("f34cc604a9614af5892dfe09d5085c50", "eastus");
        const audioConfig = Speech.AudioConfig.fromDefaultMicrophoneInput();
        const recognizer = new Speech.SpeechRecognizer(speechConfig, audioConfig);

        recognizer.recognizeOnceAsync(result => {
            switch (result.reason) {
                case Speech.ResultReason.RecognizedSpeech:
                    setInput(result.text)
                    break;
                case Speech.ResultReason.NoMatch:
                    console.log("NOMATCH: Speech could not be recognized.");
                    break;
                case Speech.ResultReason.Canceled:
                    const cancellation = Speech.CancellationDetails.fromResult(result);
                    console.log(`CANCELED: Reason=${cancellation.reason}`);

                    if (cancellation.reason == Speech.CancellationReason.Error) {
                        console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                        console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                        console.log("CANCELED: Did you update the subscription info?");
                    }
                    break;
            }
        });

    }

    const playback = () => {
        const speechConfig = Speech.SpeechConfig.fromSubscription("f34cc604a9614af5892dfe09d5085c50", "eastus");
        const audioConfig = Speech.AudioConfig.fromDefaultSpeakerOutput();

        const synthesizer = new Speech.SpeechSynthesizer(speechConfig, audioConfig);

        let speaker = "en-UK-LibbyNeural"

        const translation_file = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="https://www.w3.org/2001/mstts" xml:lang="en-US">
                                    <voice name="${speaker}">
                                        ${translated}
                                    </voice>
                                  </speak>`


        synthesizer.speakSsmlAsync(
            translation_file,
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

    const translator = () => {
        fetch(`http://localhost:3000/translation?lang=${language}&text=${input}`)
            .then(val => val.json())
            .then(val => setTranslated(val.contents.translated))
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>The Babel Fish 🐠</h1>
            <form>
                <textarea value={input} placeholder="Input text you want to translate" onChange={e => setInput(e.target.value)} />
                <button type="button" id="transcribe" onClick={e => transcribe()} ><FaMicrophone /> </button>
            </form>
            <span>
                Select a voice/language:{'  '}
                <select value={language} onChange={e => setLanguage(e.target.value)}>
                    <option value="sindarin">Sindarin</option>
                    <option value="sith">Sith</option>
                    <option value="gungan">Gungam</option>
                    <option vallue="quenya">Quenya</option>
                </select>
            </span>


            <button onClick={e => translator()}>Click to translate</button>

            <h2>Translated Text</h2>
            <p>{translated}</p>

            {(translated != '') && <button id='speaker' onClick={e => playback()} ><GiSpeaker /></button>}

        </div>
    );
}

export default App;
