import Setting from '../container/setting';
import Weather from '../container/weather';
import {Animated, Easing} from 'react-native';

/**
 * 路由配置
 * @type {{Main: {screen: Home}, Weather: {screen: ProDetail}}}
 */
export const routes = {
  Main: {
    screen: Weather,
  },
  setting: {
    screen: Setting
  }
};
/**
 * 页面切换动画效果配置
 * @type {{mode: string, transitionConfig: (function(): {transitionSpec: {duration: number, easing: *, timing}, screenInterpolator: (function(*))})}}
 */
export const config = {
  mode: 'modal',
  transitionConfig: () => ({
    transitionSpec: {
      duration: 300,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing,
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const { index } = scene;

      const height = layout.initHeight;
      const translateY = position.interpolate({
        inputRange: [index - 1, index, index + 1],
        outputRange: [height, 0, 0],
      });

      const opacity = position.interpolate({
        inputRange: [index - 1, index - 0.99, index],
        outputRange: [0, 1, 1],
      });

      return { opacity, transform: [{ translateY }] };
    },
  }),
};

export default {
  routes,
  config
}
