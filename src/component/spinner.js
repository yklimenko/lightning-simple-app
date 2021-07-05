import React, { Component } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
  ViewPropTypes,
} from 'react-native';
import PropTypes from 'prop-types';
import { color, font } from './style';
import LightningBoltIcon from '../asset/icon/lightning-bolt';
import Text from './text';
import Svg, { Path, Circle, Defs, Stop, LinearGradient } from './svg';
import { generateArc } from '../helper';

//
// Small Spinner
//

const smallStyles = StyleSheet.create({
  spinner: {
    transform: [{ scale: 1.0 }],
  },
});

export const SmallSpinner = ({ ...props }) => (
  <ActivityIndicator
    size="small"
    color={color.lightPurple}
    style={smallStyles.spinner}
    {...props}
  />
);

//
// Load Network Spinner
//

const loadNetworkStyles = StyleSheet.create({
  copy: {
    fontSize: font.sizeXS,
    marginTop: 5,
    color: color.white,
    textAlign: 'center',
  },
});

export const LoadNetworkSpinner = ({ continuous, percentage, msg, style }) => (
  <View style={style}>
    <ResizeableSpinner
      continuous={continuous}
      percentage={percentage}
      size={80}
      progressWidth={3}
      gradient="loadNetworkGrad"
    >
      <LightningBoltIcon height={28} width={14.2222} />
    </ResizeableSpinner>
    <Text style={loadNetworkStyles.copy}>{msg}</Text>
  </View>
);

LoadNetworkSpinner.propTypes = {
  continuous: PropTypes.bool,
  percentage: PropTypes.number.isRequired,
  msg: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

//
// ContinuousLoadNetworkSpinner
//

export class ContinuousLoadNetworkSpinner extends Component {
  constructor(props) {
    super(props);
    this.increasePercentage = this.increasePercentage.bind(this);
    this.state = {
      percentage: 0,
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.increasePercentage, 10);
  }

  render() {
    const { msg, style } = this.props;
    const { percentage } = this.state;
    return (
      <LoadNetworkSpinner
        msg={msg}
        percentage={percentage}
        style={style}
        continuous={true}
      />
    );
  }

  increasePercentage() {
    const { percentage } = this.state;
    this.setState({
      percentage: (percentage + 0.01) % 1,
    });
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }
}

ContinuousLoadNetworkSpinner.propTypes = {
  msg: PropTypes.string.isRequired,
  style: ViewPropTypes.style,
};

//
// Resizeable Spinner
//

const resizeableStyles = StyleSheet.create({
  iconWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const ResizeableSpinner = ({
  continuous,
  percentage,
  size,
  gradient,
  progressWidth,
  children,
}) => (
  <View style={{ width: size, height: size }}>
    <Svg width={size} height={size}>
      <Gradients />
      <SpinnerProgress
        continuous={continuous}
        width={size}
        percentage={percentage}
        color={`url(#${gradient})`}
      />
      <SpinnerFill
        spinnerWidth={size}
        progressWidth={progressWidth}
        color={color.blackDark}
      />
    </Svg>
    <View style={resizeableStyles.iconWrapper}>{children}</View>
  </View>
);

ResizeableSpinner.propTypes = {
  continuous: PropTypes.bool,
  percentage: PropTypes.number.isRequired,
  size: PropTypes.number.isRequired,
  progressWidth: PropTypes.number.isRequired,
  gradient: PropTypes.string.isRequired,
  children: PropTypes.node,
};

//
// Loading Network Gradient
//

const Gradients = () => (
  <Defs>
    <LinearGradient id="loadNetworkGrad" x1="0" y1="0" x2="1" y2="1">
      <Stop offset="0%" stopColor={color.loadNetworkLightPurple} />
      <Stop offset="50%" stopColor={color.loadNetworkMedPurple} />
      <Stop offset="70%" stopColor={color.loadNetworkMedDarkPurple} />
      <Stop offset="100%" stopColor={color.purple} />
    </LinearGradient>
    <LinearGradient id="openChannelsGrad" x1="0" y1="0" x2="1" y2="1">
      <Stop offset="0%" stopColor={color.lightPurple} />
      <Stop offset="50%" stopColor={color.openChansDarkPurple} />
    </LinearGradient>
  </Defs>
);

//
// Spinner Progress Path
//

const SpinnerProgress = ({ continuous, width, percentage, color }) => (
  <Path
    d={generateArc(
      width / 2,
      width / 2,
      width / 2,
      continuous ? percentage * 360 : 0,
      continuous ? (percentage + 0.4) * 360 : percentage * 360
    )}
    fill={color}
  />
);

SpinnerProgress.propTypes = {
  continuous: PropTypes.bool,
  width: PropTypes.number.isRequired,
  percentage: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};

//
// Spinner Fill
//

const SpinnerFill = ({ spinnerWidth, progressWidth, color }) => (
  <Circle
    cx={spinnerWidth / 2}
    cy={spinnerWidth / 2}
    r={spinnerWidth / 2 - progressWidth}
    fill={color}
  />
);

SpinnerFill.propTypes = {
  spinnerWidth: PropTypes.number.isRequired,
  progressWidth: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
