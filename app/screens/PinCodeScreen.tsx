import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView, View, Text, Pressable } from 'react-native';
// Custom components
import { DialPad, PinInputCurvy } from '../components';

const PinCodeScreen = () => {
  const pinCodeRef = useRef<any>(null);
  const pinCodeLength = 4;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <PinInputCurvy
        pinLength={pinCodeLength}
        ref={pinCodeRef}
        onPinInputComplete={(inputValue: string | number) => {
          console.log(inputValue);
        }}
      />

      <View
        style={{
          borderWidth: 2,
          borderRadius: 10,
          paddingHorizontal: 10,
          paddingVertical: 12,
          margin: 20,
        }}>
        <Text style={{ color: 'darkgreen', fontSize: 20, marginBottom: 10 }}>
          Test buttons
        </Text>
        <Pressable
          onPress={() => {
            pinCodeRef.current.shake();
          }}>
          <Text style={{ color: 'darkblue', fontSize: 20, marginBottom: 10 }}>
            shake
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            pinCodeRef.current.clearValues();
          }}>
          <Text style={{ color: 'darkblue', fontSize: 20, marginBottom: 10 }}>
            clear
          </Text>
        </Pressable>
      </View>
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
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
});

export default PinCodeScreen;
