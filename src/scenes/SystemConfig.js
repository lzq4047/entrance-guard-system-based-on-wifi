import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Start extends Component {
  static navigationOptions = {
    title: '系统配置',
    tabBar: {
      label: '系统配置',
      icon: ({tintColor}) => {
        return (
          <Icon name="settings" size={25} color={tintColor} />
        )
      }
    }
  }
  render() {
    return (
      <ScrollView style={sysConfigStyles.container}>
        <Text>SystemConfig</Text>
      </ScrollView>
    )
  }
};

const sysConfigStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  }
})