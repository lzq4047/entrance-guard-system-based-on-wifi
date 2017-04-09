import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PlainButton from '../components/PlainButton.js';
import Modal from '../components/Modal.js';
import ModalHeading from '../components/ModalHeading.js';
import ModalContent from '../components/ModalContent.js';
import ModalFooter from '../components/ModalFooter.js';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      isOpen: false,
      leftTime: 15,
      closeTimer: null,
    }
  }
  static navigationOptions = {
    title: "首页",
    tabBar: {
      label: '首页',
      icon: ({tintColor}) => {
        return (
          <Icon name="home" size={25} color={tintColor} />
        )
      },
    },
  }
  render() {
    return (
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <ModalHeading>
            <Text style={{fontSize: 16, color: '#00cf9b'}}>门已打开，请快速通过</Text>
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
                    this.setState({modalVisible: false});
                  }}
                />
                <PlainButton
                  size="small"
                  title="已通过"
                  onPress={() => {
                    this.setState({modalVisible: false});
                  }}
                />
              </View>
          </ModalFooter>
        </Modal>
        <TouchableOpacity
          style={[styles.circle, {width: 120, height: 120}]}
          onPress={() => {
            this.setState({modalVisible: true});
          }}
        >
          <Text style={{fontSize: 24, color: '#fff'}}>开门</Text>
        </TouchableOpacity>
        <Text style={styles.note}>请确保已经正确连接门禁系统WiFi，并且已经在配置界面配置好权限信息</Text>
      </View>
    )
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
    lineHeight: 30
  },
  circle: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: '#47b2fb',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  }
})
