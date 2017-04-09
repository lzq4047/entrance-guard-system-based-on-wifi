import React, { Component } from 'react';
import {
    View,
    Modal,
    StyleSheet,
} from 'react-native';

export default class CustomModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <Modal {...this.props}>
          <View style={styles.container}>
            <View style={styles.content}>
              {this.props.children}
            </View>
          </View>
        </Modal>
      )
    }
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      minWidth: 300,
      maxWidth: '80%',
      padding: 15,
      backgroundColor: '#ffffff',
      borderRadius: 2,
    },
});
