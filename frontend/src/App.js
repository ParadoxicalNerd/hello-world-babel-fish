import * as Speech from "microsoft-cognitiveservices-speech-sdk";
import React, { useState } from 'react'

const App = () => {
    let [input, setInput] = useState('Enter text to translate');
    let [translated, setTranslated] = useState('');
    let [language, setLanguage] = useState('yoda')

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

    const translator = () => {
        return fetch(`https://localhost:3000/translation?lang=${language}&text=${input}`)
            .then(val => val.json())
            .then(val => setTranslated(val.contents.translated))
    }

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <h1>Input text you want to translate</h1>
            <textarea value={input} onChange={e => setInput(e.target.value)} />
            <select value={language} onChange={e => setLanguage(e.target.value)}>
                <option value="yoda">Yoda</option>
                <option value="sith">Sith</option>
                <option value="gungan">Gungam</option>
            </select>

            <button onClick={e => transcribe()} >Click me to transcribe</button>

            <button onClick={e => translator()}>Click to translate</button>

            <h1>Translated Text</h1>
            <p>{translated}</p>
        </div>
    );
}

export default App;