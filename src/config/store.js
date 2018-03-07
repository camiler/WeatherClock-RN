import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import getRootReducer from '../reducer/index';

// noinspection JSAnnotator
const loggingMiddleware = (store : Object) => (next : Function) => (action : Object) => {
  console.log(`INFO: Dispatching a ${action.type} action with payload:`, action.payload);
  const result = next(action);
  console.log('Next State:', store.getState());
  return result;
};

const configureStore = (navReducer) => {
  const middleware = applyMiddleware(thunk, loggingMiddleware);

  return createStore(getRootReducer(navReducer), undefined, middleware);
};

export default configureStore;
