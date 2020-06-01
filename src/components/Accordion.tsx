import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing } from 'react-native-reanimated';
import { State, TapGestureHandler } from 'react-native-gesture-handler';

import { Row } from './Row';

const {
  block,
  debug,
  clockRunning,
  cond,
  eq,
  interpolate,
  not,
  set,
  startClock,
  stopClock,
  timing,
  useCode,
  Clock,
  Extrapolate,
  Value,
} = Animated;

function runTiming(clock: Animated.Clock, value: any, dest: any) {
  const state = {
    finished: new Value(0),
    position: value,
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 1000,
    toValue: dest,
    easing: Easing.inOut(Easing.cubic),
  };

  return block([
    cond(clockRunning(clock), 0, [
      // if the clock isn't running we reset all the animation params and start the clock
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    // we run the step here that is going to update position
    timing(clock, state, config),
    // if the animation is over we stop the clock
    cond(state.finished, debug('stop clock', stopClock(clock))),
    // we made the block return the updated position
    state.position,
  ]);
}

export const Accordion = () => {
  const [showContent1, setShowContent1] = useState(false);
  const [showContent2, setShowContent2] = useState(false);
  const [showContent3, setShowContent3] = useState(false);

  const state = new Value(State.UNDETERMINED);
  const state2 = new Value(State.UNDETERMINED);
  const state3 = new Value(State.UNDETERMINED);

  const finished = new Value(0);
  const position = new Value(0);
  const time = new Value(0);
  const frameTime = new Value(0);

  const heightRow1 = new Value(0);
  const heightRow2 = new Value(0);
  const heightRow3 = new Value(0);

  useCode(
    () =>
      cond(
        eq(state, State.END),
        set(heightRow1, runTiming(new Clock(), new Value(0), new Value(150))),
      ),
    [state, heightRow1],
  );
  useCode(
    () =>
      cond(
        eq(state2, State.END),
        set(heightRow2, runTiming(new Clock(), new Value(0), new Value(150))),
      ),
    [state2, heightRow2],
  );
  useCode(
    () =>
      cond(
        eq(state3, State.END),
        set(heightRow3, runTiming(new Clock(), new Value(0), new Value(150))),
      ),
    [state3, heightRow3],
  );

  const toggleRow1Content = () => {
    setShowContent1(!showContent1);
    setShowContent2(false);
    setShowContent3(false);
  };

  const toggleRow2Content = () => {
    setShowContent1(false);
    setShowContent2(!showContent2);
    setShowContent3(false);
  };

  const toggleRow3Content = () => {
    setShowContent1(false);
    setShowContent2(false);
    setShowContent3(!showContent3);
  };

  return (
    <View style={styles.accordion}>
      <Row
        title={'Row 1'}
        content={'This is first row'}
        height={heightRow1}
        onHandlerStateChange={Animated.event([{ nativeEvent: { state } }])}
      />
      <Row
        title={'Row 2'}
        content={'This is first row'}
        height={heightRow2}
        onHandlerStateChange={Animated.event([
          { nativeEvent: { state: state2 } },
        ])}
      />
      <Row
        title={'Row 3'}
        content={'This is first row'}
        height={heightRow3}
        onHandlerStateChange={Animated.event([
          { nativeEvent: { state: state3 } },
        ])}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  accordion: {
    margin: 20,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: '#000000',
  },
});
