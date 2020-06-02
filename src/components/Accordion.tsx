import React, { useState, useEffect, useRef } from 'react';
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
    duration: 500,
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

  let heightRow1 = useRef(new Value(50));
  let heightRow2 = useRef(new Value(50));
  let heightRow3 = useRef(new Value(50));

  const toggleRow1Content = () => {
    if (!showContent1) {
      heightRow1.current = runTiming(
        new Clock(),
        new Value(50),
        new Value(200),
      );
    } else {
      heightRow1.current = runTiming(
        new Clock(),
        new Value(200),
        new Value(50),
      );
    }
    if (showContent2) {
      heightRow2.current = runTiming(
        new Clock(),
        new Value(200),
        new Value(50),
      );
    }
    if (showContent3) {
      heightRow3.current = runTiming(
        new Clock(),
        new Value(200),
        new Value(50),
      );
    }
    setShowContent1(!showContent1);
    setShowContent2(false);
    setShowContent3(false);
  };

  const toggleRow2Content = () => {
    if (!showContent2) {
      heightRow2.current = runTiming(
        new Clock(),
        new Value(50),
        new Value(200),
      );
    } else {
      heightRow2.current = runTiming(
        new Clock(),
        new Value(200),
        new Value(50),
      );
    }
    if (showContent1) {
      heightRow1.current = runTiming(
        new Clock(),
        new Value(200),
        new Value(50),
      );
    }
    if (showContent3) {
      heightRow3.current = runTiming(
        new Clock(),
        new Value(200),
        new Value(50),
      );
    }
    setShowContent1(false);
    setShowContent2(!showContent2);
    setShowContent3(false);
  };

  const toggleRow3Content = () => {
    if (!showContent3) {
      heightRow3.current = runTiming(
        new Clock(),
        new Value(50),
        new Value(200),
      );
    } else {
      heightRow3.current = runTiming(
        new Clock(),
        new Value(200),
        new Value(50),
      );
    }
    if (showContent1) {
      heightRow1.current = runTiming(
        new Clock(),
        new Value(200),
        new Value(50),
      );
    }
    if (showContent2) {
      heightRow2.current = runTiming(
        new Clock(),
        new Value(200),
        new Value(50),
      );
    }
    setShowContent1(false);
    setShowContent2(false);
    setShowContent3(!showContent3);
  };

  return (
    <View style={styles.accordion}>
      <Row
        title={'Row 1'}
        content={'This is first row'}
        height={heightRow1.current}
        toggleContent={toggleRow1Content}
      />
      <Row
        title={'Row 2'}
        content={'This is second row'}
        height={heightRow2.current}
        toggleContent={toggleRow2Content}
      />
      <Row
        title={'Row 3'}
        content={'This is third row'}
        height={heightRow3.current}
        toggleContent={toggleRow3Content}
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
