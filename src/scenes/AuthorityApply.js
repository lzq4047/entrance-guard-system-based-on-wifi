import React, { Component } from 'react';
import {
  View,
  Alert,
  ScrollView,
  Text,
  Button,
  Picker,
  TextInput,
  StyleSheet,
  NativeModules
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import FormItem from '../components/FormItem.js';

export default class Start extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userType: 'owner',
      username: '',
      ownername: '',
      ID: '',
      bulider: 'b1',
      floor: 'f1',
      house: '',
      serialNumber: '',
      applyDuration: '',
    };
  }

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
    const userTypeData = [
      {
        key: 'userType',
        pickerProps: {
          selectedValue: this.state.userType,
          onValueChange: (userType) => {
            this.setState({userType});
          }
        },
        pickerItemProps: {

        },
        options: [
          {label: '我是业主', value: 'owner', key: 'owner'},
          {label: '我是访客', value: 'visitor', key: 'visitor'},
        ]
      }
    ];
    const builderInfoData = [
      {
        key: 'builder',
        pickerProps: {
          selectedValue: this.state.builder,
          onValueChange: (builder) => {
            this.setState({builder});
          }
        },
        options: [
          {label: '1栋', value: 'b1', key: 'builder1'},
          {label: '2栋', value: 'b2', key: 'builder2'},
          {label: '3栋', value: 'b3', key: 'builder3'},
        ],
      },
      {
        key: 'floor',
        pickerProps: {
          selectedValue: this.state.floor,
          onValueChange: (floor) => {
            this.setState({floor});
          }
        },
        options: [
          {label: '1层', value: 'f1', key: 'floor1'},
          {label: '2层', value: 'f2', key: 'floor2'},
          {label: '3层', value: 'f3', key: 'floor3'},
        ],
      },
    ];
    return (
      <ScrollView style={styles.container}>
        <View>
          <FormItem
            label="访客类型"
            data={userTypeData}
          />
        </View>
        <View>
          <FormItem
            label="姓名"
            placeholder="请输入您的姓名"
            value={this.state.username}
            onChangeText={username => this.setState({username})}
          />
          <FormItem
            label="身份证号码"
            placeholder="请输入您的身份证号码"
            keyboardType="numeric"
            maxLength ={18}
            value={this.state.ID}
            onChangeText={ID => this.setState({ID})}
          />
          {
            this.state.userType === 'visitor'
            &&
            <FormItem
              label="业主姓名"
              placeholder="请输入业主姓名"
              value={this.state.ownername}
              onChangeText={ownername => this.setState({ownername})}
            />
          }
          <FormItem
            label="楼宇信息"
            data={builderInfoData}
          />
          <FormItem
            label="房间号"
            placeholder="请输入您的房间号"
            value={this.state.house}
            onChangeText={house => this.setState({house})}
          />
          {
            this.state.userType === 'visitor'
            &&
            <FormItem
              label="申请时长"
              placeholder="请输入申请时长（天）"
              value={this.state.applyDuration}
              onChangeText={applyDuration => this.setState({applyDuration})}
            />
          }
          <FormItem
            editable={false}
            label="唯一标识符"
            placeholder="点击获取唯一标识符"
            value={this.state.serialNumber}
            onChangeText={mac => this.setState({mac})}
            buttonProps={{
              title: '获取',
              onPress: () => {
                NativeModules.DeviceInfo.getSerialNumber()
                  .then((serialNumber) => {
                    this.setState({serialNumber});
                  })
                  .catch((err) => {
                    console.error('请使用Android2.3以上的设备');
                  });
              }
            }}
          />
        </View>
        <View style={styles.tips}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="warning" size={25} color="#fb6362"></Icon>
            <Text style={{marginLeft: 5, fontSize: 16, color: '#fb6362'}}>注意</Text>
          </View>
          <View style={styles.tipsContent}>
            <Text style={styles.tipsItem}>1.请确保已经正确连接门禁系统WiFi</Text>
            <Text style={styles.tipsItem}>2.请确保该手机常用，丢失请尽快与管理员联系</Text>
            <Text style={styles.tipsItem}>3.本次申请会经过管理员手工确认，请与管理员联系</Text>
          </View>
        </View>
        <View style={styles.buttonGroup}>
          <View style={{marginHorizontal: 5, width: 80}}>
            <Button
              title="申请授权"
              onPress={() => {
                console.log(this.state);
              }}
            />
          </View>
          <View style={{marginLeft: 5, width: 80}}>
            <Button
              color="#b3b3b3"
              title="重置"
              onPress={() => {
                console.log('reset');
              }}
            />
          </View>
        </View>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  item: {
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    flexBasis: 100,
    paddingRight: 5,
    textAlign: 'right',
    color: '#777',
    fontSize: 14,
  },
  fields: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d8d8d8',
  },
  tips: {
    marginVertical: 20,
  },
  tipsContent: {
    paddingLeft: 10,
  },
  tipsItem: {
    marginVertical: 5,
  },
  buttonGroup: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
})