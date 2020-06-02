import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

const { cond, eq, event, Value } = Animated;

export const Box = () => {
  const state = new Value(-1);
  const opacity = cond(eq(state, State.BEGAN), 0.2, 1);

  const onStateChange = event([
    {
      nativeEvent: {
        state,
      },
    },
  ]);

  return (
    <View style={styles.container}>
      <TapGestureHandler onHandlerStateChange={onStateChange}>
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
