import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;

export const CountDown = ({ minutes = 20, isPaused }) => {
  return <Text style={styles.text}>Timer here</Text>;
};

const styles = StyleSheet.create({
    text: {
      fontSize: fontSizes.xxxl,
      fontWeight: 'bold',
      
    }
  });
