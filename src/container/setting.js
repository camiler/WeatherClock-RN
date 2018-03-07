/* eslint-disable no-alert */
import React, { Component } from 'react';
import moment from 'moment';
import BackgroundJob from 'react-native-background-job';
import ReactNativeAN from 'react-native-alarm-notification';
import PropTypes from 'prop-types';
import {Modal, View, TextInput, Picker, Text, TouchableHighlight, ToastAndroid} from 'react-native';
import {Button} from '../components/';
import {commonStyles, colors} from '../config/styles'
import styles from './setting-style';
import {get} from '../util/fetchApi';

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
  fire_date: '05-03-2018 11:08:00'            // Date for firing alarm, Required for ReactNativeAN.scheduleAlarm. Format: dd-MM-yyyy HH:mm:ss
};

let aqi_max, clockHour, clockMinute;
const PEROID = 24 * 60 * 60 * 1000;
const backgroundSchedule = {
  jobKey: 'pm2.5clock',
  period: 60000,
  allowExecutionInForeground: true
}
const resetScheduleAndAlarm = () => {
  if (backgroundSchedule.period !== PEROID) {
    backgroundSchedule.period = PEROID;
    BackgroundJob.schedule(backgroundSchedule);
  }
  //alarmNotifData.fire_date = moment().add(30, 's');
  ReactNativeAN.sendNotification(alarmNotifData);
}
const backgroundJob = {
  jobKey: 'pm2.5clock',
  job: () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position && position.coords) {
          const {longitude, latitude} = position && position.coords;
          const url = `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=a0921835e79a8010263dea8a071f14febbf595b9`;
          get(url).then(resData => {
            console.log(resData);
            if (resData.status === 'ok') {
              const {iaqi, aqi} = resData.data;
              if (iaqi && iaqi.v <= aqi_max || aqi <= aqi_max) {
                resetScheduleAndAlarm();
              }
            } else {
              alarmNotifData.message = '今天自动获取天气有点问题，小主人自己手动刷新吧！';
              resetScheduleAndAlarm();
            }
          }).catch(() => {
            alarmNotifData.message = '今天自动获取天气有点问题，小主人自己手动刷新吧！';
            resetScheduleAndAlarm();
          });
        }
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }
};
BackgroundJob.register(backgroundJob);

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: aqi_max || '',
      hour: clockHour || '07',
      minute: clockMinute || '10',
      modalVisible: false
    };
  }

  navigate = () => {
    const { navigate } = this.props.navigation;
    navigate('Weather')
  }

  confirm = () => {
    const {hour, minute, text} = this.state;
    if (text) {
      const today = moment().hour(parseInt(hour, 10)).minute(parseInt(minute, 10)).second(0);
      const now = moment(new Date());
      aqi_max = text;
      if (clockHour !== hour || clockMinute !== minute) {
        //缓存中时间不一致时修改并重新设置调度
        clockHour = hour;
        clockMinute = minute;
        let diff = 0;
        if (today.isAfter(now)) {
          diff = Math.abs(now.diff(today));
        } else {
          const tomorrow = today.add(1, 'day');
          diff = tomorrow.diff(now);
        }
        aqi_max = text;
        backgroundSchedule.period = diff - 30000;
        BackgroundJob.schedule(backgroundSchedule);
      }
      this.setState({
        modalVisible: true,
      })
    } else {
      ToastAndroid.show('请输入触发闹钟允许的AQI最大值', ToastAndroid.LONG);
    }
  }

  textChange = (text) => {
    this.setState({text})
  }

  pickHour = (hour) => {
    this.setState({hour})
  }

  pickMinute = (minute) => {
    this.setState({minute});
  }

  renderNumber = (max) => {
    const items = [];
    for (let i = 0; i < max; i++) {
      const j = i < 10 ? `0${String(i)}` : String(i);
      items.push(<Picker.Item label={j} value={j} key={i}/>)
    }
    return items;
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
    })
  }

  requestClose = () => {
    console.log('modal request close')
  };

  render() {
    const {text, hour, minute, modalVisible} = this.state;

    return (
      <View style={[commonStyles.container, styles.container]}>
        <Modal
          animationType="fade"
          transparent={false}
          visible={modalVisible}
          onRequestClose={this.requestClose}
        >
          <View style={[commonStyles.container, {backgroundColor: colors.maskBackground}]}>
            <View style={styles.modalInner}>
              <Text style={[commonStyles.textCenter, commonStyles.font20, {marginTop: 20}]}>设置成功</Text>
              <Text style={[commonStyles.textCenter, commonStyles.font14, {padding: 20}]}>闹钟每天将在PM2.5小于{text}时，于{hour}:{minute}响起</Text>
              <TouchableHighlight onPress={this.closeModal} style={styles.modalBtn}>
                <Text style={[commonStyles.textCenter, commonStyles.font16]}>知道了</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <TextInput
          placeholder={'请输入触发闹钟允许的AQI最大值'}
          placeholderTextColor="#CCCCCC"
          style={styles.textInput}
          onChangeText={this.textChange}
          value={text}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
        />
        <View style={styles.pickView}>
          <View style={styles.picker}>
            <Picker
              prompt="请选择闹钟响起时间"
              selectedValue={hour}
              onValueChange={this.pickHour}>
              {this.renderNumber(24)}
            </Picker>
          </View>
          <View style={styles.picker}>
            <Picker
              prompt="请选择闹钟响起时间"
              selectedValue={minute}
              onValueChange={this.pickMinute}>
              {this.renderNumber(60)}
            </Picker>
          </View>
        </View>
        <View style={styles.btnPos}>
          <Button text="确定" onPress={this.confirm} btnTouchStyle={styles.setBtnTouch} textStyle={commonStyles.textCenter}/>
        </View>
      </View>
    );
  }
}
/**
 *
 * @type {{navigation: *}}
 */
Home.propTypes = {
  navigation: PropTypes.object
};

Home.navigationOptions = {
  title: 'PM2.5 CLOCK',
}
