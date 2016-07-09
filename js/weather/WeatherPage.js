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

// eslint-disable-next-line react/prefer-stateless-function
export default class WeatherPage extends Component {
  static propTypes = {
    changeAddress: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    data: PropTypes.object.isRequired,
  }

  render() {
    const {
      name,
      changeAddress,
    } = this.props;

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
});
