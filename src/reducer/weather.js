import {Map} from 'immutable';

const initialState = Map();

const weather = (state = initialState, action) => {
  switch (action.type) {
    case 'weather_aqi':
      return state.set('aqi', action.aqi);
    default:
      return state;
  }
}

export default weather;
