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

const PEROID = 24 * 60 * 60 * 1000;

const aqiToke = 'a0921835e79a8010263dea8a071f14febbf595b9';

export {
  alarmNotifData,
  PEROID,
  aqiToke
}