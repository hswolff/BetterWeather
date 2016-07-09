import React, {
  PropTypes,
} from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Color from '../services/color';

export default function Header(props) {
  const {
    children,
  } = props;

  return (
    <View style={styles.container}>
      {children}
    </View>
  );
}
Header.propTypes = {
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.BlueLight,
    borderBottomWidth: 1,
    borderBottomColor: Color.BlueDark,
    paddingTop: 44,
    paddingBottom: 20,
  },
});
