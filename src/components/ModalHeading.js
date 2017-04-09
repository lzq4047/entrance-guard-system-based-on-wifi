import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';

export default class ModalHeading extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View>
                {this.props.children}
            </View>
        )
    }
};