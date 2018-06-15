import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  requireNativeComponent,
  ViewPropTypes,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const propsInterface = {
  name: 'WebView',
  propTypes: {
    src: PropTypes.string.isRequired,
    onLoaded: PropTypes.func,
    ...ViewPropTypes,
  }
};

const NativeWebView = requireNativeComponent('WebView', propsInterface, {
  nativeOnly: { onLoaded: true },
});

export default class WebView extends Component {
  static propTypes = {
    src: PropTypes.string.isRequired,
  };

  state = {
    loaded: false,
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.src === nextProps.src) return;

    this.setState({ loaded: false });
  }

  handleLoaded = () => {
    this.setState({ loaded: true });
  };

  renderLoader() {
    return (
      <View style={[styles.fullScreen, styles.overlay]}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  render() {
    const { loaded } = this.state;

    return (
      <View style={styles.fullScreen}>
        <NativeWebView
          style={styles.fullScreen}
          src={this.props.src}
          onLoaded={this.handleLoaded}
        />
        {!loaded ? this.renderLoader() : null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems:'center',
    justifyContent: 'center',
  }
});
