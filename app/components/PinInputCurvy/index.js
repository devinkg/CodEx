import React, { Component, createRef, forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Easing,
  Animated,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import { PinCellCurvy } from './PinCellCurvy';

export const PinInputCurvy = forwardRef((PinInputCurvyProps, forwardingRef) => {
  const { pinLength, size, onTap, onPinInputComplete, pinLengthZero } = PinInputCurvyProps;
  const ShakeboxAnim = new Animated.Value(1);

  const BoxRefs = [];

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

  useEffect(() => {
    const { index } = pinInputStates;
    BoxRefs[index]?.current?.activate();
  }, [pinInputStates?.index]);

  const shake = () => {
    Animated.sequence([
      Animated.timing(ShakeboxAnim, { toValue: 0, duration: 50, useNativeDriver: false }),
      Animated.timing(ShakeboxAnim, { toValue: 2, duration: 50, useNativeDriver: false }),
      Animated.timing(ShakeboxAnim, { toValue: 0, duration: 50, useNativeDriver: false }),
      Animated.timing(ShakeboxAnim, { toValue: 2, duration: 50, useNativeDriver: false }),
      Animated.timing(ShakeboxAnim, { toValue: 0, duration: 50, useNativeDriver: false }),
      Animated.timing(ShakeboxAnim, { toValue: 1, duration: 50, useNativeDriver: false }),
    ]).start();
  };

  const pinInputTap = () => {
    onTap && onTap();
  };

  const addValue = (value) => {
    const { index, input } = pinInputStates;
    if (index + 1 < BoxRefs.length) {
      const currentBox = BoxRefs[index]?.current;
      const nextBox = BoxRefs[index + 1]?.current;

      currentBox?.setValue(value);
      currentBox?.fixValue(nextBox?.activate);

      input.push(value);
      setPinInputStates({ index: index + 1, input });
    } else if (index + 1 === BoxRefs.length) {
      const currentBox = BoxRefs[index]?.current;

      currentBox?.setValue(value);
      currentBox?.fixValue();

      input.push(value);
      setPinInputStates({ index: index + 1, input });
    }

    if (index + 1 >= BoxRefs.length && typeof onPinInputComplete === 'function') {
      onPinInputComplete(input);
    }

  }

  const deleteValue = () => {
    const { index, input } = pinInputStates;

    if (index !== 0) {
      let cIndex = index < BoxRefs.length ? index : index - 1;

      const currentBoxRef = BoxRefs[cIndex]?.current;
      const previousBoxRef = BoxRefs[index - 1]?.current;

      currentBoxRef?.deactivate(() => {
        previousBoxRef?.setValueWO('');
        previousBoxRef?.removeValue(previousBoxRef?.activate);
      });

      input.pop();
      setPinInputStates({ index: index - 1, input });
    }
  }

  const clearValues = () => {
    const { index } = pinInputStates;

    BoxRefs.forEach((val, Vindex) => {
      const currentBoxRef = BoxRefs[index - 1 - Vindex]?.current;

      if (Vindex < BoxRefs.length - 1) {
        currentBoxRef?.deactivate(() => {
          currentBoxRef.setValueWO('');
          currentBoxRef.removeValue();
        });
      } else {
        currentBoxRef?.setValueWO('');
        currentBoxRef?.removeValue();
        currentBoxRef?.activate();
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
          {[...Array(pinLength).keys()]?.map(i => {
            const eleRef = createRef();
            BoxRefs.push(eleRef);
            return <PinCellCurvy key={i} size={size || 60} ref={eleRef} />;
          })}
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
