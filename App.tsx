/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StatusBar} from 'react-native';
import MemeGeneratorScreen from './MemeGeneratorScreen';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="#808080" />
      <MemeGeneratorScreen />
    </>
  );
}

export default App;
