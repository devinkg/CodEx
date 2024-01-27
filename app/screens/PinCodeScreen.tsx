import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
// Custom components
import { DialPad, PinCodeFlatDot } from '../components';

const PinCodeScreen = () => {
  const [pincode, setPincode] = useState<number[]>([]);
  const pinCodeLength = 4;
  return (
    <View style={styles.mainContainer}>
      <Text>{'PinCode Screen'}</Text>
      <PinCodeFlatDot pinLength={4} pinCode={pincode} />
      <DialPad
        onPress={key => {
          if (key === 'del') {
            setPincode(prev => prev?.slice(0, prev?.length - 1));
          } else if (typeof key === 'number') {
            if (pincode?.length === pinCodeLength) return;
            setPincode(prev => [...prev, key]);
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
