import React, { Component } from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

export default class ConfigBlock extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  }
})