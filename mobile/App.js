import React from 'react';

import Routes from './src/Routes'

import {StatusBar} from 'react-native'

export default function App() {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#c40a00'/>
      <Routes/>
    </>
  );
}