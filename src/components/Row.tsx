import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { TapGestureHandler } from 'react-native-gesture-handler';

interface IProps {
  title: string;
  content: string;
  height: Animated.Value<number>;
  onHandlerStateChange: any;
}

const {
  block,
  debug,
  clockRunning,
  cond,
  set,
  startClock,
  stopClock,
  timing,
  Clock,
  Value,
} = Animated;

export const Row: React.FC<IProps> = ({
  title,
  content,
  height,
  onHandlerStateChange,
}) => {
  return (
    <TapGestureHandler onHandlerStateChange={onHandlerStateChange}>
      <Animated.View>
        <TouchableOpacity>
          <View style={styles.row}>
            <Text style={styles.text}>{title}</Text>
          </View>
        </TouchableOpacity>
        <Animated.ScrollView style={{ height }}>
          <Text>{content}</Text>
        </Animated.ScrollView>
      </Animated.View>
    </TapGestureHandler>
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#8f8f8f',
    height: 50,
    borderColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 10,
    color: 'white',
    fontSize: 14,
  },
});
