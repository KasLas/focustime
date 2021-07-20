import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Focus } from './src/features/Focus/Focus';
import { colors } from './src/utils/colors';
import { spacing } from './src/utils/Sizes';
import { Timer } from './src/features/Timer/Timer';
import { FocusHistory } from './src/features/Focus/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FOCUS_SSUBJECT_STATUS = {
  SUCCESS: 1,
  CANCELED: 0,
};

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusSubjectWithStatus = (subject, status) => {
    setFocusHistory([
      ...focusHistory,
      { key: String(focusHistory.length + 1), subject, status },
    ]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const loadLocalFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).lengt) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  const saveLocalFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory));
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadLocalFocusHistory();
  }, []);

  useEffect(() => {
    saveLocalFocusHistory();
  }, [focusHistory]);

  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusSubjectWithStatus(
              focusSubject,
              FOCUS_SSUBJECT_STATUS.SUCCESS
            );
            setFocusSubject(null);
          }}
          onClearFocusSubject={() => {
            addFocusSubjectWithStatus(
              focusSubject,
              FOCUS_SSUBJECT_STATUS.CANCELED
            );
            setFocusSubject(null);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: spacing.lg,
    backgroundColor: colors.blueGrey,
  },
});
