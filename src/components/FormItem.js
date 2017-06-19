import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Picker,
  Button,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default class FormItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validate: false,
    };
  }

  render() {
    if (this.props.data instanceof Array) {
      const {label, data} = this.props;
      return (
        <View style={formItemStyle.container}>
          <Text style={formItemStyle.label}>{label}：</Text>
          <View style={[formItemStyle.fields, {flexDirection: 'row'}]}>
            {
              data.map((pickerItem, index) => {
                return (
                  <View style={formItemStyle.pickerItem} key={pickerItem.key}>
                    <Picker style={{color: '#333', height: 40}} {...pickerItem.pickerProps}>
                      {
                        pickerItem.options.map((option, index) => {
                          return (
                            <Picker.Item
                              {...pickerItem.pickerItemProps}
                              label={option.label}
                              value={option.value}
                              key={option.key}
                            />
                          )
                        })
                      }
                    </Picker>
                  </View>
                )
              })
            }
          </View>
        </View>
      )
    } else {
      const {label, buttonProps, ...props} = this.props;
      return (
        <View style={formItemStyle.container}>
          <Text style={formItemStyle.label}>{label}：</Text>
          <View style={formItemStyle.fields}>
            <View style={formItemStyle.inputItem}>
              <TextInput
                placeholderTextColor="#b3b3b3"
                underlineColorAndroid="transparent"
                style={{flexDirection: 'row', flex: 1, paddingVertical: 0, height: 40}}
                {...this.props}
              />
            </View>
            {
              buttonProps && <View style={{padding: 5}}><Button {...buttonProps} /></View>
            }
          </View>
        </View>
      )
    }
  }
};
const formItemStyle = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  label: {
    flexBasis: 100,
    color: '#777',
    textAlign: 'right',
  },
  fields: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputItem: {
    flex: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
  },
  pickerItem: {
    flex: 1,
    marginHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
  }
})