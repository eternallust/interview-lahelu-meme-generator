import React from 'react';
import {StatusBar} from 'react-native';
import {MemeGeneratorScreen} from './src/screens/MemeGeneratorScreen';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#808080" />
      <MemeGeneratorScreen />
    </>
  );
}

export default App;
