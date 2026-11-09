import React from 'react';
import { StyleSheet, View } from 'react-native';

export default function ProgressBar({ progress, color = '#1B765E' }) {
  const percentage = Math.max(0, Math.min(100, Math.round(progress * 100)));

  return (
    <View style={styles.track}>
      <View style={[styles.fill, { backgroundColor: color, width: `${percentage}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: '#E8EFEC',
    borderRadius: 99,
    height: 9,
    overflow: 'hidden',
    width: '100%',
  },
  fill: { borderRadius: 99, height: '100%' },
});
