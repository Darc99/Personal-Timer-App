import React, {useState, useEffect} from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors';

const minutesToMillis = (min) => min * 1000 * 60;

const formatTime = (time) => time < 10 ? `0${time}` : time

export const CountDown = ({ minutes = 15, isPaused}) => {
  const [millis, setMillis] = useState(minutesToMillis(minutes))
  const minute = Math.floor(millis/1000/60) % 60;
  const seconds = Math.floor(millis/1000) %60;
  const interval = React.useRef(null);
  const countDown = () => {
    setMillis((time) => {
      if (time === 0) {
        return time;
      }
      const timeLeft = time - 1000;
      return timeLeft;
    })
  }
  useEffect(() => {
    if (isPaused) {
      return;
    }
    interval.current = setInterval(countDown, 1000)
    return () =>clearInterval(interval.current)
  }, [isPaused])
  
  return (
    <Text style={styles.text}>
      {formatTime(minute)} : {formatTime(seconds)}
    </Text>);
};

const styles = StyleSheet.create({
    text: {
      fontSize: fontSizes.xxxl,
      fontWeight: 'bold',
      color: colors.white,
      padding: fontSizes.lg,
      backgroundColor: 'rgba(94, 132, 226, 0.3)'
    }
});
