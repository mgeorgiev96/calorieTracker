
import React from 'react';
import Navigator from './drawer/Navigator';
import {Provider} from 'react-redux'
import store from './global/store/store'


export default function App() {
  return (
    <Provider store={store}>
      <Navigator/>
    </Provider>
  );
}

