import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import weatherAction from '../action/weather';
import {Button} from '../components/';

const image = require('./home.jpg');

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  bgColorTrans: {
    width: '100%',
    marginTop: 40,
    paddingRight: 20,
    backgroundColor: 'transparent',
  },
  colorWhite: {
    color: '#FFF',
    textAlign: 'right',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  city: {
    fontSize: 18,
  },
  f12: {
    fontSize: 12,
  },
  time: {
    marginTop: 4,
  },
  weather: {
    fontSize: 30,
    marginTop: 10,
    fontWeight: 'bold',
  },
  setBtnTouch: {
    backgroundColor: 'rgba(255, 255, 255, .2)',
  },
  setBtnText: {
    textAlign: 'center'
  },
  btnPos: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  }
});
class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationError: ''
    };
  }

  componentDidMount() {
    const { WeatherAction} = this.props;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (position && position.coords) {
          const {longitude, latitude} = position && position.coords;
          WeatherAction.getAqi(latitude, longitude);
        }
      },
      (error) => {
        console.log(error.message);
        this.setState({
          locationError: error.message || '获取定位失败'
        })
      },
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
  }

  navSettting = () => {
    const { navigate } = this.props.navigation;
    navigate('setting')
  }

  render() {
    let {weather} = this.props;
    weather = weather && weather.get('data') && weather.get('data').toJS();
    console.log(weather);
    return (
      <View style={styles.container}>
        <Image source={image} style={styles.image}>
        </Image>
        <View style={[styles.bgColorTrans]}>
          {weather ? (
            <View>
              <Text style={[styles.city, styles.colorWhite]}>{weather.city && weather.city.name}</Text>
              <Text style={[styles.colorWhite, styles.time, styles.f12]}>更新于 {weather.time.s}</Text>
              <Text style={[styles.weather, styles.colorWhite]}>{weather.aqi}</Text>
            </View>
          ) : <Text style={[styles.colorWhite, styles.time, styles.f12]}>{this.state.locationError || '正在定位更新中...'}</Text>}
        </View>
        {weather ? (
          <View style={[styles.bgColorTrans]}>
            <Text style={[styles.city, styles.colorWhite]} key="1">PM2.5: {weather.iaqi && weather.iaqi.pm25.v}</Text>
            {weather.iaqi && weather.iaqi.pm10 ? <Text style={[styles.city, styles.colorWhite]} key="2">PM10: {weather.iaqi.pm10.v}</Text> : null}
          </View>
        ) : null}
        <View style={styles.btnPos}>
          <Button text="设置" onPress={this.navSettting} btnTouchStyle={styles.setBtnTouch} textStyle={styles.setBtnText}/>
        </View>
      </View>
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
  navigation: PropTypes.object
}

Weather.navigationOptions = {
  title: 'PM2.5 CLOCK',
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
