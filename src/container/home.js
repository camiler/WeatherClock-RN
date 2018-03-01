import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import ReactNativeAN from 'react-native-alarm-notification';
import {Button} from '../components/';
import {commonStyles} from '../config/styles'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 20,
  },
  picker: {
    width: 200,
    height: 200,
    backgroundColor: '#aaa',
  }
});

const alarmNotifData = {
  id: '12345',                                  // Required
  title: '懒虫！起床跑步了！',               // Required
  message: '空气如此清新，不负蓝天，不负卿！',           // Required
  ticker: 'My Notification Ticker',
  auto_cancel: true,                            // default: true
  vibrate: true,
  vibration: 100,                               // default: 100, no vibration if vibrate: false
  small_icon: 'ic_launcher',                    // Required
  large_icon: 'ic_launcher',
  play_sound: true,
  sound_name: 'mp3.m4a',                             // Plays custom notification ringtone if sound_name: null
  color: 'green',
  schedule_once: true,                          // Works with ReactNativeAN.scheduleAlarm so alarm fires once
  tag: 'some_tag',
  fire_date: '08:00:00'              // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm. Format: dd-MM-yyyy HH:mm:ss
};

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'java'
    };
  }

  componentWillMount() {

  }

  navigate = () => {
    const { navigate } = this.props.navigation;
    navigate('Weather')
  }

  setClock = () => {
    ReactNativeAN.sendNotification(alarmNotifData);
  }

  render() {
    return (
      <View style={commonStyles.container}>
        <Button onPress={this.setClock} text="触发闹钟"/>
        <Text style={styles.welcome}>
          欢迎来到王者农药
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button onPress={this.navigate} text="查看北京空气"/>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.object
};

Home.navigationOptions = {
  title: 'home',
}
