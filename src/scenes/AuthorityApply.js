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
    title: '权限申请',
    tabBar: {
      label: '权限申请',
      icon: ({tintColor}) => {
        return (
          <Icon name="fingerprint" size={25} color={tintColor} />
        )
      },
    }
  }
  render() {
    return (
      <ScrollView style={authApplyStyles.container}>
        <Text>AuthorityApply</Text>
      </ScrollView>
    )
  }
};

const authApplyStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  }
})