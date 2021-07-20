import React, { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButton';
import {fontSizes, spacing} from "../../utils/Sizes"
import {colors} from "../../utils/colors"
 
const Focus = ({ addSubject, focusSubject }) => {
  const [subject, setSubject] = useState(focusSubject);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>What wuld you like to focus on?</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onSubmitEditing={({ nativeEvent }) => {
              setSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            onPress={() => {
              addSubject(subject)
            }}
            size={50}
            title="+"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export { Focus };
