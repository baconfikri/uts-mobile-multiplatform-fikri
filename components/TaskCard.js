import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${task.done ? 'Batalkan tugas selesai' : 'Tandai tugas selesai'}: ${task.title}`}
        onPress={onToggle}
        style={({ pressed }) => [styles.checkButton, pressed && styles.pressed]}
      >
        <View style={[styles.check, task.done && styles.checked]}>
          {task.done ? <Text style={styles.checkmark}>✓</Text> : null}
        </View>
      </Pressable>
      <View style={styles.details}>
        <Text style={[styles.title, task.done && styles.completedTitle]}>{task.title}</Text>
        <Text style={styles.meta}>{task.subject}  ·  {task.duration} menit</Text>
      </View>
      <View style={styles.actions}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Ubah ${task.title}`}
          onPress={onEdit}
          style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
        >
          <Text style={styles.editText}>Ubah</Text>
        </Pressable>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Hapus ${task.title}`}
          onPress={onDelete}
          style={({ pressed }) => [styles.actionButton, pressed && styles.pressed]}
        >
          <Text style={styles.deleteText}>Hapus</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#E8EEEB',
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 10,
    minHeight: 76,
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  pressed: { opacity: 0.65 },
  checkButton: { marginRight: 11, paddingVertical: 8 },
  check: {
    alignItems: 'center',
    borderColor: '#C8D6D1',
    borderRadius: 8,
    borderWidth: 1.5,
    height: 23,
    justifyContent: 'center',
    width: 23,
  },
  checked: { backgroundColor: '#1B765E', borderColor: '#1B765E' },
  checkmark: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  details: { flex: 1 },
  title: { color: '#263B35', fontSize: 14, fontWeight: '700' },
  completedTitle: { color: '#94A3A1', textDecorationLine: 'line-through' },
  meta: { color: '#879792', fontSize: 11, marginTop: 5 },
  actions: { alignItems: 'flex-end', marginLeft: 5 },
  actionButton: { paddingHorizontal: 4, paddingVertical: 3 },
  editText: { color: '#1B765E', fontSize: 10, fontWeight: '800' },
  deleteText: { color: '#C45E58', fontSize: 10, fontWeight: '700' },
});
