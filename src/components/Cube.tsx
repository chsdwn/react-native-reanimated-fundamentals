import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated from 'react-native-reanimated';

const {
  block,
  cond,
  eq,
  set,
  useCode,
} = Animated;

export const Cube = () => {
  return (
    <Animated.View
      style={{
        width: 200,
        height: 200,
        backgroundColor: 'red',
      }}></Animated.View>
  );
};

const styles = StyleSheet.create({});
