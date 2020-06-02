import React, { useEffect } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';

import { Accordion } from './src/components/Accordion';
import { Box } from './src/components/Box';
import { Cube } from './src/components/Cube';

export const App = () => {
  return (
    <>
      <StatusBar />
      <SafeAreaView style={styles.container}>
        <Box />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
