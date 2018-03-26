import {AsyncStorage} from 'react-native';
import {Promise} from 'es6-promise';

const setData = (key, data = {}) => {
  AsyncStorage.setItem(key, JSON.stringify(data));
}
const getData = (key) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(key, (err, result) => {
      console.log(err, result);
      if (err || !result) {
        return reject(err)
      }
      resolve(JSON.parse(result));
    })
  })
}
const updateData = (key, obj) => {
  getData(key).then((res) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        res[key] = obj[key];
      }
    }
    setData(key, res)
  }, (err) => {
    console.log(`update AsyncStorage data error: ${err}`);
  })
}

export {
  setData,
  getData,
  updateData
};
