import React, {
  Component,
  PropTypes,
} from 'react';
import {
  StyleSheet,
  TextInput,
} from 'react-native';
import _ from 'lodash';

import geocode from '../services/geocode';

export default class AddressLookup extends Component {
  static propTypes = {
    style: PropTypes.number,
    onError: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
    onRequest: PropTypes.func.isRequired,
  };

  static defaultProps = {
    onError: _.noop,
    onSuccess: _.noop,
    onRequest: _.noop,
  };

  state = {
    text: '',
  };

  lookupGeo = (e) => {
    this.props.onRequest();
    const text = e.nativeEvent.text;

    geocode(text).then(res => {
      if (res.results.length === 0) {
        this.props.onError(text);
      } else {
        const result = res.results[0];
        const address = {
          name: result.formatted_address,
          latitude: result.geometry.location.lat,
          longitude: result.geometry.location.lng,
        };

        this.props.onSuccess(address);
      }
    });
  }

  render() {
    return (
      <TextInput
        style={[styles.textInput, this.props.style]}
        onSubmitEditing={this.lookupGeo}
        onChangeText={(text) => this.setState({ text })}
        value={this.state.text}
        returnKeyType="go"
      />
    );
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
  },
});
