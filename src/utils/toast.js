import { NativeModules } from 'react-native';

const { Toast } = NativeModules;

export default {
  /**
   * @param {string} msg
   * @param {number} duration
   * @returns {undefined}
   */
  show: (msg, duration = Toast.SHORT) => Toast.show(msg, duration),
  SHORT: Toast.SHORT,
  LONG: Toast.LONG,
};
