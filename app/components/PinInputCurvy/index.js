import React, { Component } from 'react';
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
    this.testingID = '';
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
    const { value, hasValue, MaxHeight, MaxWidth, testingID } = this.state;
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

export class PinInputCurvy extends Component {
  ShakeboxAnim = new Animated.Value(1);

  boxShake = {
    transform: [
      {
        translateX: this.ShakeboxAnim.interpolate({
          inputRange: [0, 1, 2],
          outputRange: [-15, 0, 15],
        }),
      },
    ],
  };

  constructor(props) {
    super(props);
    this.box = [];
    const { pinLength, size } = this.props;
    this.BoxRefs = [];
    this.state = {
      input: [],
      index: 0,
    };
    this.addValue = this.addValue.bind(this);
    for (let j = 0; j < pinLength; j += 1) {
      const eleRef = React.createRef();
      this.box.push(<PinBox key={j} size={size || 60} ref={eleRef} />);
      this.BoxRefs.push(eleRef);
    }

  }

  componentDidMount() {
    const { index } = this.state;
    this.BoxRefs[index]?.current?.activate();
  }

  shake = () => {
    Animated.sequence([
      Animated.timing(this.ShakeboxAnim, { toValue: 0, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 2, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 0, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 2, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 0, duration: 50, useNativeDriver: false }),
      Animated.timing(this.ShakeboxAnim, { toValue: 1, duration: 50, useNativeDriver: false }),
    ]).start();
  };

  pinInputTap = () => {
    const { onTap } = this.props;
    typeof onTap && onTap();
  };

  addValue(value) {
    const { index, input } = this.state;
    if (index + 1 < this.BoxRefs.length) {
      this.BoxRefs[index]?.current?.setValue(value);
      this.BoxRefs[index]?.current?.fixValue(
        this.BoxRefs[index + 1]?.current?.activate,
      );
      input.push(value);
      this.setState({ index: index + 1, input });
    } else if (index + 1 === this.BoxRefs.length) {
      this.BoxRefs[index]?.current?.setValue(value);
      this.BoxRefs[index]?.current?.fixValue();
      input.push(value);
      this.setState({ index: index + 1, input });
    }
    const { onPinInputComplete } = this.props;
    index + 1 >= this.BoxRefs.length &&
      typeof onPinInputComplete === 'function' &&
      onPinInputComplete(input);
  }

  deleteValue() {
    const { index, input } = this.state;
    const { pinLengthZero } = this.props;
    if (index !== 0) {
      let cIndex = index;
      index < this.BoxRefs.length || (cIndex = index - 1);
      this.BoxRefs[cIndex]?.current?.deactivate(() => {
        this.BoxRefs[index - 1]?.current?.setValueWO('');
        this.BoxRefs[index - 1]?.current?.removeValue(
          this.BoxRefs[index - 1]?.current?.activate,
        );
      });
      input.pop();
      this.setState({ index: index - 1, input }, () => {
        if (pinLengthZero) {
          if (!this.state.index) {
            pinLengthZero();
          }
        }
      });
    }
  }

  Clear() {
    const { index } = this.state;
    this.BoxRefs.forEach((val, Vindex) => {
      if (Vindex < this.BoxRefs.length - 1) {
        val?.current?.deactivate(() => {
          this.BoxRefs[index - 1 - Vindex]?.current?.setValueWO('');
          this.BoxRefs[index - 1 - Vindex]?.current?.removeValue();
        });
      } else {
        this.BoxRefs[index - 1 - Vindex]?.current?.setValueWO('');
        this.BoxRefs[index - 1 - Vindex]?.current?.removeValue();
        this.BoxRefs[index - 1 - Vindex]?.current?.activate();
      }
    });
    this.setState({ index: 0, input: [] });
  }

  render() {
    return (
      <>
        <TouchableWithoutFeedback onPress={this.pinInputTap}>
          <Animated.View
            style={[PinInputStyles.PinsBoxContainer, this.boxShake]} >
            {this.box}
          </Animated.View>
        </TouchableWithoutFeedback>
      </>
    );
  }
}

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
