import React, {
  Component,
  PropTypes,
} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Header from '../components/Header';
import AddressInput from './AddressInput';

import Color from '../services/color';

export default class AddressPage extends Component {
  static propTypes = {
    onAddressSet: PropTypes.func.isRequired,
  };

  state = {
    requesting: false,
    error: null,
  };

  onSuccess = (...args) => {
    this.props.onAddressSet(...args);
  }

  showError = (text) => {
    this.setState({
      error: text,
      requesting: false,
    });
  }

  showActivity = () => {
    this.setState({
      error: null,
      requesting: true,
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Header>
          <Text style={styles.headerText}>
            Weather
          </Text>
        </Header>
        <View style={styles.content}>
          <Text style={styles.directions}>
            Enter Your Address
          </Text>
          <AddressInput
            onRequest={this.showActivity}
            onSuccess={this.onSuccess}
            onError={this.showError}
          />
          <ActivityIndicator
            animating={this.state.requesting}
            style={styles.activity}
            size="large"
          />

          {this.state.error != null ? (
            <Text>Could not find address for: {this.state.error}</Text>
          ) : null}
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
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  directions: {
    fontSize: 32,
    paddingTop: 40,
    paddingBottom: 40,
  },
  activity: {
    marginTop: 20,
  },
});
