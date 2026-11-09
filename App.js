import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TaskContext = createContext(null);
const STORAGE_KEY = '@ruang-belajar/tasks';
const PROFILE_KEY = '@ruang-belajar/profile-name';

const initialTasks = [
  { id: '1', title: 'Membaca materi algoritma', subject: 'Algoritma', duration: 35, done: false },
  { id: '2', title: 'Mengerjakan latihan integral', subject: 'Matematika', duration: 45, done: false },
  { id: '3', title: 'Merangkum bab ekosistem', subject: 'Biologi', duration: 25, done: true },
];

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(initialTasks);
  const [profileName, setProfileName] = useState('');
  const [isReady, setIsReady] = useState(false);
  const [storageError, setStorageError] = useState(null);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    let active = true;

    const loadTasks = async () => {
      setIsReady(false);
      setStorageError(null);
      try {
        const storedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        const storedProfileName = await AsyncStorage.getItem(PROFILE_KEY);
        if (storedTasks === null) {
          if (active) setTasks(initialTasks);
        } else {
          const parsedTasks = JSON.parse(storedTasks);
          const isValid = Array.isArray(parsedTasks) && parsedTasks.every((task) =>
            task &&
            typeof task.id === 'string' &&
            typeof task.title === 'string' &&
            typeof task.subject === 'string' &&
            Number.isInteger(task.duration) &&
            typeof task.done === 'boolean'
          );
          if (!isValid) throw new Error('Data rencana belajar yang tersimpan tidak valid.');
          if (active) setTasks(parsedTasks);
        }
        if (active) setProfileName(storedProfileName || '');
      } catch (error) {
        if (active) setStorageError(error.message || 'Penyimpanan tidak dapat dibuka.');
      } finally {
        if (active) setIsReady(true);
      }
    };

    loadTasks();
    return () => {
      active = false;
    };
  }, [loadAttempt]);

  useEffect(() => {
    if (!isReady || storageError) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((error) => {
      Alert.alert(
        'Gagal menyimpan data',
        `Perubahan masih tampil, tetapi tidak tersimpan di perangkat. ${error.message}`
      );
    });
  }, [isReady, storageError, tasks]);

  useEffect(() => {
    if (!isReady || storageError) return;

    AsyncStorage.setItem(PROFILE_KEY, profileName).catch((error) => {
      Alert.alert(
        'Gagal menyimpan nama',
        `Nama masih tampil, tetapi tidak tersimpan di perangkat. ${error.message}`
      );
    });
  }, [isReady, profileName, storageError]);

  const addTask = (task) => {
    setTasks((currentTasks) => [
      { ...task, id: `${Date.now()}-${Math.random()}`, done: false },
      ...currentTasks,
    ]);
  };

  const toggleTask = (taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
  };

  const updateTask = (taskId, updates) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) => task.id === taskId ? { ...task, ...updates } : task)
    );
  };

  const deleteTask = (taskId) => {
    setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
  };

  const retryLoading = () => {
    setLoadAttempt((attempt) => attempt + 1);
  };

  const value = useMemo(
    () => ({
      tasks,
      profileName,
      setProfileName,
      addTask,
      updateTask,
      deleteTask,
      toggleTask,
      isReady,
      storageError,
      retryLoading,
    }),
    [tasks, profileName, isReady, storageError]
  );

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTasks() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks harus digunakan di dalam TaskProvider.');
  }
  return context;
}
