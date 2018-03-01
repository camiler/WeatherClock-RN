import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import weatherAction from '../action/weather';

const image = require('./home.jpg');

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    justifyContent: 'center',
    //alignItems: 'center',
  },
  bgColorTrans: {
    backgroundColor: 'transparent',
  },
  colorWhite: {
    color: '#FFF',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  city: {
    fontSize: 20,
    marginTop: '50%',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weather: {
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  }
});
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aqi: null,
      initialPosition: ''
    };
  }

  componentDidMount() {
    const { WeatherAction} = this.props;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        if (position && position.coords) {
          this.setState({
            initialPosition: JSON.stringify(position)
          })
          const {longitude, latitude} = position && position.coords;
          console.log(longitude);
          WeatherAction.getAqi(latitude, longitude);
        }
      },
      (error) => console.log(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  render() {
    let {weather} = this.props;
    weather = weather && weather.toJS();
    return (
      <ImageBackground source={image} style={styles.image}>
        <View style={[styles.bgColorTrans]}>
          <Text style={[styles.city, styles.colorWhite]}>北京</Text>
          <Text style={[styles.weather, styles.colorWhite]}>PM2.5: {weather && weather.aqi}</Text>
        </View>

      </ImageBackground>

    );
  }
}

function mapStateToProps(state) {
  return {
    weather: state && state.weather
  };
}

function mapDispatchToProps(dispatch) {
  return {
    WeatherAction: bindActionCreators(weatherAction, dispatch),
  }
}

Weather.propTypes = {
  WeatherAction: PropTypes.object,
  weather: PropTypes.object,
}

Weather.navigationOptions = {
  title: '天气',
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
