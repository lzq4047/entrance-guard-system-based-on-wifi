import React, { Component } from 'react'
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
  NativeModules,
  DeviceEventEmitter,
  AsyncStorage,
} from 'react-native'

import Icon from 'react-native-vector-icons/MaterialIcons'
import PlainButton from '../components/PlainButton.js'
import Modal from '../components/Modal.js'
import ModalHeading from '../components/ModalHeading.js'
import ModalContent from '../components/ModalContent.js'
import ModalFooter from '../components/ModalFooter.js'
const INSTRUCTION_OPEN = 1
export default class Home extends Component {
  constructor (props) {
    super(props)

    this.state = {
      modalVisible: false,
      leftTime: 5,
      ip: '192.168.4.1',
      port: 8235,
      hasAuth: false
    }
    let closeModalTimer = null;
  }

  static navigationOptions = {
    title: '首页',
    tabBar: {
      label: '首页',
      icon: ({tintColor}) => {
        return (
          <Icon name="home" size={25} color={tintColor} />
        )
      },
    },
  }

  render () {
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <ModalHeading>
            <Text style={{fontSize: 16, color: this.state.hasAuth ? '#00cf9b' : '#fb6362'}}>{this.state.hasAuth ? '门已打开，请快速通过': '您没有授权'}</Text>
          </ModalHeading>
          <ModalContent>
            <View style={styles.circle}>
              <Text style={{color: '#fff', fontSize: 20}}>
                {this.state.leftTime}s
              </Text>
            </View>
          </ModalContent>
          <ModalFooter>
            <View style={{flexDirection: 'row'}}>
              <PlainButton
                size="small"
                type="error"
                title="未打开？重试"
                onPress={() => {
                  this.setState({modalVisible: false})
                }}
              />
              <PlainButton
                size="small"
                title="已通过"
                onPress={() => {
                  this.setState({modalVisible: false})
                }}
              />
            </View>
          </ModalFooter>
        </Modal>
        <TouchableOpacity
          style={[styles.circle, {width: 120, height: 120}]}
          onPress={() => {
            const {ip, port} = this.state
            AsyncStorage.getItem('serialNumber', (err, res) => {
              const msg = res || 'b4511bfa';
              // const msg = '1b4511bfa';
              console.log(msg);
              NativeModules.UDPSocket.send(INSTRUCTION_OPEN + msg);
            });
          }}
        >
          <Text style={{fontSize: 24, color: '#fff'}}>开门</Text>
        </TouchableOpacity>
        <Text style={styles.note}>请确保已经正确连接门禁系统WiFi，并且已经在配置界面配置好权限信息</Text>
      </View>
    )
  }

  componentDidMount () {
    DeviceEventEmitter.addListener('onSocketReceive', e => {
      console.log('Socket接收到消息:' + e.message);
      const ret = JSON.parse(e.message);
      if(ret.code === 1) {
        this.setState({modalVisible: true, hasAuth: true, leftTime: 5});
        console.log(this.state);
        this.closeModalTimer = setInterval(() => {
          this.setState({leftTime: this.state.leftTime - 1});
          console.log(this.state);
          if(this.state.leftTime === 0) {
            this.setState({modalVisible: false})
            clearInterval(this.closeModalTimer);
          }
        }, 1000);
      } else if(ret.code === -1) {
        this.setState({modalVisible: true, hasAuth: false, leftTime: 0});
      }
      console.log(ret);
    })
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#f8f9fa',
  },
  note: {
    marginTop: 20,
    padding: 10,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 4,
    color: '#777',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 30,
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#47b2fb',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
})
