import React, { Component, forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Easing,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';

class PinBox extends Component {
  constructor(props) {
    super(props);
    this.checkboxAnim = new Animated.Value(0);
    this.overlayAnim = new Animated.Value(0);
    const { size, active, hasValue } = this.props;
    this.activate = this.activate.bind(this);
    const sizeO =
      typeof size === 'string' ? parseInt(size.replace('%', ''), 10) : size;
    const heightOverSet = sizeO;

    this.state = {
      active: !!active,
      hasValue: !!hasValue,
      MaxHeight: sizeO + heightOverSet,
      MaxWidth: sizeO,
      value: '',
    };

    this.boxStyles = {
      height: this.checkboxAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [sizeO, sizeO + heightOverSet],
      }),
      width: sizeO,
    };
    this.boxOverlayStyles = {
      height: this.overlayAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      }),
      width: this.overlayAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      }),
    };
  }

  componentDidMount() {
    const { active } = this.state;
    if (active) {
      Animated.timing(this.checkboxAnim, {
        toValue: 1,
        duration: 50,
        easing: Easing.cubic,
        useNativeDriver: false
      }).start();
    }
  }

  setValue(value = 0) {
    this.setState({ value });
    Animated.timing(this.checkboxAnim, {
      toValue: 0,
      duration: 25,
      easing: Easing.cubic,
      useNativeDriver: false
    }).start();
  }

  setValueWO(value) {
    this.setState({ value });
  }

  activate() {
    this.setState({ active: true });
    Animated.timing(this.checkboxAnim, {
      toValue: 1,
      duration: 50,
      easing: Easing.cubic,
      useNativeDriver: false
    }).start();
  }

  deactivate(callBack = undefined) {
    this.setState({ active: false });
    Animated.timing(this.checkboxAnim, {
      toValue: 0,
      duration: 50,
      easing: Easing.cubic,
      useNativeDriver: false
    }).start(callBack);
  }

  deactivateWO(callBack = undefined) {
    this.setState({ active: false });
    Animated.timing(this.checkboxAnim, {
      toValue: 0,
      duration: 5,
      easing: Easing.cubic,
      useNativeDriver: false
    }).start(callBack);
  }

  removeValue(callBack = undefined) {
    this.setState({ hasValue: false });
    setTimeout(() => {
      Animated.timing(this.overlayAnim, {
        toValue: 0,
        duration: 50,
        easing: Easing.cubic,
        useNativeDriver: false
      }).start();
    }, 250);
    typeof callBack === 'function' && callBack();
  }

  fixValue(callBack = undefined) {
    this.setState({ hasValue: true });
    setTimeout(() => {
      Animated.timing(this.overlayAnim, {
        toValue: 1,
        duration: 50,
        easing: Easing.cubic,
        useNativeDriver: false
      }).start();
    }, 250);
    typeof callBack === 'function' && callBack();
  }

  render() {
    const { value, hasValue, MaxHeight, MaxWidth } = this.state;
    return (
      <>
        <View
          style={[
            PinInputStyles.PinBoxContainer,
            { height: MaxHeight, width: MaxWidth },
          ]}>
          <Animated.View
            style={[
              this.boxStyles,
              PinInputStyles.PinBox,
              PinInputStyles.inputShadow,
            ]}
          >
            {hasValue && (
              <Animated.View
                style={[this.boxOverlayStyles, PinInputStyles.PinBoxOverlay]}>
                <View
                  style={[
                    PinInputStyles.overlayDot,
                    PinInputStyles.inputShadow,
                  ]}
                />
              </Animated.View>
            )}
            <Text style={[{ fontWeight: 'bold', fontSize: 17 }]}>
              {value}
            </Text>
          </Animated.View>
        </View>
      </>
    );
  }
}

export const PinInputCurvy = forwardRef((PinInputCurvyProps, forwardingRef) => {
  const { pinLength, size, onTap, onPinInputComplete, pinLengthZero } = PinInputCurvyProps;
  const ShakeboxAnim = new Animated.Value(1);

  let box = [];
  let BoxRefs = [];
  const [pinInputStates, setPinInputStates] = useState({
    input: [],
    index: 0
  });

  const boxShake = {
    transform: [
      {
        translateX: ShakeboxAnim.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [-15, 0, 15],
        }),
      },
    ],
  };

  for (let j = 0; j < pinLength; j += 1) {
    const eleRef = React.createRef();
    box.push(<PinBox key={j} size={size || 60} ref={eleRef} />);
    BoxRefs.push(eleRef);
  }

  useEffect(() => {
    const { index } = pinInputStates;
    BoxRefs[index]?.current?.activate();
  }, [pinInputStates?.index]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(this.ShakeboxAnim, { toValue: 0, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 2, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 0, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 2, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 0, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 1, duration: 50, useNativeDriver: false }),
    ]).start();
  };

  const pinInputTap = () => {
    onTap && onTap();
  };

  const addValue = (value) => {
    const { index, input } = pinInputStates;
    if (index + 1 < BoxRefs.length) {
      BoxRefs[index]?.current?.setValue(value);
      BoxRefs[index]?.current?.fixValue(
        BoxRefs[index + 1]?.current?.activate,
      );
      input.push(value);
      setPinInputStates({ index: index + 1, input });
    } else if (index + 1 === BoxRefs.length) {
      BoxRefs[index]?.current?.setValue(value);
      BoxRefs[index]?.current?.fixValue();
      input.push(value);
      setPinInputStates({ index: index + 1, input });
    }

    index + 1 >= BoxRefs.length &&
      typeof onPinInputComplete === 'function' &&
      onPinInputComplete(input);
  }

  const deleteValue = () => {
    const { index, input } = pinInputStates;

    if (index !== 0) {
      let cIndex = index;
      index < BoxRefs.length || (cIndex = index - 1);
      BoxRefs[cIndex]?.current?.deactivate(() => {
        BoxRefs[index - 1]?.current?.setValueWO('');
        BoxRefs[index - 1]?.current?.removeValue(
          BoxRefs[index - 1]?.current?.activate,
        );
      });
      input.pop();
      setPinInputStates({ index: index - 1, input });
    }
  }

  const clearValues = () => {
    const { index } = pinInputStates;
    BoxRefs.forEach((val, Vindex) => {
      if (Vindex < BoxRefs.length - 1) {
        val?.current?.deactivate(() => {
          BoxRefs[index - 1 - Vindex]?.current?.setValueWO('');
          BoxRefs[index - 1 - Vindex]?.current?.removeValue();
        });
      } else {
        BoxRefs[index - 1 - Vindex]?.current?.setValueWO('');
        BoxRefs[index - 1 - Vindex]?.current?.removeValue();
        BoxRefs[index - 1 - Vindex]?.current?.activate();
      }
    });
    setPinInputStates({ index: 0, input: [] });
  }

  useImperativeHandle(forwardingRef, () => {
    return { shake, addValue, deleteValue, clearValues }
  })

  return (
    <>
      <TouchableWithoutFeedback onPress={pinInputTap}>
        <Animated.View
          style={[PinInputStyles.PinsBoxContainer, boxShake]} >
          {box}
        </Animated.View>
      </TouchableWithoutFeedback>
    </>
  );
});

const PinInputStyles = StyleSheet.create({
  PinBoxContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    paddingTop: 20
  },
  PinsBoxContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
  },
  PinBox: {
    borderColor: 'grey',
    borderRadius: 500,
    borderWidth: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PinBoxOverlay: {
    position: 'absolute',
    backgroundColor: 'green',
    zIndex: 1,
    borderRadius: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlayDot: {
    width: '15%',
    backgroundColor: 'white',
    height: '15%',
    borderRadius: 500,
  },
  inputShadow: {
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
});
