import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function ScreenTitle({ eyebrow, title, description }) {
  return (
    <View style={styles.container}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {description ? <Text style={styles.description}>{description}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 22 },
  eyebrow: {
    color: '#1B765E',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1.4,
    marginBottom: 7,
    textTransform: 'uppercase',
  },
  title: { color: '#172B27', fontSize: 27, fontWeight: '800', letterSpacing: -0.5 },
  description: { color: '#71817C', fontSize: 14, lineHeight: 21, marginTop: 7 },
});
