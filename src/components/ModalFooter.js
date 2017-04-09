import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

export default class ModalFooter extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={{alignItems: 'flex-end'}}>
              {this.props.children}
            </View>
        )
    }
}
