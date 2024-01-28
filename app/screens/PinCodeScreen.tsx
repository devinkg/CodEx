import React, { useRef, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// Custom components
import { DialPad, PinInputCurvy } from '../components';

const PinCodeScreen = () => {
  const pinCodeRef = useRef<any>(null);
  const pinCodeLength = 4;

  return (
    <View style={styles.mainContainer}>
      <Text>{'PinCode Screen'}</Text>
      <PinInputCurvy pinLength={pinCodeLength} ref={pinCodeRef} />
      <DialPad
        onPress={key => {
          if (key === 'del') {
            pinCodeRef.current.deleteValue();
          } else if (typeof key === 'number') {
            pinCodeRef.current.addValue(key);
          }
        }}
      />
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

export default PinCodeScreen;
