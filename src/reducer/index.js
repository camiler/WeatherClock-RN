import {combineReducers} from 'redux';
import weatherReducer from './weather';

const getRootReducer = (navReducer) => {
  return combineReducers({
    nav: navReducer,
    weather: weatherReducer,
  });
};

export default getRootReducer;
