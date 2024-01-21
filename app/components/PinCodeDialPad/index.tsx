import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { width } = Dimensions.get('window');

// pin
const pinLength = 4;
const pinContainerSize = width / 2;
const pinFullSize = pinContainerSize / pinLength;
const pinSpacing = 10;
const pinSize = pinFullSize - pinSpacing * 2;

const dialPadSize = width * 0.2;
const dialPadSizeFontSize = dialPadSize * 0.4;
const _gap = 14;

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];

const DialPad = ({
  onPress,
}: {
  onPress: (value: (typeof dialPad)[number]) => void;
}) => {
  return (
    <FlatList
      data={dialPad}
      keyExtractor={(_, index) => index?.toString()}
      numColumns={3}
      style={{ flexGrow: 0 }}
      columnWrapperStyle={{ gap: _gap * 2 }}
      contentContainerStyle={{ gap: _gap }}
      scrollEnabled={false}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
            disabled={item === ''} // to remove pressablity of '' in the dialPad array even though it 's not visible
            onPress={() => {
              onPress(item);
            }}>
            <View
              style={{
                width: dialPadSize,
                height: dialPadSize,
                borderRadius: dialPadSize / 2,
                borderWidth: typeof item === 'number' ? 1 : 0,
                borderColor: 'black',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {item === 'del' ? (
                <Text style={{ fontSize: dialPadSizeFontSize }}>{item}</Text>
              ) : (
                // TODO need to change this to the icon using icon lib
                <Text style={{ fontSize: dialPadSizeFontSize }}>{item}</Text>
              )}
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export const PinCodeDialPad = () => {
  const [code, setCode] = useState<number[]>([]);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
          gap: pinSpacing * 2,
          height: pinSize * 2,
          marginBottom: pinSize,
          alignItems: 'flex-end',
        }}>
        {[...Array(pinLength).keys()]?.map(i => {
          const isSelected = !!code[i];
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
      <DialPad
        onPress={item => {
          if (item === 'del') {
            setCode(prev => prev?.slice(0, prev?.length - 1));
          } else if (typeof item === 'number') {
            if (code?.length === pinLength) return;
            setCode(prev => [...prev, item]);
          }
        }}
      />
    </View>
  );
};

// NOTE - This can be improved by using RNvector icons , Reanimated, Or Moti
