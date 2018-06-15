import { NativeModules } from 'react-native';

const { Toast } = NativeModules;

export default {
  /**
   * @param {string} msg
   * @param {Object} [options]
   * @param {'short'|'long'} [options.duration]
   * @param {'top'|'center'|'bottom'} [options.position]
   * @returns {undefined}
   */
  show: (msg, { duration = 'short', position = 'bottom' } = {}) => {
    Toast.show(msg, { duration, position });
  },
};
