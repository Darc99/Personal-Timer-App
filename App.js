import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Platform, AsyncStorage } from 'react-native';

import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/sizes';

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubject = (subject, status) => {
    setFocusHistory([...focusHistory, {subject, status }]);
  }

  const STATUES = {
    COMPLETE: 1,
    CANCELLED: 2
  }

  const onClear = () => {
    setFocusHistory([]);
  }

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory))
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");
      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    loadFocusHistory();
  }, [])
  

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory])
  

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
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </>
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
