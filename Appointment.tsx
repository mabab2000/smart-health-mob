import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Platform } from 'react-native';
import { SafeAreaView as RNSSafeAreaView } from 'react-native-safe-area-context/lib/commonjs/SafeAreaView';
import Chat from './Chat';
import VideoCall from './VideoCall';
import VoiceCall from './VoiceCall';

type AppointmentItem = {
  id: string;
  title: string;
  datetime: string;
  type: string;
  notes?: string;
};

export default function Appointment() {
  const [appointments, setAppointments] = useState<AppointmentItem[]>([
    { id: '1', title: 'Dr. Emily Carter', datetime: 'Tomorrow • 10:30 AM', type: 'Teleconsult', notes: 'Video call — 20 minutes' },
   
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState('');
  const [datetime, setDatetime] = useState('');
  const [atype, setAtype] = useState('Teleconsult');
  const [notes, setNotes] = useState('');

  const handleAdd = () => {
    if (!title || !datetime) return;
    const item: AppointmentItem = { id: String(Date.now()), title, datetime, type: atype, notes };
    setAppointments(prev => [item, ...prev]);
    setShowAdd(false);
    setTitle(''); setDatetime(''); setAtype('Teleconsult'); setNotes('');
  };
  const [videoTarget, setVideoTarget] = useState<AppointmentItem | null>(null);
  const [voiceTarget, setVoiceTarget] = useState<AppointmentItem | null>(null);
  const [chatTarget, setChatTarget] = useState<AppointmentItem | null>(null);

  const startVideo = (a: AppointmentItem) => setVideoTarget(a);
  const startVoice = (a: AppointmentItem) => setVoiceTarget(a);
  const startChat = (a: AppointmentItem) => setChatTarget(a);

  return (
    <RNSSafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Appointments</Text>
          <Text style={styles.pageSubtitle}>Manage your healthcare consultations</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{appointments.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Today</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>1</Text>
            <Text style={styles.statLabel}>Upcoming</Text>
          </View>
        </View>

        {appointments.map(a => (
          <View key={a.id} style={styles.appCard}>
            <View style={styles.appHeader}>
              <View style={styles.doctorInfo}>
                <View style={styles.doctorAvatar}>
                  <Text style={styles.doctorInitial}>{a.title.split(' ')[1]?.charAt(0) || 'D'}</Text>
                </View>
                <View style={styles.appDetails}>
                  <Text style={styles.appTitle}>{a.title}</Text>
                  <Text style={styles.appTime}>{a.datetime}</Text>
                  <View style={[styles.typeBadge, a.type === 'Teleconsult' ? styles.teleconsultBadge : styles.inPersonBadge]}>
                    <Text style={[styles.typeText, a.type === 'Teleconsult' ? styles.teleconsultText : styles.inPersonText]}>
                      {a.type === 'Teleconsult' ? '📹 Teleconsult' : '🏥 In-person'}
                    </Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity style={styles.moreButton}>
                <Text style={styles.moreIcon}>⋮</Text>
              </TouchableOpacity>
            </View>
            
            {a.notes ? (
              <View style={styles.noteContainer}>
                <Text style={styles.noteLabel}>Notes:</Text>
                <Text style={styles.appNote}>{a.notes}</Text>
              </View>
            ) : null}
            
            <View style={styles.actionRow}>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.primaryAction]} 
                onPress={() => startVideo(a)}
              >
                <Text style={styles.actionIcon}>📹</Text>
                <Text style={styles.actionText}>Video call</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.secondaryAction]} 
                onPress={() => startVoice(a)}
              >
                <Text style={styles.actionIcon}>📞</Text>
                <Text style={styles.actionText}>Voice call</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.actionBtn, styles.tertiaryAction]} 
                onPress={() => startChat(a)}
              >
                <Text style={styles.actionIcon}>💬</Text>
                <Text style={styles.actionText}>Chat</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.addBtn} onPress={() => setShowAdd(true)} activeOpacity={0.9}>
          <Text style={styles.addIcon}>+</Text>
          <Text style={styles.addBtnText}>Schedule Appointment</Text>
        </TouchableOpacity>

        <Modal visible={showAdd} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalCard}>
              <Text style={styles.modalTitle}>New appointment</Text>
              <TextInput placeholder="Doctor / Clinic" value={title} onChangeText={setTitle} style={styles.input} />
              <TextInput placeholder="Date & time" value={datetime} onChangeText={setDatetime} style={styles.input} />
              <TextInput placeholder="Type (Teleconsult/In-person)" value={atype} onChangeText={setAtype} style={styles.input} />
              <TextInput placeholder="Notes" value={notes} onChangeText={setNotes} style={[styles.input, { height: 80 }]} multiline />

              <View style={styles.modalRow}>
                <TouchableOpacity onPress={() => setShowAdd(false)} style={[styles.modalBtn, styles.modalCancel]}>
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAdd} style={[styles.modalBtn, styles.modalSave]}>
                  <Text style={styles.modalSaveText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Chat / Call full-screen flows */}
        <Modal visible={!!chatTarget} animationType="slide">
          {chatTarget ? <Chat name={chatTarget.title} onClose={() => setChatTarget(null)} /> : null}
        </Modal>

        <Modal visible={!!videoTarget} animationType="slide">
          {videoTarget ? <VideoCall name={videoTarget.title} onEnd={() => setVideoTarget(null)} /> : null}
        </Modal>

        <Modal visible={!!voiceTarget} animationType="slide">
          {voiceTarget ? <VoiceCall name={voiceTarget.title} onEnd={() => setVoiceTarget(null)} /> : null}
        </Modal>
      </View>
    </RNSSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { 
    flex: 1, 
    backgroundColor: '#F0F9FF' 
  },
  container: { 
    padding: 16, 
    paddingBottom: 120 
  },
  header: {
    marginBottom: 20,
  },
  pageTitle: { 
    fontSize: 28, 
    fontWeight: '800', 
    color: '#1E293B',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  statsCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    justifyContent: 'space-around',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E2E8F0',
  },
  appCard: { 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    padding: 20, 
    marginBottom: 16,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  appHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  doctorInfo: {
    flexDirection: 'row',
    flex: 1,
  },
  doctorAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  doctorInitial: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  appDetails: {
    flex: 1,
  },
  appTitle: { 
    fontSize: 18, 
    fontWeight: '700', 
    color: '#1E293B',
    marginBottom: 4,
  },
  appTime: { 
    color: '#64748B', 
    fontSize: 14,
    marginBottom: 8,
  },
  typeBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  teleconsultBadge: {
    backgroundColor: '#DBEAFE',
  },
  inPersonBadge: {
    backgroundColor: '#D1FAE5',
  },
  typeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  teleconsultText: {
    color: '#1E40AF',
  },
  inPersonText: {
    color: '#047857',
  },
  moreButton: {
    padding: 4,
  },
  moreIcon: {
    fontSize: 18,
    color: '#9CA3AF',
  },
  noteContainer: {
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  noteLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
    marginBottom: 4,
  },
  appNote: { 
    color: '#374151', 
    fontSize: 14,
    lineHeight: 20,
  },
  actionRow: { 
    flexDirection: 'row', 
    gap: 8,
  },
  actionBtn: { 
    flex: 1, 
    paddingVertical: 12, 
    borderRadius: 10, 
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  primaryAction: { 
    backgroundColor: '#059669',
  },
  secondaryAction: { 
    backgroundColor: '#0F172A',
  },
  tertiaryAction: { 
    backgroundColor: '#3B82F6',
  },
  actionIcon: {
    fontSize: 14,
    marginBottom: 2,
  },
  actionText: { 
    color: '#FFFFFF', 
    fontWeight: '600',
    fontSize: 12,
  },
  addBtn: { 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#059669', 
    paddingVertical: 16, 
    borderRadius: 12,
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  addIcon: {
    fontSize: 18,
    color: '#FFFFFF',
    marginRight: 8,
    fontWeight: '700',
  },
  addBtnText: { 
    color: '#FFFFFF', 
    fontWeight: '700',
    fontSize: 16,
  },
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0,0,0,0.5)' 
  },
  modalCard: { 
    width: '92%', 
    backgroundColor: '#FFFFFF', 
    borderRadius: 16, 
    padding: 24 
  },
  modalTitle: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1E293B',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: { 
    borderWidth: 2, 
    borderColor: '#E2E8F0', 
    borderRadius: 8, 
    paddingHorizontal: 12, 
    paddingVertical: Platform.OS === 'ios' ? 12 : 10, 
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#FAFBFC',
  },
  modalRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 20,
    gap: 12,
  },
  modalBtn: { 
    flex: 1, 
    paddingVertical: 14, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  modalCancel: { 
    backgroundColor: '#F1F5F9',
  },
  modalSave: { 
    backgroundColor: '#059669',
  },
  modalCancelText: { 
    color: '#64748B',
    fontWeight: '600',
  },
  modalSaveText: { 
    color: '#FFFFFF', 
    fontWeight: '700' 
  },
});
