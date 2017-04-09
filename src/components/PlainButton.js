import React, { Component } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
} from 'react-native';

export default class PlainButton extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { type='primary', size='default' } = this.props;
        const colorMap = {
            'primary': '#47b2fb',
            'error': '#fb6362',
            'success': '#00cf9b',
        };
        return (
            <TouchableOpacity
                style={[styles.common, styles[size] || styles.default, {borderColor: colorMap[type] || '#47b2fb'}]}
                {...this.props}
            >
                <Text style={{color: colorMap[type] || '#47b2fb', textAlign: 'center'}}>
                    {this.props.title || ''}
                </Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    common: {
        borderWidth: 1,
        borderStyle: 'solid',
        marginLeft: 5,
    },
    default: {
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 4,
    },
    small: {
        paddingHorizontal: 5,
        paddingVertical: 5,
        borderRadius: 2,
    },
    large: {
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 4,
    }
});
