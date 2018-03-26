import BackgroundJob from 'react-native-background-job';
import ReactNativeAN from 'react-native-alarm-notification';
import {get} from '../../util/fetchApi';
import {alarmNotifData, PEROID, aqiToke} from '../../config/appvar';
import {Promise} from 'es6-promise';

class BackJobAlarm {
  constructor(options) {
    this.aqi_max = options.aqi_max;
    this.clockHour = options.clockHour;
    this.clockMinute = options.clockMinute;
    this.backgroundSchedule = {
      jobKey: 'pm2.5clock',
      period: 60000,
      allowExecutionInForeground: true
    }
    this.initJob();
    this.register();
  }
  resetScheduleAndAlarm() {
    const backgroundSchedule = this.backgroundSchedule;
    if (backgroundSchedule.period !== PEROID) {
      backgroundSchedule.period = PEROID;
      BackgroundJob.schedule(backgroundSchedule);
    }

    ReactNativeAN.sendNotification(alarmNotifData);
  }
  setPeroid(peroid) {
    this.backgroundSchedule.period = peroid;
  }
  closeSchedule() {
    BackgroundJob.cancel({jobKey: 'pm2.5clock'});
  }
  schedule() {
    BackgroundJob.schedule(this.backgroundSchedule);
  }
  initJob() {
    this.backgroundJob = {
      jobKey: 'pm2.5clock',
      job: () => {
        this.getCurrentAqi().then(({iaqi, aqi}) => {
          if (iaqi && iaqi.v <= this.aqi_max || aqi <= this.aqi_max) {
            this.resetScheduleAndAlarm();
          }
        }, (err) => {
          console.log(err);
        })
      }
    };
  }
  register() {
    BackgroundJob.register(this.backgroundJob);
  }
  getCurrentAqi() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          if (position && position.coords) {
            const {longitude, latitude} = position && position.coords;
            const url = `https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${aqiToke}`;
            get(url).then(resData => {
              if (resData.status === 'ok') {
                const {iaqi, aqi} = resData.data;
                resolve({iaqi, aqi});
              }
            }).catch((err) => {
              reject(err)
            });
          }
        },
        (error) => {
          reject(error);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      );
    })
  }
}

export default BackJobAlarm;
