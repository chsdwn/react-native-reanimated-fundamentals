import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';

import { Accordion } from './src/components/Accordion';
import { Box } from './src/components/Box';
import { Cube } from './src/components/Cube';
import { DraggableCircle } from './src/components/DraggableCircle';

export const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <DraggableCircle />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
