import React, { Component } from 'react';
import moment from 'moment';
import {Modal, View, Picker, Text, TouchableHighlight, ToastAndroid, Switch, Slider, Platform} from 'react-native';
import {Button} from '../components/';
import {commonStyles, colors} from '../config/styles'
import styles from './setting-style';
import {PEROID} from '../config/appvar';
import BackJobAlarm from './scripts/backjob';
import {getData, setData, updateData} from '../util/storage';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 75,
      hour: '07',
      minute: '10',
      modalVisible: false,
      open: true,
    };
    this.jobAlarm = null;
  }

  componentWillMount() {
    getData('clockData').then((data) => {
      const {aqi_max: text, clockHour: hour, clockMinute: minute, open} = data;
      // this.jobAlarm = new BackJobAlarm({aqi_max: text, clockHour: hour, clockMinute: minute});
      this.setState({
        text, hour, minute, open
      })
    }, () => {
      // const {text: aqi_max, hour: clockHour, minute: clockMinute} = this.state;
      // this.jobAlarm = new BackJobAlarm({aqi_max, clockHour, clockMinute});
    });
  }

  componentDidUpdate() {
    const {text: aqi_max, hour: clockHour, minute: clockMinute} = this.state;
    this.jobAlarm = new BackJobAlarm({aqi_max, clockHour, clockMinute});
  }

  confirm = () => {
    const {hour, minute, text, open} = this.state;
    this.jobAlarm.register();
    if (text) {
      const scheduleTime = moment().hour(parseInt(hour, 10)).minute(parseInt(minute, 10)).second(0);
      const now = moment(new Date());

      let diff = scheduleTime.diff(now);
      diff = diff < 0 ? PEROID + diff : diff;

      this.jobAlarm.setPeriod(diff);
      this.jobAlarm.schedule();

      setData('clockData', {clockHour: hour, clockMinute: minute, aqi_max: text, open});

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

  switchChange = (open) => {
    this.setState({open}, () => {
      updateData('clockData', {open});
      if (open === false) {
        this.jobAlarm.closeSchedule();
      } else {
        this.confirm();
      }
    });
  }

  render() {
    const {text, hour, minute, modalVisible, open} = this.state;

    const pickerView = () => {
      return (
        <View style={styles.pickView}>
          <Picker
            style={styles.picker}
            prompt="请选择闹钟响起时间"
            selectedValue={hour}
            onValueChange={this.pickHour}>
            {this.renderNumber(24)}
          </Picker>
          <Picker
            style={styles.picker}
            prompt="请选择闹钟响起时间"
            selectedValue={minute}
            onValueChange={this.pickMinute}>
            {this.renderNumber(60)}
          </Picker>
        </View>
      )
    };
    return (
      <View style={[commonStyles.container, styles.container]}>
        <Modal
          animationType="fade"
          transparent
          visible={modalVisible}
          onRequestClose={this.requestClose}
        >
          <View style={[commonStyles.container, {backgroundColor: colors.maskBackground}]}>
            <View style={styles.modalInner}>
              <Text style={[commonStyles.textCenter, commonStyles.font20, {marginTop: 20}]}>设置成功</Text>
              <Text style={[commonStyles.textCenter, commonStyles.font14, {padding: 20}]}>
                {open ? `闹钟每天将在PM2.5小于${text}时，于${hour}:${minute}响起` : '目前闹钟处于关闭状态，打开才会生效哦！'}
              </Text>
              <TouchableHighlight onPress={this.closeModal} style={styles.modalBtn}>
                <Text style={[commonStyles.textCenter, commonStyles.font16]}>知道了</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>
        <View style={[styles.item, styles.itemFirst, styles.itemLast]}>
          <Text style={[commonStyles.textCenter, commonStyles.font16]}>打开闹钟(已{open ? '打开' : '关闭'})</Text>
          <Switch onValueChange={this.switchChange} value={open}></Switch>
        </View>
        <View style={[styles.item, styles.itemFirst]}>
          <Text style={[commonStyles.textCenter, commonStyles.font16]}>AQI最大值({text})</Text>
          <Slider
            style={{width: 150}}
            maximumValue={150}
            minimumValue={0}
            step={1}
            value={Number(text)}
            onSlidingComplete={this.textChange}/>
        </View>
        {Platform.OS === 'ios' ? (
          <View style={{width: '100%'}}>
            <Text style={[styles.iosAlertText, commonStyles.font16]}>闹钟提醒时间(请选择)</Text>
            {pickerView()}
          </View>
        ) : (
          <View style={[styles.item]}>
            <Text style={[commonStyles.textCenter, commonStyles.font16]}>闹钟提醒时间</Text>
            {pickerView()}
          </View>
        )}
        <View style={styles.btnPos}>
          <Button text="确定" onPress={this.confirm} btnTouchStyle={styles.setBtnTouch} textStyle={commonStyles.textCenter}/>
        </View>
      </View>
    );
  }
}

Home.navigationOptions = {
  title: 'AQI闹钟设置',
}
