import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useTasks } from '../App';
import ScreenTitle from './ScreenTitle';

export default function TaskForm({ task }) {
  const router = useRouter();
  const { addTask, updateTask } = useTasks();
  const [title, setTitle] = useState(task?.title || '');
  const [subject, setSubject] = useState(task?.subject || '');
  const [duration, setDuration] = useState(String(task?.duration || 30));
  const isEditing = Boolean(task);

  const saveTask = () => {
    const cleanTitle = title.trim();
    const cleanSubject = subject.trim();
    const minutes = Number(duration);

    if (!cleanTitle) {
      Alert.alert('Judul belum diisi', 'Tulis nama tugas atau materi yang ingin dipelajari.');
      return;
    }
    if (!cleanSubject) {
      Alert.alert('Mata pelajaran belum diisi', 'Isi nama pelajaran sesuai kebutuhanmu.');
      return;
    }
    if (!Number.isInteger(minutes) || minutes < 5 || minutes > 240) {
      Alert.alert('Durasi tidak valid', 'Masukkan durasi antara 5 sampai 240 menit.');
      return;
    }

    const changes = { title: cleanTitle, subject: cleanSubject, duration: minutes };
    if (isEditing) {
      updateTask(task.id, changes);
    } else {
      addTask(changes);
    }
    router.replace('/');
  };

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <ScreenTitle
            eyebrow={isEditing ? 'Ubah rencana' : 'Rencana baru'}
            title={isEditing ? 'Sesuaikan belajarmu' : 'Atur sesi belajarmu'}
            description="Atur nama tugas, pelajaran, dan durasi sesuai kebutuhanmu."
          />

          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>✦</Text>
            <Text style={styles.tipText}>
              Bisa untuk pelajaran sekolah, mata kuliah, ujian, atau materi mandiri.
            </Text>
          </View>

          <Text style={styles.label}>Nama tugas atau materi</Text>
          <TextInput
            accessibilityLabel="Nama tugas atau materi"
            onChangeText={setTitle}
            placeholder="Contoh: Membaca materi bab 3"
            placeholderTextColor="#A1ACA8"
            style={styles.input}
            value={title}
            returnKeyType="next"
          />

          <Text style={styles.label}>Mata pelajaran atau mata kuliah</Text>
          <TextInput
            accessibilityLabel="Mata pelajaran atau mata kuliah"
            onChangeText={setSubject}
            placeholder="Contoh: Sejarah, Kalkulus, atau Keperawatan"
            placeholderTextColor="#A1ACA8"
            style={styles.input}
            value={subject}
            returnKeyType="next"
          />

          <Text style={styles.label}>Durasi belajar</Text>
          <View style={styles.durationWrap}>
            <TextInput
              accessibilityLabel="Durasi belajar dalam menit"
              keyboardType="number-pad"
              maxLength={3}
              onChangeText={setDuration}
              placeholder="30"
              placeholderTextColor="#A1ACA8"
              style={[styles.input, styles.durationInput]}
              value={duration}
            />
            <Text style={styles.minutes}>menit  ·  5–240 menit</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            onPress={saveTask}
            style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
          >
            <Text style={styles.saveButtonText}>
              {isEditing ? 'Simpan perubahan  →' : 'Simpan rencana  →'}
            </Text>
          </Pressable>
          <Text style={styles.helper}>Rencana tersimpan di perangkat ini.</Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F5F8F6', flex: 1 },
  flex: { flex: 1 },
  content: { padding: 22, paddingBottom: 30 },
  tipCard: {
    alignItems: 'center',
    backgroundColor: '#E7F3ED',
    borderRadius: 14,
    flexDirection: 'row',
    marginBottom: 25,
    padding: 14,
  },
  tipIcon: { color: '#1B765E', fontSize: 18, marginRight: 10 },
  tipText: { color: '#42675A', flex: 1, fontSize: 12, lineHeight: 18 },
  label: { color: '#344A42', fontSize: 12, fontWeight: '800', marginBottom: 8, marginTop: 16 },
  input: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DFE8E3',
    borderRadius: 13,
    borderWidth: 1,
    color: '#263B35',
    fontSize: 14,
    minHeight: 51,
    paddingHorizontal: 14,
  },
  durationWrap: { alignItems: 'center', flexDirection: 'row' },
  durationInput: { flex: 1 },
  minutes: { color: '#879792', fontSize: 11, marginLeft: 12 },
  saveButton: {
    alignItems: 'center',
    backgroundColor: '#1B765E',
    borderRadius: 14,
    marginTop: 30,
    paddingVertical: 16,
  },
  pressed: { opacity: 0.78 },
  saveButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  helper: { color: '#A1ACA8', fontSize: 10, marginTop: 12, textAlign: 'center' },
});
