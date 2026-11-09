import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '../App';
import ProgressBar from '../components/ProgressBar';
import EditTaskModal from '../components/EditTaskModal';
import ProfileModal from '../components/ProfileModal';
import ScreenTitle from '../components/ScreenTitle';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';

const filters = [
  { key: 'all', label: 'Semua' },
  { key: 'pending', label: 'Belum selesai' },
  { key: 'done', label: 'Selesai' },
];

export default function HomeScreen() {
  const { tasks, toggleTask, updateTask, deleteTask, profileName, setProfileName } = useTasks();
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const completedCount = tasks.filter((task) => task.done).length;
  const completion = tasks.length ? completedCount / tasks.length : 0;
  const filteredTasks = useMemo(
    () => tasks.filter((task) => (
      filter === 'all' || (filter === 'done' ? task.done : !task.done)
    )),
    [filter, tasks]
  );
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  const confirmDelete = (task) => {
    Alert.alert(
      'Hapus rencana belajar?',
      `“${task.title}” akan dihapus dari daftar.`,
      [
        { text: 'Batal', style: 'cancel' },
        { text: 'Hapus', style: 'destructive', onPress: () => deleteTask(task.id) },
      ]
    );
  };

  const initials = profileName
    ? profileName.trim().split(/\s+/).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
    : 'S';

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.topline}>
          <View>
            <Text style={styles.greeting}>RUANG BELAJAR</Text>
            <Text style={styles.date}>{profileName ? `Halo, ${profileName} · ` : ''}{today}</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Atur nama profil"
            onPress={() => setProfileModalVisible(true)}
            style={({ pressed }) => [styles.avatar, pressed && styles.avatarPressed]}
          >
            <Text style={styles.avatarText}>{initials}</Text>
          </Pressable>
        </View>

        <ScreenTitle
          title={profileName ? `Hai, ${profileName}!` : 'Hai, pejuang ilmu!'}
          description="Sedikit demi sedikit, target belajarmu tercapai."
        />

        <View style={styles.focusCard}>
          <View style={styles.focusTopline}>
            <View style={styles.focusBadge}><Text style={styles.focusBadgeText}>TARGET HARI INI</Text></View>
            <Text style={styles.focusIcon}>✦</Text>
          </View>
          <Text style={styles.focusTitle}>Terus jaga ritmemu.</Text>
          <Text style={styles.focusDescription}>
            {completedCount} dari {tasks.length} tugas sudah selesai. Kamu pasti bisa!
          </Text>
          <ProgressBar progress={completion} color="#A8E3C5" />
        </View>

        <View style={styles.statsRow}>
          <StatCard label="Tugas" value={tasks.length} caption="di daftar belajar" />
          <View style={styles.statSpacer} />
          <StatCard
            label="Selesai"
            value={completedCount}
            caption="terus bertambah"
            color="#E5A94F"
          />
          <View style={styles.statSpacer} />
          <StatCard
            label="Fokus"
            value={`${tasks.filter((task) => task.done).reduce((sum, task) => sum + task.duration, 0)}`}
            caption="menit tercatat"
            color="#7796D3"
          />
        </View>

        <View style={styles.sectionHeading}>
          <View>
            <Text style={styles.sectionTitle}>Daftar belajarmu</Text>
            <Text style={styles.sectionSubtitle}>Tekan tugas untuk mengubah statusnya.</Text>
          </View>
        </View>

        <View style={styles.filters}>
          {filters.map((item) => {
            const selected = filter === item.key;
            return (
              <Pressable
                key={item.key}
                onPress={() => setFilter(item.key)}
                style={[styles.filterButton, selected && styles.selectedFilter]}
              >
                <Text style={[styles.filterText, selected && styles.selectedFilterText]}>
                  {item.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {filteredTasks.length ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={() => toggleTask(task.id)}
              onEdit={() => setEditingTask(task)}
              onDelete={() => confirmDelete(task)}
            />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Belum ada tugas di sini</Text>
            <Text style={styles.emptyText}>Tambahkan tugas baru agar rencana belajarmu makin teratur.</Text>
          </View>
        )}
        <Text style={styles.footer}>Belajar dengan tenang, bertumbuh dengan konsisten.</Text>
      </ScrollView>
      <EditTaskModal
        task={editingTask}
        onClose={() => setEditingTask(null)}
        onSave={(taskId, changes) => {
          updateTask(taskId, changes);
          setEditingTask(null);
        }}
      />
      <ProfileModal
        visible={profileModalVisible}
        initialName={profileName}
        onClose={() => setProfileModalVisible(false)}
        onSave={(name) => {
          setProfileName(name);
          setProfileModalVisible(false);
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F5F8F6', flex: 1 },
  content: { padding: 20, paddingBottom: 30 },
  topline: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  greeting: { color: '#1B765E', fontSize: 10, fontWeight: '800', letterSpacing: 1.5 },
  date: { color: '#879792', fontSize: 12, marginTop: 5, textTransform: 'capitalize' },
  avatar: { alignItems: 'center', backgroundColor: '#DDEFE7', borderRadius: 19, height: 40, justifyContent: 'center', width: 40 },
  avatarPressed: { opacity: 0.7 },
  avatarText: { color: '#1B765E', fontSize: 16, fontWeight: '800' },
  focusCard: { backgroundColor: '#1B765E', borderRadius: 22, marginBottom: 14, padding: 20 },
  focusTopline: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' },
  focusBadge: { backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 7, paddingHorizontal: 9, paddingVertical: 6 },
  focusBadgeText: { color: '#D8F4E6', fontSize: 9, fontWeight: '800', letterSpacing: 1 },
  focusIcon: { color: '#A8E3C5', fontSize: 22 },
  focusTitle: { color: '#FFFFFF', fontSize: 21, fontWeight: '800', marginTop: 17 },
  focusDescription: { color: '#C9E6D9', fontSize: 12, marginBottom: 18, marginTop: 7 },
  statsRow: { flexDirection: 'row', marginBottom: 26 },
  statSpacer: { width: 9 },
  sectionHeading: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 13 },
  sectionTitle: { color: '#172B27', fontSize: 18, fontWeight: '800' },
  sectionSubtitle: { color: '#879792', fontSize: 11, marginTop: 4 },
  filters: { flexDirection: 'row', marginBottom: 13 },
  filterButton: { backgroundColor: '#EBF0ED', borderRadius: 20, marginRight: 7, paddingHorizontal: 12, paddingVertical: 8 },
  selectedFilter: { backgroundColor: '#DDEFE7' },
  filterText: { color: '#778780', fontSize: 10, fontWeight: '700' },
  selectedFilterText: { color: '#1B765E' },
  emptyState: { alignItems: 'center', backgroundColor: '#FFFFFF', borderColor: '#E8EEEB', borderRadius: 16, borderWidth: 1, padding: 22 },
  emptyTitle: { color: '#263B35', fontSize: 14, fontWeight: '700' },
  emptyText: { color: '#879792', fontSize: 12, lineHeight: 18, marginTop: 7, textAlign: 'center' },
  footer: { color: '#A1ACA8', fontSize: 10, marginTop: 17, textAlign: 'center' },
});
