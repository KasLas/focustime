import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSizes, spacing } from '../utils/Sizes';
import { colors } from '../utils/colors';
const minsTomilisec = (min) => min * 1000 * 60;

const Countdownm = ({ minutes, isPaused, onProgress, onEnd }) => {
  const countdown = useRef(null);

  const countDown = () => {
    setMilsec((time) => {
      if (time === 0) {
        clearInterval(countdown.current);
        onEnd();

        return time;
      }
      const remainingTime = time - 1000;
      onProgress(remainingTime / minsTomilisec(minutes));
      return remainingTime;
    });
  };

  const [milsec, setMilsec] = useState(null);

  const minute = Math.floor(milsec / 1000 / 60) % 60;
  const seconds = Math.floor(milsec / 1000) % 60;

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  useEffect(() => {
    if (isPaused) {
      if (countdown.current) clearInterval(countdown.current);
      return;
    }
    countdown.current = setInterval(countDown, 1000);
    return () => {
      clearInterval(countdown.current);
    };
  }, [isPaused]);

  useEffect(() => {
    setMilsec(minsTomilisec(minutes));
  }, [minutes]);

  return (
    <Text style={styles.text}>
      {formatTime(minute)}:{formatTime(seconds)}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: colors.darkBlue,
    padding: spacing.lg,
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export { Countdownm };
