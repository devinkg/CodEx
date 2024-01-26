import React from 'react';
import { Dimensions, View } from 'react-native';
const { width } = Dimensions.get('window');

type pinCodeFDProps = {
  pinLength: number;
  pinCode: (string | number)[];
};

export const PinCodeFlatDot = ({
  pinLength = 4,
  pinCode = [],
}: pinCodeFDProps) => {
  const pinContainerSize = width / 2;
  const pinFullSize = pinContainerSize / pinLength;
  const pinSpacing = 10;
  const pinSize = pinFullSize - pinSpacing * 2;

  return (
    <View
      style={{
        flexDirection: 'row',
        gap: pinSpacing * 2,
        height: pinSize * 2,
        marginBottom: pinSize,
        alignItems: 'flex-end',
      }}>
      {[...Array(pinLength).keys()]?.map(i => {
        const isSelected = !!pinCode[i];
        return (
          <View
            key={i}
            style={{
              width: pinSize,
              borderRadius: pinSize / 2,
              backgroundColor: 'black',
              height: isSelected ? pinSize : 2,
              marginBottom: isSelected ? pinSize / 2 : 0,
            }}></View>
        );
      })}
    </View>
  );
};

export default PinCodeFlatDot;
