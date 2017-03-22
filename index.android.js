/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, {Component} from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';

import App from './src/App.js';
export default class WifiEntranceGuardSystem extends Component {
  constructor(props) {
    super(props);
  
    this.state = {connected: false};
  }

  connect() {
    this.setState({connected: true});
  }

  render() {
    return (
      <App screenProps={{
          connected: this.state.connected,
          handleConnected: () => {
            this.connect();
          }
        }}
      />
    )
  }
}
// const WifiEntranceGuardSystem = App;

AppRegistry.registerComponent('WifiEntranceGuardSystem', () => WifiEntranceGuardSystem);
