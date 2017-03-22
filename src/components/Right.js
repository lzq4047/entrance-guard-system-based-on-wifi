import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class Right extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    const {connected} = this.props;
    return (
      connected
      ? <Icon name="check-circle" size={35} color="#00cf9b" />
      : <Icon name="error" size={35} color="#fb6362" />
    )
  }
}