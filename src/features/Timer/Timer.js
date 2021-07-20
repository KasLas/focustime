import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/Sizes';
import { Countdownm } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButton';
import { ProgressBar } from 'react-native-paper';
import { Timing } from './Timing';
import { useKeepAwake } from 'expo-keep-awake';

const DEFAULT_TIME = 0.1;

const Timer = ({ focusSubject, onTimerEnd, onClearFocusSubject}) => {
  useKeepAwake();
  const [progress, setProgress] = useState(1);
  const [isStarted, setisStarted] = useState(false);
  const [minutes, setMinutes] = useState(DEFAULT_TIME);

  const vibrate = () => {
    // vibration is platform specific
    if (Platform.OS === 'ios') {
      const interval = setInterval(() => {
        Vibration.vibrate();
      }, 1000);
      setTimeout(() => {
        clearInterval(interval), 10000;
      });
    } else {
      Vibration.vibrate(1000);
    }
  };

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const changeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setisStarted(false);
  };

  const onEnd = () => {
    onTimerEnd();
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setisStarted(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdownm
          onEnd={onEnd}
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
        />
      </View>
      <View style={{ paddingTop: spacing.xl }}>
        <Text style={styles.title}>We are focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View>
        <ProgressBar
          progress={progress}
          color={colors.darkBlue}
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.btnWrapper}>
        <Timing changeTime={changeTime} />
      </View>
      <View style={styles.btnWrapper}>
        {isStarted ? (
          <RoundedButton title="pause" onPress={() => setisStarted(false)} />
        ) : (
          <RoundedButton title="start" onPress={() => setisStarted(true)} />
        )}
      </View>
      <View style={styles.clearButton}>
        <RoundedButton
          title="-"
          size={50}
          onPress={() => {
            onClearFocusSubject();
          }}
        />
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  clearButton: {
    paddingBottom: 20,
    paddingLeft: 20,
  },
});

export { Timer };
