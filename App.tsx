import React from 'react';
import {StatusBar} from 'react-native';
import {MemeGeneratorScreen} from './src/screens/MemeGeneratorScreen';
import {COLORS} from './src/constants';

function App(): React.JSX.Element {
  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={COLORS.SCREEN_BACKGROUND}
      />
      <MemeGeneratorScreen />
    </>
  );
}

export default App;
