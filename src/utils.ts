import { Platform, StatusBar, ViewStyle } from 'react-native';
import { hasNotch } from 'react-native-device-info';

let isExpo = false;
try {
  // eslint-disable-next-line no-undef, @typescript-eslint/no-var-requires
  const Constants = require('expo-constants').default;
  // True if the app is running in an `expo build` app or if it's running in Expo Go.
  isExpo =
    Constants.executionEnvironment === 'standalone' ||
    Constants.executionEnvironment === 'storeClient';
  // eslint-disable-next-line no-empty
} catch {}

const SAFEBOUNCE_HEIGHT_IOS = 300;
const SAFEBOUNCE_HEIGHT_ANDROID = 100;
const SAFEBOUNCE_HEIGHT_WEB = 0;

let safeBounceHeight = Platform.select({
  ios: SAFEBOUNCE_HEIGHT_IOS,
  android: SAFEBOUNCE_HEIGHT_ANDROID,
  web: SAFEBOUNCE_HEIGHT_WEB,
});

const setSafeBounceHeight = (height: number) => {
  safeBounceHeight = height;
};

const getSafeBounceHeight = () => safeBounceHeight;

const getDefaultHeaderHeight = (isLandscape: boolean) => {
  if (Platform.OS === 'ios') {
    if (isLandscape && !Platform.isPad) {
      return 32;
    } else {
      return 44;
    }
  } else if (Platform.OS === 'android') {
    return 56;
  }
  return 64;
};

let disabledExpoTranslucentStatusBar = false;

const disableExpoTranslucentStatusBar = () => {
  disabledExpoTranslucentStatusBar = true;
};

const getStatusBarHeight = (isLandscape: boolean) => {
  if (Platform.OS === 'ios') {
    if (isLandscape) return 0;
    return hasNotch() ? 44 : 20;
  } else if (Platform.OS === 'android') {
    // eslint-disable-next-line no-undef
    return (global.Expo || isExpo) && !disabledExpoTranslucentStatusBar
      ? StatusBar.currentHeight
      : 0;
  } else return 0;
};

const getNavigationHeight = (isLandscape: boolean, headerHeight: number) => {
  return headerHeight + getStatusBarHeight(isLandscape);
};

const getElevationStyle = (elevation: number): ViewStyle => {
  if (Platform.OS === 'ios') {
    if (elevation === 0) return null;
    else
      return {
        shadowOpacity: 0.0015 * elevation + 0.18,
        shadowRadius: 0.54 * elevation,
        shadowOffset: {
          height: 0.6 * elevation,
          width: 0.6 * elevation,
        },
      };
  } else {
    return {
      elevation: elevation,
    };
  }
};

export {
  setSafeBounceHeight,
  getSafeBounceHeight,
  getDefaultHeaderHeight,
  getNavigationHeight,
  getStatusBarHeight,
  disableExpoTranslucentStatusBar,
  getElevationStyle,
};
