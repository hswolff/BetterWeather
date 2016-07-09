import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ART,
  Dimensions,
  StyleSheet,
  View,
} from 'react-native';

const {
  Group,
  Shape,
  Surface,
} = ART;

import * as graphUtils from './graph-utils';

import Color from '../services/color';

const PaddingSize = 20;

const dimensionWindow = Dimensions.get('window');

export default class WeatherGraph extends Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    xAccessor: PropTypes.func.isRequired,
    yAccessor: PropTypes.func.isRequired,
  }

  static defaultProps = {
    width: Math.round(dimensionWindow.width * 0.9),
    height: Math.round(dimensionWindow.height * 0.5),
  };

  state = {
    graphWidth: 0,
    graphHeight: 0,
    linePath: '',
  };

  componentWillMount() {
    this.computeNextState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.computeNextState(nextProps);
  }

  computeNextState(nextProps) {
    const {
      data,
      width,
      height,
      xAccessor,
      yAccessor,
    } = nextProps;

    const graphWidth = width - PaddingSize * 2;
    const graphHeight = height - PaddingSize * 2;

    const lineGraph = graphUtils.createLineGraph({
      data,
      xAccessor,
      yAccessor,
      width: graphWidth,
      height: graphHeight,
    });

    this.setState({
      graphWidth,
      graphHeight,
      linePath: lineGraph.path,
    });
  }

  render() {
    const {
      graphWidth,
      graphHeight,
      linePath,
    } = this.state;

    return (
      <View style={styles.container}>
        <Surface width={graphWidth} height={graphHeight}>
          <Group x={0} y={0}>
            <Shape
              d={linePath}
              stroke={Color.Orange}
              strokeWidth={1}
            />
          </Group>
        </Surface>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});
