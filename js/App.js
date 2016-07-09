import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import config from './config';
import forecastio from './services/forecastio';

import AddressPage from './address/AddressPage';

forecastio.initialize(config.forecastApiKey);

export default class BetterWeather extends Component {
  state = {
    address: null,
    forecastIoData: null,
  };

  changeAddress = (address) => {
    if (address == null) {
      this.setState({ address, forecastIoData: null });
    } else {
      forecastio(address.latitude, address.longitude)
        .then(forecastIoData => {
          this.setState({ address, forecastIoData });
        });
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
