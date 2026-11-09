import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileModal({ visible, initialName, onClose, onSave }) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    if (visible) setName(initialName);
  }, [initialName, visible]);

  const save = () => {
    onSave(name.trim());
  };

  return (
    <Modal
      animationType="fade"
      onRequestClose={onClose}
      transparent
      visible={visible}
    >
      <SafeAreaView edges={['top', 'bottom']} style={styles.overlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.avoidingView}
        >
          <View style={styles.card}>
            <View style={styles.avatarPreview}>
              <Text style={styles.avatarInitial}>
                {name.trim() ? name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase() : 'S'}
              </Text>
            </View>
            <Text style={styles.title}>Siapa nama kamu?</Text>
            <Text style={styles.description}>
              Nama dan inisial ini hanya disimpan di perangkat yang sedang digunakan.
            </Text>
            <TextInput
              accessibilityLabel="Nama profil"
              autoCapitalize="words"
              maxLength={40}
              onChangeText={setName}
              onSubmitEditing={save}
              placeholder="Masukkan nama"
              placeholderTextColor="#A1ACA8"
              returnKeyType="done"
              style={styles.input}
              value={name}
            />
            <Pressable
              accessibilityRole="button"
              onPress={save}
              style={({ pressed }) => [styles.saveButton, pressed && styles.pressed]}
            >
              <Text style={styles.saveText}>Simpan nama</Text>
            </Pressable>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Nanti saja</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { backgroundColor: 'rgba(20, 38, 32, 0.48)', flex: 1, justifyContent: 'center', padding: 22 },
  avoidingView: { justifyContent: 'center' },
  card: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 22, padding: 22 },
  avatarPreview: { alignItems: 'center', backgroundColor: '#DDEFE7', borderRadius: 27, height: 54, justifyContent: 'center', marginBottom: 14, width: 54 },
  avatarInitial: { color: '#1B765E', fontSize: 18, fontWeight: '800' },
  title: { color: '#172B27', fontSize: 20, fontWeight: '800', textAlign: 'center' },
  description: { color: '#71817C', fontSize: 12, lineHeight: 18, marginBottom: 17, marginTop: 7, textAlign: 'center' },
  input: { backgroundColor: '#F8FAF9', borderColor: '#DFE8E3', borderRadius: 13, borderWidth: 1, color: '#263B35', fontSize: 14, minHeight: 50, paddingHorizontal: 14, width: '100%' },
  saveButton: { alignItems: 'center', backgroundColor: '#1B765E', borderRadius: 13, marginTop: 16, paddingVertical: 14, width: '100%' },
  pressed: { opacity: 0.75 },
  saveText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
  cancelButton: { padding: 12 },
  cancelText: { color: '#71817C', fontSize: 12, fontWeight: '700' },
});
