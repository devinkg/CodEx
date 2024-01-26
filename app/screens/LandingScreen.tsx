import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// Custom components
import { DialPad } from '../components';

const LandingScreen = () => {
  return (
    <View style={styles.mainContainer}>
      <DialPad />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LandingScreen;
