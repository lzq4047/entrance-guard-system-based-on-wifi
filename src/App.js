import React from 'react';

import Home from './scenes/Home';
import AuthorityApply from './scenes/AuthorityApply';
import SystemConfig from './scenes/SystemConfig';

import { TabNavigator, StackNavigator } from 'react-navigation'

const MainScreenTabNavigator = TabNavigator({
  Home: {screen: Home},
  AuthorityApply: {screen: AuthorityApply},
  SystemConfig: {screen: SystemConfig}
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    },
    style: {
      backgroundColor: '#47b2fb',
    },
    showIcon: true,
    activeTintColor: "#fff",
    inactiveTintColor: "#333"
  }
});

const MainScreenStackNavigator = StackNavigator({
  MainScreenTabNavigator: {screen: MainScreenTabNavigator}
}, {
  navigationOptions: {
    header: () => {
      return {
        style: {
          backgroundColor: '#47b2fb',
          paddingHorizontal: 10,
        },
        titleStyle: {
          color: '#fff',
        }
      }
    },
  }
});

export default MainScreenStackNavigator;