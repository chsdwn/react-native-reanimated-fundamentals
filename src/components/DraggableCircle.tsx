import React, { useEffect, useCallback } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  LayoutChangeEvent,
} from 'react-native';
import Animated, { useCode } from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/app';

const CIRCLE_SIZE = 70;

const {
  add,
  call,
  cond,
  eq,
  event,
  interpolate,
  set,
  Extrapolate,
  Value,
} = Animated;

export const DraggableCircle = () => {
  const dragX = new Value(0);
  const dragY = new Value(0);
  const gestureState = new Value(-1);

  const offsetX = new Value(SCREEN_WIDTH / 2);
  const offsetY = new Value(100);

  const addX = add(offsetX, dragX);
  const addY = add(offsetY, dragY);

  const transX = cond(
    eq(gestureState, State.ACTIVE),
    addX,
    set(offsetX, add(offsetX, dragX)),
  );
  let transY = cond(
    eq(gestureState, State.ACTIVE),
    addY,
    set(offsetY, add(offsetY, dragY)),
  );

  const opacity = interpolate(transY, {
    inputRange: [0, SCREEN_HEIGHT],
    outputRange: [0.1, 1],
  });

  const borderWidth = interpolate(transX, {
    inputRange: [0, SCREEN_WIDTH],
    outputRange: [1, 5],
    // indicates that output value never be less than 1 and more than 5
    extrapolate: Extrapolate.CLAMP,
  });

  let top = 0;
  let bottom = 0;
  let left = 0;
  let right = 0;

  const onDrop = ([x, y]: any) => {
    if (x >= left && x <= right && y >= top && y <= bottom)
      console.log('Drop zone');
  };

  useCode(
    () =>
      (transY = cond(eq(gestureState, State.ACTIVE), addY, [
        cond(eq(gestureState, State.END), call([addX, addY], onDrop)),
        set(offsetY, addY),
      ])),
    [],
  );

  const onGestureEvent = event([
    {
      nativeEvent: {
        translationX: dragX,
        translationY: dragY,
        state: gestureState,
      },
    },
  ]);

  const saveDropZone = (e: LayoutChangeEvent) => {
    const { width, height, x, y } = e.nativeEvent.layout;
    top = y;
    bottom = y + height;
    left = x;
    right = x + width;
  };

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View style={styles.dropZone} onLayout={saveDropZone} />
      <PanGestureHandler
        maxPointers={1}
        // will be fired anytime there is a new gesture
        onGestureEvent={onGestureEvent}
        // only fired when the gesture enters a new phase
        onHandlerStateChange={onGestureEvent}>
        <Animated.View
          style={[
            styles.circle,
            {
              opacity,
              borderWidth,
              transform: [{ translateX: transX }, { translateY: transY }],
            },
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  dropZone: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,.2)',
    height: '50%',
  },
  circle: {
    backgroundColor: 'skyblue',
    position: 'absolute',
    marginLeft: -(CIRCLE_SIZE / 2),
    marginTop: -(CIRCLE_SIZE / 2),
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: 'black',
  },
});
