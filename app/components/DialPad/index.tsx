import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
const { width } = Dimensions.get('window');

const dialPadSize = width * 0.2;
const dialPadSizeFontSize = dialPadSize * 0.4;
const _gap = 14;

const dialPad = [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0, 'del'];

export const DialPad = ({
  onPress,
  dialPadContainerStyles,
}: {
  onPress?: (value: (typeof dialPad)[number]) => void;
  dialPadContainerStyles?: ViewStyle;
}) => {
  return (
    <View style={dialPadContainerStyles}>
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
                onPress && onPress(item);
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
    </View>
  );
};

// NOTE - This can be improved by using RNvector icons , Reanimated, Or Moti
