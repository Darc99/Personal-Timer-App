import React, { useState } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedBtn } from '../../components/RoundedBtn';
import { fontSizes, spacing } from '../../utils/sizes';
import { colors } from '../../utils/colors';

const HistoryItem = ({item, index}) => {
  return (
    <Text style={styles.historyItem(item.status)}>
      {/* {JSON.stringify(item)} */}
      {item.subject}
    </Text>
  )
}

export const FocusHistory = ({focusHistory, setFocusHistory}) => {
  const clearHistory = () => {
    onClear();
  }

  return (
    <>
      <SafeAreaView style={{flex: 0.5, alignItems: 'center'}}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things we have focused on</Text>
            <FlatList 
              style={{flex: 1}}
              contentContainerStyle={{flex:1, alignItems: 'center'}}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.clearContainer}>
                <RoundedBtn size={75} title="Clear" onPress={() => onClear()}/>
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  historyItem: (status) => ({
    color: status > 1 ? 'red' : 'green',
    fontSize: fontSizes.md
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.lg
  },
  clearContainer: {
    alignItems: 'center',
    padding: spacing.md
  }
})