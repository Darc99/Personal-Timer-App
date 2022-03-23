import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';

import { colors } from '../../utils/colors';
import { spacing } from '../../utils/sizes';
import { CountDown } from '../../components/CounterDown';
import { RoundedBtn } from '../../components/RoundedBtn';
import { Timing } from './Timing';

const DEFAULT_TIME = 0.1;
export const Timer = ({ focusSubject }) => {

  const interval = React.useRef(null);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setisStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress)
  }

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setisStarted(false);
  }

  const vibrate = () => {
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 1000);
    } else {
      Vibration.vibrate(1000)
    }
  }

  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setisStarted(false);
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <CountDown 
          minutes={minutes} 
          isPaused={!isStarted} 
          onProgress={onProgress} 
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focus on: </Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{paddingTop: spacing.sm}}>
        <ProgressBar 
          progress={progress}
          color='#5e84e2'
          style={{height:10}}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Timing onChangeTime={changeTime}/>
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
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center'  
  }
});
