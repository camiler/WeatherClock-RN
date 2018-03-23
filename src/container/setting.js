import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import {Modal, View, TextInput, Picker, Text, TouchableHighlight, ToastAndroid, Switch, AsyncStorage} from 'react-native';
import {Button} from '../components/';
import {commonStyles, colors} from '../config/styles'
import styles from './setting-style';
import BackJobAlarm from './scripts/backjob';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '80',
      hour: '07',
      minute: '10',
      modalVisible: false,
      open: true,
    };
    this.jobAlarm = null;
  }

  componentWillMount() {
    this.getStorageData((data, err) => {
      if (err) {
        const {text: aqi_max, hour: clockHour, minute: clockMinute} = this.state;
        this.jobAlarm = new BackJobAlarm({aqi_max, clockHour, clockMinute});
      } else {
        this.jobAlarm = new BackJobAlarm({...data});
        this.setState({
          ...data
        })
      }
    })
  }

  getStorageData = (callback) => {
    AsyncStorage.getItem('clockData', (err, result) => {
      if (err) {
        callback(null, err)
      }
      if (result && callback) {
        callback(JSON.parse(result), null);
      }
    })
  }

  navigate = () => {
    const { navigate } = this.props.navigation;
    navigate('Weather')
  }

  setStorageData = (data) => {
    const {hour: clockHour, minute: clockMinute, text: aqi_max} = data;
    AsyncStorage.setItem('clockData', JSON.stringify({aqi_max, clockHour, clockMinute}));
  }

  confirm = () => {
    const {hour, minute, text} = this.state;
    this.setStorageData({hour, minute, text});
    if (text) {
      const today = moment().hour(parseInt(hour, 10)).minute(parseInt(minute, 10)).second(0);
      const now = moment(new Date());

      let diff = 0;
      if (today.isAfter(now)) {
        diff = Math.abs(now.diff(today));
      } else {
        const tomorrow = today.add(1, 'day');
        diff = tomorrow.diff(now);
      }
      this.jobAlarm.setPeroid(diff - 60000);
      this.jobAlarm.schedule();

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

  switchChange = (value) => {
    this.setState({open: value});
    if (value === false) {
      this.jobAlarm.closeSchedule();
    } else {
      this.confirm();
    }
  }

  render() {
    const {text, hour, minute, modalVisible, open} = this.state;

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
        <View style={styles.switch}>
          <Text style={[commonStyles.textCenter, commonStyles.font16]}>打开闹钟(已{open ? '打开' : '关闭'})</Text>
          <Switch onValueChange={this.switchChange} value={open}></Switch>
        </View>
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
