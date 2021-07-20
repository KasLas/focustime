import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { fontSizes, spacing } from "../utils/Sizes";
import { colors } from "../utils/colors";
const minsTomilisec = (min) => min * 1000 * 60;

const Countdown = ({ minutes, isPaused, onProgress, onEnd }) => {
  const countdownRef = useRef(null);
  const [milsec, setMilsec] = useState(null);
  const [tempRemainingTime, setTempRemainingTime] = useState(null);

  const countDown = () => {
    setMilsec((time) => {
      if (time === 0) {
        clearInterval(countdownRef.current);

        return time;
      }
      const remainingTime = time - 1000;

      setTempRemainingTime(remainingTime);

      return remainingTime;
    });
  };

  const minute = Math.floor(milsec / 1000 / 60) % 60;
  const seconds = Math.floor(milsec / 1000) % 60;

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  useEffect(() => {
    onProgress(tempRemainingTime / minsTomilisec(minutes));
    if (milsec === 0) {
      onEnd();
    }
  }, [milsec]);

  useEffect(() => {
    if (isPaused) {
      if (countdownRef.current) clearInterval(countdownRef.current);
      return;
    }
    countdownRef.current = setInterval(countDown, 1000);
    return () => {
      clearInterval(countdownRef.current);
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
    fontWeight: "bold",
    color: colors.white,
  },
});

export { Countdown };
