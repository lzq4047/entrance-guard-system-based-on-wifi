import React, { Component } from 'react'
import {
  View,
  Alert,
  ScrollView,
  Text,
  Button,
  Picker,
  TextInput,
  StyleSheet,
  NativeModules,
  AsyncStorage,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import FormItem from '../components/FormItem.js'
const INSTRUCTION_APPLY = 2
const fields = ['userType', 'userName', 'ownerName', 'IDNumber', 'builder', 'floor', 'house', 'serialNumber', 'applyDuration']
export default class Start extends Component {
  constructor (props) {
    super(props)
    this.state = {
      userType: 'owner',
      userName: '',
      ownerName: '',
      IDNumber: '',
      builder: 'b1',
      floor: 'f1',
      house: '',
      serialNumber: '',
      applyDuration: '7',
    }
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
    },
  }

  render () {
    console.log(this.state);
    const userTypeData = [
      {
        key: 'userType',
        pickerProps: {
          selectedValue: this.state.userType,
          onValueChange: userType => {
            this.setState({userType});
            AsyncStorage.setItem('userType', userType, err => {
              console.log('Saved failed.');
            })
          },
        },
        pickerItemProps: {},
        options: [
          {label: '我是业主', value: 'owner', key: 'owner'},
          {label: '我是访客', value: 'visitor', key: 'visitor'},
        ],
      },
    ]
    const builderInfoData = [
      {
        key: 'builder',
        pickerProps: {
          selectedValue: this.state.builder,
          onValueChange: builder => {
            this.setState({builder});
            AsyncStorage.setItem('builder', builder, err => {
              console.log('Saved failed.');
            })
          },
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
          onValueChange: floor => {
            this.setState({floor});
            AsyncStorage.setItem('floor', floor, err => {
              console.log('Saved failed.');
            })
          },
        },
        options: [
          {label: '1层', value: 'f1', key: 'floor1'},
          {label: '2层', value: 'f2', key: 'floor2'},
          {label: '3层', value: 'f3', key: 'floor3'},
        ],
      },
    ]

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
            value={this.state.userName}
            onChangeText={userName => {
              this.setState({userName});
              AsyncStorage.setItem('userName', userName, err => {
                console.log('Saved failed');
              });
            }}
          />
          <FormItem
            label="身份证号码"
            placeholder="请输入您的身份证号码"
            keyboardType="numeric"
            maxLength={18}
            value={this.state.IDNumber}
            onChangeText={IDNumber => {
              this.setState({IDNumber});
              AsyncStorage.setItem('IDNumber', IDNumber, err => {
                console.log('Saved failed');
              });
            }}
          />
          {
            this.state.userType === 'visitor'
            &&
            <FormItem
              label="业主姓名"
              placeholder="请输入业主姓名"
              value={this.state.ownerName}
              onChangeText={ownerName => {
                this.setState({ownerName});
                AsyncStorage.setItem('ownerName', ownerName, err => {
                  console.log('Saved failed');
                });
              }}
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
            onChangeText={house => {
              this.setState({house});
              AsyncStorage.setItem('house', house, err => {
                console.log('Saved failed');
              });
            }}
          />
          {
            this.state.userType === 'visitor'
            &&
            <FormItem
              label="申请时长"
              placeholder="请输入申请时长（天）"
              keyboardType="numeric"
              value={this.state.applyDuration}
              onChangeText={applyDuration => {
                this.setState({applyDuration});
                AsyncStorage.setItem('applyDuration', applyDuration, err => {
                  console.log('Saved failed');
                })
              }}
            />
          }
          <FormItem
            editable={false}
            label="唯一标识符"
            placeholder="点击获取唯一标识符"
            value={this.state.serialNumber}
            onChangeText={serialNumber => {
              this.setState({serialNumber});
              AsyncStorage.setItem('serialNumber', serialNumber, err => {
                console.log('Saved failed');
              })
            }}
            buttonProps={{
              title: '获取',
              onPress: () => {
                NativeModules.DeviceInfo.getSerialNumber()
                .then((serialNumber) => {
                  this.setState({serialNumber});
                  // AsyncStorage.setItem('serialNumber', serialNumber, err => {
                  //   console.log('Saved failed');
                  // })
                })
                .catch((err) => {
                  console.error('请使用Android2.3以上的设备')
                })
              },
            }}
          />
        </View>
        <View style={styles.tips}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon name="warning" size={25} color="#fb6362">&nbsp;</Icon>
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
                let applyStatus = true;
                console.log(INSTRUCTION_APPLY + JSON.stringify(this.state));
                NativeModules.UDPSocket.send(INSTRUCTION_APPLY + JSON.stringify(this.state));
              }}
            />
          </View>
          <View style={{marginLeft: 5, width: 80}}>
            <Button
              color="#b3b3b3"
              title="重置"
              onPress={() => {
                console.log('reset')
              }}
            />
          </View>
        </View>
      </ScrollView>
    )
  }

  componentDidMount () {
    fields.forEach(field => {
      AsyncStorage.getItem(field, (err, res) => {
        if (res) {
          console.log(field + ':' + res);
          this.setState({[field]: res});
          // this.forceUpdate();
        }
      })
    });
  }
}

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