import React, { useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EditTaskModal({ task, onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    setTitle(task?.title || '');
    setSubject(task?.subject || '');
    setDuration(task ? String(task.duration) : '');
  }, [task]);

  const save = () => {
    const cleanTitle = title.trim();
    const cleanSubject = subject.trim();
    const minutes = Number(duration);

    if (!cleanTitle || !cleanSubject) {
      Alert.alert('Data belum lengkap', 'Isi nama tugas dan mata pelajaran terlebih dahulu.');
      return;
    }
    if (!Number.isInteger(minutes) || minutes < 5 || minutes > 240) {
      Alert.alert('Durasi tidak valid', 'Masukkan durasi antara 5 sampai 240 menit.');
      return;
    }

    onSave(task.id, { title: cleanTitle, subject: cleanSubject, duration: minutes });
  };

  return (
    <Modal
      animationType="slide"
      onRequestClose={onClose}
      transparent={false}
      visible={Boolean(task)}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.flex}
        >
          <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
            <View style={styles.header}>
              <View style={styles.headerCopy}>
                <Text style={styles.eyebrow}>UBAH RENCANA</Text>
                <Text style={styles.title}>Edit tugas belajar</Text>
              </View>
              <Pressable
                accessibilityRole="button"
                accessibilityLabel="Tutup edit"
                onPress={onClose}
                style={styles.closeButton}
              >
                <Text style={styles.closeText}>×</Text>
              </Pressable>
            </View>

            <Text style={styles.description}>Sesuaikan tugas, mata pelajaran, atau durasinya.</Text>
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
              placeholder="Contoh: Sejarah atau Kalkulus"
              placeholderTextColor="#A1ACA8"
              style={styles.input}
              value={subject}
              returnKeyType="next"
            />

            <Text style={styles.label}>Durasi belajar (menit)</Text>
            <TextInput
              accessibilityLabel="Durasi belajar dalam menit"
              keyboardType="number-pad"
              maxLength={3}
              onChangeText={setDuration}
              placeholder="30"
              placeholderTextColor="#A1ACA8"
              style={styles.input}
              value={duration}
            />

            <Pressable
              accessibilityRole="button"
              onPress={save}
              style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
            >
              <Text style={styles.saveButtonText}>Simpan perubahan</Text>
            </Pressable>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Batal</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F5F8F6', flex: 1 },
  flex: { flex: 1 },
  content: { padding: 22, paddingBottom: 30 },
  header: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  headerCopy: { flex: 1 },
  eyebrow: { color: '#1B765E', fontSize: 10, fontWeight: '800', letterSpacing: 1.4 },
  title: { color: '#172B27', fontSize: 25, fontWeight: '800', marginTop: 6 },
  closeButton: { alignItems: 'center', backgroundColor: '#E7F3ED', borderRadius: 18, height: 36, justifyContent: 'center', width: 36 },
  closeText: { color: '#1B765E', fontSize: 25, lineHeight: 28 },
  description: { color: '#71817C', fontSize: 13, lineHeight: 19, marginBottom: 15, marginTop: 10 },
  label: { color: '#344A42', fontSize: 12, fontWeight: '800', marginBottom: 8, marginTop: 16 },
  input: { backgroundColor: '#FFFFFF', borderColor: '#DFE8E3', borderRadius: 13, borderWidth: 1, color: '#263B35', fontSize: 14, minHeight: 51, paddingHorizontal: 14 },
  saveButton: { alignItems: 'center', backgroundColor: '#1B765E', borderRadius: 14, marginTop: 28, paddingVertical: 16 },
  pressed: { opacity: 0.75 },
  saveButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  cancelButton: { alignItems: 'center', paddingVertical: 14 },
  cancelText: { color: '#71817C', fontSize: 13, fontWeight: '700' },
});
