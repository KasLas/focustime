import React from 'react';
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native';
import { fontSizes, spacing } from '../../utils/Sizes';
import { RoundedButton } from '../../components/RoundedButton';

const HistoryItem = ({ item, index }) => {
  return <Text style={styles.focusItem(item.status)}>{item.subject}</Text>;
};

const FocusHistory = ({ focusHistory, onClear }) => {
  const clearHistory = () => {
    onClear();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 0.5, alignItems: 'center'}}>
        {!!focusHistory.length && (
          <>
            <Text style={styles.title}>Things I focused on</Text>
            <FlatList
              style={{ flex: 1}}
              contentContainerStyle={{ alignItems: 'center' }}
              data={focusHistory}
              renderItem={HistoryItem}
            />
            <View style={styles.cleaContainer}>
              <RoundedButton title="clear" size={75} onPress={onClear} />
            </View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  focusItem: (status) => ({
    color: status === 1 ? 'green' : 'red',
    fontSize: fontSizes.lg,
  }),
  title: {
    color: 'white',
    fontSize: fontSizes.xl,
  },
  cleaContainer: {
    padding: spacing.md,
  },
});

export { FocusHistory };
