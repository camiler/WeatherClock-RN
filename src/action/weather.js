import {get} from '../util/fetchApi';

const getAqi = (lat, lng) => {
  return (dispatch) => {
    const url = `https://api.waqi.info/feed/geo:${lat};${lng}/?token=a0921835e79a8010263dea8a071f14febbf595b9`;
    return get(url).then(resData => {
      if (resData.status === 'ok') {
        dispatch({
          type: 'weather_aqi',
          aqi: resData.data.aqi
        })
      }
    }).catch((err) => {
      dispatch({type: 'error', data: err})
    });
  }
}

export default {
  getAqi,
}
