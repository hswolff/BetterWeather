import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Color from '../services/color';

import Header from '../components/Header';
import ControlButton from './ControlButton';
import WeatherGraph from './WeatherGraph';

export default class WeatherPage extends Component {
  static propTypes = {
    changeAddress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }

  state = {
    showMax: true,
  };

  onChange = (newVal) => {
    const showMax = newVal === 'max';
    if (this.state.showMax !== showMax) {
      this.setState({ showMax });
    }
  };

  setMax = this.onChange.bind(null, 'max');
  setMin = this.onChange.bind(null, 'min');

  render() {
    const {
      name,
      changeAddress,
      data: graphData,
    } = this.props;

    const {
      showMax,
    } = this.state;

    const graphProps = {};
    graphProps.data = graphData.daily.data;
    graphProps.xAccessor = (d) => new Date(d.time * 1000);
    if (showMax) {
      graphProps.yAccessor = (d) => d.temperatureMax;
    } else {
      graphProps.yAccessor = (d) => d.temperatureMin;
    }

    return (
      <View style={styles.container}>
        <Header>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={changeAddress}
          >
            <Text style={styles.headerText}>
              {name}
            </Text>
          </TouchableOpacity>
        </Header>
        <View style={styles.content}>
          <ControlButton active={this.state.showMax} onPress={this.setMax}>
            Max
          </ControlButton>
          <WeatherGraph {...graphProps} />
          <ControlButton active={!this.state.showMax} onPress={this.setMin}>
            Min
          </ControlButton>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.White,
  },
  headerButton: {
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: Color.BlueDark,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});
