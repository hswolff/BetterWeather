import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import config from './config';
import * as fixtures from './services/fixtures';
import forecastio from './services/forecastio';

import AddressPage from './address/AddressPage';

forecastio.initialize(config.forecastApiKey);

const USE_FIXTURES = true;

export default class BetterWeather extends Component {
  state = {
    address: USE_FIXTURES ? fixtures.address : null,
    forecastIoData: USE_FIXTURES ? fixtures.forecastIoData : null,
  };

  changeAddress = (address) => {
    if (USE_FIXTURES) {
      this.setState({ address, forecastIoData: fixtures.forecastIoData });
    } else {
      if (address == null) {
        this.setState({ address, forecastIoData: null });
      } else {
        forecastio(address.latitude, address.longitude)
          .then(forecastIoData => {
            this.setState({ address, forecastIoData });
          });
      }
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.forecastIoData == null ?
          <AddressPage
            onAddressSet={this.changeAddress}
          /> :
          <View style={{ paddingTop: 80 }}>
            <Text>Data fetched!</Text>
            <Text>{this.state.address.name}</Text>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
