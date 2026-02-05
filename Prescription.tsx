import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

export default function Prescription() {
  const latest = {
    date: '2026-01-29',
    summary: 'Headache, nausea, mild fever',
    assessment: 'Likely viral — rest, hydration, symptomatic care',
    recommendations: [
      'Paracetamol 500mg as needed',
      'Drink fluids and rest',
      'Follow-up in 3 days if symptoms persist',
    ],
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrapper}>
        <Text style={styles.pageTitle}>Prescription</Text>
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Health Insight</Text>
            <Text style={styles.cardDate}>{latest.date}</Text>
          </View>

          <Text style={styles.sectionLabel}>Reported</Text>
          <Text style={styles.sectionText}>{latest.summary}</Text>

          <Text style={[styles.sectionLabel, { marginTop: 12 }]}>Assessment</Text>
          <Text style={styles.sectionText}>{latest.assessment}</Text>

          <Text style={[styles.sectionLabel, { marginTop: 12 }]}>Recommendations</Text>
          {latest.recommendations.map((r, i) => (
            <Text key={i} style={styles.bullet}>• {r}</Text>
          ))}

          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.actionPrimary}>
              <Text style={styles.actionPrimaryText}>View history</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionGhost}>
              <Text style={styles.actionGhostText}>Share report</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#F0F9FF' },
  wrapper: { flex: 1, padding: 16, justifyContent: 'flex-start', alignItems: 'stretch' },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  cardTitle: { fontSize: 20, fontWeight: '800', color: '#1E293B' },
  cardDate: { fontSize: 13, color: '#64748B' },
  sectionLabel: { fontSize: 14, fontWeight: '700', color: '#1E293B', marginTop: 6 },
  sectionText: { fontSize: 15, color: '#374151', marginTop: 6, lineHeight: 20 },
  bullet: { fontSize: 14, color: '#374151', marginTop: 6, marginLeft: 6 },
  actionsRow: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16, gap: 12 },
  actionPrimary: { backgroundColor: '#059669', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12 },
  actionPrimaryText: { color: '#fff', fontWeight: '700' },
  actionGhost: { borderWidth: 1, borderColor: '#E2E8F0', paddingVertical: 12, paddingHorizontal: 16, borderRadius: 12, marginLeft: 8 },
  actionGhostText: { color: '#374151', fontWeight: '600' },
  pageTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#1E293B',
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
});
