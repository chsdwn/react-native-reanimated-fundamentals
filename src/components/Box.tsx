import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

const {
  and,
  block,
  cond,
  eq,
  event,
  interpolate,
  neq,
  set,
  startClock,
  stopClock,
  timing,
  Clock,
  Extrapolate,
  Value,
} = Animated;

const runOpacityTimer = (clock: Clock, gestureState: any) => {
  const state: Animated.TimingState = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config: Animated.TimingConfig = {
    duration: 300,
    toValue: new Value(-1),
    easing: Easing.inOut(Easing.ease),
  };

  return block([
    timing(clock, state, config),
    cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 1),
      startClock(clock),
    ]),
    cond(and(eq(gestureState, State.END), neq(config.toValue, 0)), [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.frameTime, 0),
      set(config.toValue, 0),
      startClock(clock),
    ]),
    timing(clock, state, config),
    cond(state.finished, stopClock(clock)),
    interpolate(state.position, {
      inputRange: [0, 1],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    }),
  ]);
};

export const Box = () => {
  const gestureState = new Value(-1);
  const clock = new Clock();
  const opacity = runOpacityTimer(clock, gestureState);

  const onStateChange = event([
    {
      nativeEvent: {
        state: gestureState,
      },
    },
  ]);

  return (
    <View style={styles.container}>
      <TapGestureHandler minDist={0} onHandlerStateChange={onStateChange}>
        <Animated.View style={[styles.box, { opacity }]}></Animated.View>
      </TapGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    backgroundColor: 'red',
    width: 200,
    height: 200,
  },
});
