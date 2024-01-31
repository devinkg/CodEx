import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    Easing,
    Animated,
} from 'react-native';

export const PinCellCurvy = forwardRef((PinBoxProps, forwardingRef) => {
    const { size, active, hasValue } = PinBoxProps;

    const checkboxAnim = new Animated.Value(0);
    const overlayAnim = new Animated.Value(0);
    const sizeO =
        typeof size === 'string' ? parseInt(size.replace('%', ''), 10) : size;
    const heightOverSet = sizeO;

    const [pinBoxStates, setPinBoxStates] = useState({
        active: !!active,
        hasValue: !!hasValue,
        MaxHeight: sizeO + heightOverSet,
        MaxWidth: sizeO,
        value: '',
    });

    const boxStyles = {
        height: checkboxAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [sizeO, sizeO + heightOverSet],
        }),
        width: sizeO,
    };

    const boxOverlayStyles = {
        height: overlayAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
        }),
        width: overlayAnim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
        }),
    };

    useEffect(() => {
        const { active } = pinBoxStates;
        if (active) {
            Animated.timing(checkboxAnim, {
                toValue: 1,
                duration: 50,
                easing: Easing.cubic,
                useNativeDriver: false,
            }).start();
        }
    }, [checkboxAnim, pinBoxStates]);

    const setValue = (value = 0) => {
        setPinBoxStates((prevState) => ({ ...prevState, value }));
        Animated.timing(checkboxAnim, {
            toValue: 0,
            duration: 25,
            easing: Easing.cubic,
            useNativeDriver: false
        }).start();
    }

    const setValueWO = (value) => {
        setPinBoxStates((prevState) => ({ ...prevState, value }));
    }

    const activate = () => {
        setPinBoxStates((prevState) => ({ ...prevState, active: true }));
        Animated.timing(checkboxAnim, {
            toValue: 1,
            duration: 50,
            easing: Easing.cubic,
            useNativeDriver: false
        }).start();
    }

    const deactivate = (callBack = undefined) => {
        setPinBoxStates((prevState) => ({ ...prevState, active: false }));
        Animated.timing(checkboxAnim, {
            toValue: 0,
            duration: 50,
            easing: Easing.cubic,
            useNativeDriver: false
        }).start(callBack);
    }

    const deactivateWO = (callBack = undefined) => {
        setPinBoxStates((prevState) => ({ ...prevState, active: false }));
        Animated.timing(checkboxAnim, {
            toValue: 0,
            duration: 5,
            easing: Easing.cubic,
            useNativeDriver: false
        }).start(callBack);
    }

    const removeValue = (callBack = undefined) => {
        setPinBoxStates((prevState) => ({ ...prevState, hasValue: false }));
        setTimeout(() => {
            Animated.timing(overlayAnim, {
                toValue: 0,
                duration: 50,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start();
        }, 250);
        typeof callBack === 'function' && callBack();
    }

    const fixValue = (callBack = undefined) => {
        setPinBoxStates((prevState) => ({ ...prevState, hasValue: true }));
        setTimeout(() => {
            Animated.timing(overlayAnim, {
                toValue: 1,
                duration: 50,
                easing: Easing.cubic,
                useNativeDriver: false
            }).start();
        }, 250);
        typeof callBack === 'function' && callBack();
    }

    useImperativeHandle(forwardingRef, () => {
        return { setValue, setValueWO, activate, deactivate, deactivateWO, removeValue, fixValue }
    })

    const { value, MaxHeight, MaxWidth } = pinBoxStates;

    return (
        <>
            <View
                style={[
                    PinCellCurvyStyles.PinCellContainer,
                    { height: MaxHeight, width: MaxWidth },
                ]}>
                <Animated.View
                    style={[
                        boxStyles,
                        PinCellCurvyStyles.PinCell,
                        PinCellCurvyStyles.inputShadow,
                    ]}
                >
                    {pinBoxStates.hasValue && (
                        <Animated.View
                            style={[boxOverlayStyles, PinCellCurvyStyles.PinCellOverlay]}>
                            <View
                                style={[
                                    PinCellCurvyStyles.overlayDot,
                                    PinCellCurvyStyles.inputShadow,
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
});

const PinCellCurvyStyles = StyleSheet.create({
    PinCellContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5
    },
    PinCell: {
        borderColor: 'grey',
        borderRadius: 500,
        borderWidth: 1,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    PinCellOverlay: {
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