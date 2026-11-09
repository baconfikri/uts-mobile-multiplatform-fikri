import React, { useMemo } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTasks } from '../App';
import ProgressBar from '../components/ProgressBar';
import ScreenTitle from '../components/ScreenTitle';
import StatCard from '../components/StatCard';

export default function ProgressScreen() {
  const { tasks } = useTasks();
  const completed = tasks.filter((task) => task.done);
  const totalMinutes = tasks.reduce((sum, task) => sum + task.duration, 0);
  const completedMinutes = completed.reduce((sum, task) => sum + task.duration, 0);
  const ratio = tasks.length ? completed.length / tasks.length : 0;
  const subjects = useMemo(() => {
    const grouped = tasks.reduce((result, task) => {
      if (!result[task.subject]) result[task.subject] = { total: 0, completed: 0 };
      result[task.subject].total += 1;
      if (task.done) result[task.subject].completed += 1;
      return result;
    }, {});
    return Object.entries(grouped).sort((a, b) => a[0].localeCompare(b[0], 'id'));
  }, [tasks]);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenTitle
          eyebrow="Perjalananmu"
          title="Lihat progres belajar"
          description="Setiap tugas yang selesai adalah langkah maju."
        />

        <View style={styles.overviewCard}>
          <View style={styles.overviewHeader}>
            <View>
              <Text style={styles.overviewLabel}>TINGKAT PENYELESAIAN</Text>
              <Text style={styles.percentage}>{Math.round(ratio * 100)}%</Text>
            </View>
            <View style={styles.circle}>
              <Text style={styles.circleMark}>✓</Text>
            </View>
          </View>
          <ProgressBar progress={ratio} color="#A8E3C5" />
          <Text style={styles.overviewCaption}>
            {completed.length} dari {tasks.length} tugas sudah kamu tuntaskan
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard label="Waktu fokus" value={`${completedMinutes}`} caption="menit selesai" />
          <View style={styles.spacer} />
          <StatCard label="Sisa rencana" value={`${totalMinutes - completedMinutes}`} caption="menit belajar" color="#E5A94F" />
        </View>

        <Text style={styles.sectionTitle}>Progres per mata pelajaran</Text>
        {subjects.length ? subjects.map(([subject, counts]) => (
          <View key={subject} style={styles.subjectCard}>
            <View style={styles.subjectHeader}>
              <Text style={styles.subjectName}>{subject}</Text>
              <Text style={styles.subjectCount}>{counts.completed}/{counts.total} tugas</Text>
            </View>
            <ProgressBar
              progress={counts.total ? counts.completed / counts.total : 0}
              color="#1B765E"
            />
          </View>
        )) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Belum ada data belajar</Text>
            <Text style={styles.emptyText}>Tambahkan rencana belajar dan progresnya akan tampil di sini.</Text>
          </View>
        )}

        <View style={styles.encouragement}>
          <Text style={styles.encouragementTitle}>Konsistensi lebih penting dari kecepatan.</Text>
          <Text style={styles.encouragementText}>Ambil jeda saat dibutuhkan, lalu lanjutkan satu langkah lagi.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#F5F8F6', flex: 1 },
  content: { padding: 22, paddingBottom: 30 },
  overviewCard: { backgroundColor: '#1B765E', borderRadius: 22, marginBottom: 14, padding: 20 },
  overviewHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 18 },
  overviewLabel: { color: '#C9E6D9', fontSize: 9, fontWeight: '800', letterSpacing: 1.1 },
  percentage: { color: '#FFFFFF', fontSize: 38, fontWeight: '800', marginTop: 6 },
  circle: { alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 23, height: 46, justifyContent: 'center', width: 46 },
  circleMark: { color: '#A8E3C5', fontSize: 24, fontWeight: '800' },
  overviewCaption: { color: '#C9E6D9', fontSize: 11, marginTop: 12 },
  statsRow: { flexDirection: 'row', marginBottom: 27 },
  spacer: { width: 10 },
  sectionTitle: { color: '#172B27', fontSize: 17, fontWeight: '800', marginBottom: 13 },
  subjectCard: { backgroundColor: '#FFFFFF', borderColor: '#E8EEEB', borderRadius: 16, borderWidth: 1, marginBottom: 10, padding: 15 },
  subjectHeader: { alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  subjectName: { color: '#263B35', fontSize: 13, fontWeight: '700' },
  subjectCount: { color: '#879792', fontSize: 10 },
  emptyState: { backgroundColor: '#FFFFFF', borderColor: '#E8EEEB', borderRadius: 16, borderWidth: 1, padding: 20 },
  emptyTitle: { color: '#263B35', fontSize: 14, fontWeight: '700' },
  emptyText: { color: '#879792', fontSize: 12, lineHeight: 18, marginTop: 6 },
  encouragement: { backgroundColor: '#E7F3ED', borderRadius: 16, marginTop: 14, padding: 16 },
  encouragementTitle: { color: '#255C4A', fontSize: 13, fontWeight: '800' },
  encouragementText: { color: '#628072', fontSize: 11, lineHeight: 17, marginTop: 6 },
});
