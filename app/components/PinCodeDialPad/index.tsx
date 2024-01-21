import React from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { width } = Dimensions.get('window');

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
      columnWrapperStyle={{ gap: _gap }}
      contentContainerStyle={{ gap: _gap }}
      scrollEnabled={false}
      renderItem={({ item }) => {
        return (
          <TouchableOpacity
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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <DialPad onPress={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({});
