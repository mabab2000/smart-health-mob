import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView as RNSSafeAreaView } from 'react-native-safe-area-context/lib/commonjs/SafeAreaView';

export default function VideoCall({ name, onEnd }: { name?: string; onEnd: () => void }) {
  const [seconds, setSeconds] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    timer.current = setInterval(() => setSeconds(s => s + 1), 1000) as any;
    return () => { if (timer.current) clearInterval(timer.current as any); };
  }, []);

  const fmt = (s: number) => `${Math.floor(s/60).toString().padStart(2,'0')}:${(s%60).toString().padStart(2,'0')}`;

  return (
    <RNSSafeAreaView style={styles.safe}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.title}>Video Consultation</Text>
          <Text style={styles.subtitle}>Dr. {name || 'Smith'}</Text>
        </View>
        <View style={styles.timerContainer}>
          <View style={styles.recordingIndicator} />
          <Text style={styles.timer}>{fmt(seconds)}</Text>
        </View>
      </View>

      <View style={styles.videoArea}>
        <View style={styles.remote}>
          <View style={styles.remoteVideoPlaceholder}>
            <View style={styles.doctorAvatar}>
              <Text style={styles.doctorInitial}>{name?.charAt(0) || 'D'}</Text>
            </View>
            <Text style={styles.doctorName}>Dr. {name || 'Smith'}</Text>
            <Text style={styles.specialization}>General Physician</Text>
            <Text style={styles.connectionStatus}>✅ Connected</Text>
          </View>
        </View>
        
        <View style={styles.local}>
          <View style={styles.localVideoPlaceholder}>
            <Text style={styles.localText}>You</Text>
          </View>
          <TouchableOpacity style={styles.flipCamera}>
            <Text style={styles.flipIcon}>🔄</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.controlButton}>
          <View style={[styles.controlIcon, { backgroundColor: '#64748B' }]}>
            <Text style={styles.iconText}>🎤</Text>
          </View>
          <Text style={styles.controlLabel}>Mute</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.endCallButton} onPress={onEnd}>
          <View style={styles.endCallIcon}>
            <Text style={styles.endCallIconText}>📞</Text>
          </View>
          <Text style={styles.endCallLabel}>End Call</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.controlButton}>
          <View style={[styles.controlIcon, { backgroundColor: '#059669' }]}>
            <Text style={styles.iconText}>📹</Text>
          </View>
          <Text style={styles.controlLabel}>Camera</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>💬</Text>
          <Text style={styles.actionText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📋</Text>
          <Text style={styles.actionText}>Notes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionIcon}>📄</Text>
          <Text style={styles.actionText}>Reports</Text>
        </TouchableOpacity>
      </View>
    </RNSSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { 
    flex: 1, 
    backgroundColor: '#0F172A' 
  },
  header: { 
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20, 
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  headerContent: {
    flex: 1,
  },
  title: { 
    color: '#FFFFFF', 
    fontWeight: '700',
    fontSize: 18,
    marginBottom: 2,
  },
  subtitle: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '500',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  recordingIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#EF4444',
    marginRight: 8,
  },
  timer: { 
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  videoArea: { 
    flex: 1, 
    position: 'relative',
  },
  remote: { 
    flex: 1,
    backgroundColor: '#1E293B',
    justifyContent: 'center', 
    alignItems: 'center',
  },
  remoteVideoPlaceholder: {
    alignItems: 'center',
  },
  doctorAvatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  doctorInitial: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  doctorName: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  specialization: {
    color: '#CBD5E1',
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 8,
  },
  connectionStatus: {
    color: '#10B981',
    fontSize: 14,
    fontWeight: '500',
  },
  local: { 
    position: 'absolute', 
    top: 20,
    right: 20, 
    width: 120, 
    height: 160, 
    backgroundColor: '#374151', 
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  localVideoPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  flipCamera: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 24,
    height: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flipIcon: {
    fontSize: 12,
  },
  controls: { 
    flexDirection: 'row', 
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40, 
    paddingVertical: 20,
    gap: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  controlButton: {
    alignItems: 'center',
  },
  controlIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  iconText: {
    fontSize: 20,
  },
  controlLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  endCallButton: {
    alignItems: 'center',
  },
  endCallIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EF4444',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  endCallIconText: {
    fontSize: 24,
    transform: [{ rotate: '135deg' }],
  },
  endCallLabel: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    paddingVertical: 16,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    fontSize: 16,
    marginBottom: 4,
  },
  actionText: {
    color: '#CBD5E1',
    fontSize: 10,
    fontWeight: '500',
  },
});
