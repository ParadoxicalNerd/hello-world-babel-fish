import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';

const App = () => {
  let [input, setInput] = useState('Enter text to translate');
  let [translated, setTranslated] = useState('');

  const translator = (val) => {
    return fetch('https://reactnative.dev/movies.json')
      .then(val => val.json())
      .then(val => setTranslated(val.title))
  }

  return (
    <View>
      <Text>
        Input the text you want to translate
      </Text>
      <TextInput value={input} onChange={val => setInput(val)} />
      <Button title="Click to translate!" onPress={val => translator(val)} />
      <Text>{"Translated text"}</Text>
      <Text> {translated} </Text>
    </View>
  );
}

export default App;