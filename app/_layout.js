import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TaskProvider, useTasks } from '../App';

const green = '#1B765E';

function RouterShell() {
  const { isReady, storageError, retryLoading } = useTasks();

  if (!isReady || storageError) {
    return (
      <View style={styles.stateScreen}>
        {storageError ? (
          <>
            <Text style={styles.errorTitle}>Data belajar belum dapat dibuka</Text>
            <Text style={styles.errorText}>{storageError}</Text>
            <Pressable onPress={retryLoading} style={styles.retryButton}>
              <Text style={styles.retryText}>Coba lagi</Text>
            </Pressable>
          </>
        ) : (
          <>
            <ActivityIndicator color={green} size="large" />
            <Text style={styles.loadingText}>Memuat rencana belajar...</Text>
          </>
        )}
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: green,
          tabBarInactiveTintColor: '#94A3A1',
          tabBarLabelStyle: { fontSize: 11, fontWeight: '700', marginTop: 2 },
          tabBarStyle: {
            height: 66,
            paddingTop: 7,
            paddingBottom: 8,
            borderTopColor: '#E8EEEB',
            backgroundColor: '#FFFFFF',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Beranda',
            tabBarIcon: ({ focused }) => (
              <Text style={{ color: focused ? green : '#94A3A1', fontSize: 18 }}>⌂</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="new-task"
          options={{
            title: 'Tambah',
            tabBarIcon: ({ focused }) => (
              <Text style={{ color: focused ? green : '#94A3A1', fontSize: 20 }}>＋</Text>
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progres',
            tabBarIcon: ({ focused }) => (
              <Text style={{ color: focused ? green : '#94A3A1', fontSize: 17 }}>▥</Text>
            ),
          }}
        />
      </Tabs>
    </>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <RouterShell />
      </TaskProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  stateScreen: {
    alignItems: 'center',
    backgroundColor: '#F5F8F6',
    flex: 1,
    justifyContent: 'center',
    padding: 28,
  },
  loadingText: { color: '#71817C', fontSize: 13, marginTop: 14 },
  errorTitle: { color: '#172B27', fontSize: 18, fontWeight: '800', textAlign: 'center' },
  errorText: { color: '#71817C', fontSize: 13, lineHeight: 20, marginTop: 10, textAlign: 'center' },
  retryButton: { backgroundColor: green, borderRadius: 12, marginTop: 20, paddingHorizontal: 22, paddingVertical: 12 },
  retryText: { color: '#FFFFFF', fontSize: 13, fontWeight: '800' },
});
