import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { Animated, Easing, Modal, PanResponder, StyleSheet, TouchableOpacity, View, } from 'react-native';
export const BottomSheet = forwardRef(({ height = 550, children, containerStyle, }, ref) => {
    const duration = 300;
    const [visible, setVisible] = useState(true);
    const [modalVisible, setModalVisible] = useState(true);
    const animatedHeight = useRef(new Animated.Value(0)).current;
    const animatedFade = useRef(new Animated.Value(50)).current;
    const pan = useRef(new Animated.ValueXY()).current;
    const panResponder = createPanResponder();
    useImperativeHandle(ref, () => ({
        open: open,
        close: close,
    }));
    useEffect(() => {
        if (visible) {
            setModalVisible(true);
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: 100,
                duration: duration,
                easing: Easing.ease,
            }).start();
        }
        else {
            Animated.timing(animatedFade, {
                useNativeDriver: false,
                toValue: 0,
                duration: duration,
                easing: Easing.ease,
            }).start();
            Animated.timing(animatedHeight, {
                useNativeDriver: false,
                toValue: 0,
                duration: duration,
                easing: Easing.ease,
            }).start(() => {
                pan.setValue({ x: 0, y: 0 });
                setModalVisible(false);
            });
        }
    }, [visible]);
    useEffect(() => {
    }, []);
    const panStyle = {
        transform: pan.getTranslateTransform(),
    };
    function createPanResponder() {
        return PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (e, gestureState) => {
                if (gestureState.dy > 0) {
                    Animated.event([null, { dy: pan.y }], { useNativeDriver: false })(e, gestureState);
                }
            },
            onPanResponderRelease: (e, gestureState) => {
                if (height / 4 - gestureState.dy < 0) {
                    close();
                }
                else {
                    Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
                }
            },
        });
    }
    function open() {
        setVisible(true);
    }
    function close() {
        setVisible(false);
    }
    return (<Modal visible={modalVisible} transparent={true} onRequestClose={close}>
      <TouchableOpacity style={styles.mask} activeOpacity={1} onPress={close}>
        <Animated.View style={[styles.background, {
                opacity: animatedFade.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 1],
                }),
            }]}></Animated.View>
      </TouchableOpacity>
      <Animated.View style={[panStyle, styles.container, containerStyle, {
                height: height, bottom: animatedHeight.interpolate({
                    inputRange: [0, 100],
                    outputRange: [-height, 0],
                }),
            }]}>
        <View style={styles.draggableContainer}>
          <View style={[styles.draggableIcon]}/>
        </View>
        {children}
      </Animated.View>
    </Modal>);
});
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#00000077',
    },
    mask: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    container: {
        backgroundColor: '#fff',
        borderRadius: 32,
        width: '100%',
        height: 0,
        overflow: 'hidden',
        position: 'absolute',
        bottom: -1000,
        zIndex: 10,
    },
    draggableContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    draggableIcon: {
        width: 35,
        height: 5,
        borderRadius: 5,
        margin: 10,
        backgroundColor: '#ccc',
    },
    modal: {
        backgroundColor: 'blue',
    },
    background: {
        backgroundColor: '#000',
        opacity: 0.5,
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
    },
});
