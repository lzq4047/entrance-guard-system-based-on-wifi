import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

export default class ModalContent extends Component {
    constructor(props) {
        super(props);
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
    paddingVertical: 10,
  }
})
