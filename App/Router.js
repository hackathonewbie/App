import React from 'react';
import { Router, Stack, Scene} from 'react-native-router-flux';
import DefaultScreen from './DefaultScreen';

export default App = () => (
  <Router>
    <Stack key="root">
      <Scene key="login" component={DefaultScreen} title="Login"/>
    </Stack>
  </Router>
);
