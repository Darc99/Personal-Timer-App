import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';

import { Focus } from './src/features/focus/Focus';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([])

  const addFocusHistorySubject = (subject, status) => {
    setFocusHistory([...focusHistory, {subject, status }])
  }

  const STATUES = {
    COMPLETE: 1,
    CANCELLED: 2
  }

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer 
          focusSubject={focusSubject} 
          onTimerEnd={() => {
            addFocusHistorySubject(focusSubject, STATUES.COMPLETE)
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistorySubject(focusSubject, STATUES.CANCELLED);
            setFocusSubject(null);
          }}
        />
      ) : (
        <Focus addSubject={setFocusSubject} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
