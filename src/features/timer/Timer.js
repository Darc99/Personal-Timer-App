import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { CountDown } from '../../components/CounterDown';

export const Timer = ({ focusSubject }) => {
  return (
    <View style={styles.container}>
      <CountDown />
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focus on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
