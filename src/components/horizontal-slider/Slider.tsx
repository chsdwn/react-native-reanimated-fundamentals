import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Cursor } from './Cursor';
import { Labels } from './Labels';

import { WINDOW_WIDTH } from '../../constants/app';

const { add, max, Value } = Animated;

const count = 5;
const width = WINDOW_WIDTH / count;

export const Slider = () => {
  const x = new Value(0);

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: '#bd536d',
          width: add(max(x, 0), width),
          height: width,
          borderRadius: width / 2,
        }}
      />
      <Labels size={width} x={x} count={count} />
      <Cursor size={width} x={x} count={count} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
    borderRadius: width / 2,
    backgroundColor: '#f1f2f6',
  },
});
