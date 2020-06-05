import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { mixColor } from 'react-native-redash';

const { add, cond, divide, lessOrEq, round } = Animated;

interface IProps {
  x: Animated.Value<number>;
  count: number;
  size: number;
}

export const Labels: React.FC<IProps> = ({ x, count, size }) => {
  const index = add(round(divide(x, size)), 1);

  return (
    <View style={{ ...StyleSheet.absoluteFillObject, ...styles.container }}>
      {new Array(count).fill(0).map((_, i) => {
        const color = mixColor(cond(lessOrEq(index, i), 0, 1), 'gray', 'white');
        return (
          <View key={i} style={{ flex: 1 }}>
            <Animated.Text
              style={{
                color,
                textAlign: 'center',
                fontSize: 24,
              }}>
              {`${i + 1}`}
            </Animated.Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
