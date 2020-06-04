import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../constants/app';

const CIRCLE_SIZE = 70;

const { add, cond, eq, event, set, Value } = Animated;

export const DraggableCircle = () => {
  const dragX = new Value(0);
  const dragY = new Value(0);
  const gestureState = new Value(-1);

  const offsetX = new Value(SCREEN_WIDTH / 2);
  const offsetY = new Value(SCREEN_HEIGHT / 2);

  const transX = cond(
    eq(gestureState, State.ACTIVE),
    add(offsetX, dragX),
    set(offsetX, add(offsetX, dragX)),
  );
  const transY = cond(
    eq(gestureState, State.ACTIVE),
    add(offsetY, dragY),
    set(offsetY, add(offsetY, dragY)),
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

  return (
    <View
      style={{
        flex: 1,
      }}>
      <PanGestureHandler
        maxPointers={1}
        // will be fired anytime there is a new gesture
        onGestureEvent={onGestureEvent}
        // only fired when the gesture enters a new phase
        onHandlerStateChange={onGestureEvent}>
        <Animated.View
          style={[
            styles.circle,
            { transform: [{ translateX: transX }, { translateY: transY }] },
          ]}
        />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    backgroundColor: 'skyblue',
    marginLeft: -(CIRCLE_SIZE / 2),
    marginTop: -(CIRCLE_SIZE / 2),
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    borderColor: 'black',
  },
});
