import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';

interface IProps {
  title: string;
  content: string;
  toggleContent: () => void;
  height: Animated.Value<number>;
}

export const Row: React.FC<IProps> = ({
  title,
  content,
  toggleContent,
  height,
}) => {
  return (
    <Animated.View style={{ height }}>
      <TouchableOpacity onPress={toggleContent}>
        <View style={styles.row}>
          <Text style={styles.text}>{title}</Text>
        </View>
      </TouchableOpacity>
      <Animated.ScrollView style={{ height }}>
        <Text>{content}</Text>
      </Animated.ScrollView>
    </Animated.View>
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
