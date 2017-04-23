import React, { Component } from 'react';
import {
  Alert,
  View,
  ScrollView,
  Text,
  Button,
  Switch,
  Geolocation,
  StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import ConfigBlock from '../components/ConfigBlock.js';
import FormItem from '../components/FormItem.js';

export default class Start extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      autoRun: false,
      autoConnect: false,
      autoClose: 5,
      ssid: '',
      wifiPwd: '',
    };
  }
  static navigationOptions = {
    title: '系统配置',
    tabBar: {
      label: '系统配置',
      icon: ({tintColor}) => {
        return (
          <Icon name="settings" size={25} color={tintColor} />
        )
      }
    }
  }
  render() {
    const autoCloseData =[
      {
        key: 'autoClose',
        pickerProps: {
          selectedValue: this.state.autoClose,
          onValueChange: autoClose => this.setState({autoClose})
        },
        options: [
          {label: '5s', value: 5, key: 'autoclose5s'},
          {label: '10s', value: 10, key: 'autoclose10s'},
          {label: '15s', value: 15, key: 'autoclose15s'},
        ]
      }
    ];
    return (
      <ScrollView style={styles.container}>
        <ConfigBlock>
          <View style={styles.configHeading}>
            <Text style={styles.label}>应用自启动</Text>
            <Switch
              onTintColor="#00cf9b"
              tintColor="#cccccc"
              value={this.state.autoRun}
              onValueChange={autoRun => this.setState({autoRun})}
            />
          </View>
        </ConfigBlock>
        <ConfigBlock>
          <View style={styles.configHeading}>
            <Text style={styles.label}>自动连接WiFi</Text>
            <Switch
              onTintColor="#00cf9b"
              tintColor="#cccccc"
              value={this.state.autoConnect}
              onValueChange={autoConnect => this.setState({autoConnect})}
            />
          </View>
          <View>
            <FormItem
              label="门禁系统位置"
              placeholder="请手动输入或获取门禁系统位置信息"
              value={this.state.position}
              onValueChange={position => this.setState({position})}
              buttonProps = {{
                title: "获取",
                onPress: () => {
                  navigator.geolocation.getCurrentPosition(position => {
                    console.log(position);
                    this.setState({position: `${position.coords.latitude},${position.coords.longitude}`})
                  }, error => {
                    console.log(error);
                  })
                }
              }}
            />
            <FormItem
              label="SSID"
              placeholder="输入门禁系统的SSID"
              value={this.state.ssid}
              onValueChange={ssid => this.setState({ssid})}
            />
            <FormItem
              label="密码"
              placeholder="输入门禁系统的密码"
              value={this.state.wifiPwd}
              onValueChange={wifiPwd => this.setState({wifiPwd})}
            />
            <FormItem
              label="自动关闭时间"
              data={autoCloseData}
            />
          </View>
        </ConfigBlock>
      </ScrollView>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  configHeading: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ebebeb',
  },
  label: {
    color: '#333',
  }
})