import React, { useState } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Icon from 'react-native-vector-icons/Feather';

const App = () => {
  let [input, setInput] = useState('Enter text to translate');
  let [translated, setTranslated] = useState('');
  let [language, setLanguage] = useState('yoda')

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
      <DropDownPicker
        items={[
          { label: 'Yoda', value: 'yoda' },
          { label: 'Sith', value: 'sith' },
          { label: 'Gungan', value: 'gungan' }
        ]}
        defaultValue={language}
        containerStyle={{ height: 40 }}
        style={{ backgroundColor: '#fafafa' }}
        itemStyle={{
          justifyContent: 'flex-start'
        }}
        dropDownStyle={{ backgroundColor: '#fafafa' }}
        onChangeItem={item => setLanguage(item)}
      />
    </View>
  );
}

export default App;