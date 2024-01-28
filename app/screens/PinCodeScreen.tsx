import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
// Custom components
import { DialPad, PinInputCurvy } from '../components';

const PinCodeScreen = () => {
  const pinCodeRef = useRef<any>(null);
  const pinCodeLength = 4;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <PinInputCurvy pinLength={pinCodeLength} ref={pinCodeRef} />
      <DialPad
        dialPadContainerStyles={styles.dialPadContainer}
        onPress={key => {
          if (key === 'del') {
            pinCodeRef.current.deleteValue();
          } else if (typeof key === 'number') {
            pinCodeRef.current.addValue(key);
          }
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  dialPadContainer: {
    flex: 1,
    backgroundColor: 'red',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
});

export default PinCodeScreen;
