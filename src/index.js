import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Provider, connect} from 'react-redux';
import getRootReducer from './config/store';
import {routes, config} from './config/routes';
import { StackNavigator, addNavigationHelpers } from 'react-navigation';

const AppNavigator = StackNavigator(routes, config);

const navReducer = (state, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state);
  return newState || state;
};

const store = getRootReducer(navReducer);
class App extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    nav: PropTypes.object,
  }
  render() {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }
}
const AppWithNavigationState = connect(state => ({
  nav: state.nav
}))(App);

const app = () => (
  <Provider store={store}>
    <AppWithNavigationState />
  </Provider>
);

export default app;
