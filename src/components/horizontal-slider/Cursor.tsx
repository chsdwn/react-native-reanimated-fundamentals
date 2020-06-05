import React from 'react';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import {
  clamp,
  onGestureEvent,
  snapPoint,
  timing,
  ReText,
} from 'react-native-redash';

interface IProps {
  x: Animated.Value<number>;
  size: number;
  count: number;
}

const {
  add,
  concat,
  cond,
  divide,
  eq,
  floor,
  lessThan,
  modulo,
  round,
  set,
  useCode,
  Value,
} = Animated;

export const Cursor: React.FC<IProps> = ({ x, size, count }) => {
  const snapPoints = new Array(count).fill(0).map((e, i) => i * size);
  const index = round(divide(x, size));
  const translationX = new Value(0);
  const velocityX = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const gestureHandler = onGestureEvent({ state, translationX, velocityX });
  const offset = new Value(0);
  const value = add(offset, translationX);
  const translateX = clamp(
    cond(
      eq(state, State.END),
      set(
        offset,
        timing({
          from: value,
          to: snapPoint(value, velocityX, snapPoints),
        }),
      ),
      value,
    ),
    0,
    (count - 1) * size,
  );

  useCode(() => set(x, translateX), [x, translateX]);

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: 'white',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          justifyContent: 'center',
          alignItems: 'center',
          transform: [{ translateX: x }],
        }}>
        <ReText style={{ fontSize: 24 }} text={concat(add(index, 1))} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({});
