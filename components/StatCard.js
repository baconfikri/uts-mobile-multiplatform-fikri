import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function StatCard({ label, value, caption, color = '#1B765E' }) {
  return (
    <View style={styles.card}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.caption}>{caption}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEB',
    borderRadius: 18,
    borderWidth: 1,
    flex: 1,
    minHeight: 112,
    padding: 14,
  },
  dot: { borderRadius: 5, height: 8, marginBottom: 10, width: 8 },
  value: { color: '#172B27', fontSize: 23, fontWeight: '800' },
  label: { color: '#40534D', fontSize: 12, fontWeight: '700', marginTop: 3 },
  caption: { color: '#94A3A1', fontSize: 10, marginTop: 4 },
});
