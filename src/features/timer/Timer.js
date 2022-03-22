import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { CountDown } from '../../components/CounterDown';
import { RoundedBtn } from '../../components/RoundedBtn';

export const Timer = ({ focusSubject }) => {
  const [isStarted, setisStarted] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown isPaused={!isStarted} />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focus on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={styles.btnWrapper}>
      {
        isStarted ? (
          <RoundedBtn title="pause" onPress={() => setisStarted(false)} />
        ) : (
          <RoundedBtn title="start" onPress={() => setisStarted(true)} />
        )  
      }  
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
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnWrapper: {
    flex: 0.3,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'  
  }
});
