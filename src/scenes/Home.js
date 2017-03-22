import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Right from '../components/Right.js';

export default class Start extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = {
    title: "首页",
    tabBar: {
      label: '首页',
      icon: ({tintColor}) => {
        return (
          <Icon name="home" size={25} color={tintColor} />
        )
      },
    },
  }
  render() {
    return (
      <ScrollView style={homeStyles.container}>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
        <Text>Home</Text>
      </ScrollView>
    )
  }
};

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  }
})
