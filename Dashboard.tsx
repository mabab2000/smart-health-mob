import React, { useEffect, useState } from 'react';
import { SafeAreaView as RNSSafeAreaView } from 'react-native-safe-area-context/lib/commonjs/SafeAreaView';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Settings from './Settings';
import Profile from './Profile';
import Appointment from './Appointment';

type Props = {
  email: string;
  onLogout: () => void;
  name?: string;
  avatarUri?: string;
  userId?: number;
};

export default function Dashboard({ email, onLogout, name, avatarUri, userId }: Props) {
  const [tab, setTab] = useState<'home' | 'appointments' | 'settings' | 'profile'>('home');
  const [appointmentStats, setAppointmentStats] = useState({ total: 0, today: 0, pending: 0 });
  const displayName = name || (email ? email.split('@')[0] : 'User');
  const avatar = avatarUri || `https://i.pravatar.cc/150?u=${encodeURIComponent(email || 'anon')}`;

  useEffect(() => {
    const fetchAppointmentStats = async () => {
      if (!userId) return;
      try {
        const response = await fetch(`https://clinic-backend-s2lx.onrender.com/api/appointments/patient/${userId}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
          },
        });
        const data = await response.json();
        if (response.ok && Array.isArray(data)) {
          const todayKey = new Date().toISOString().split('T')[0];
          const total = data.length;
          const today = data.filter(item => (item?.date || '').split('T')[0] === todayKey).length;
          const pending = data.filter(item => (item?.status || 'pending') === 'pending').length;
          setAppointmentStats({ total, today, pending });
        }
      } catch (error) {
        // Keep previous stats if request fails.
      }
    };

    fetchAppointmentStats();
  }, [userId]);

  return (
    <RNSSafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {tab === 'home' && (
          <>
            <View style={styles.headerCard}>
              <View style={styles.header}>
                <View style={styles.profileRow}>
                  <TouchableOpacity onPress={() => setTab('profile')}>
                    <Image source={{ uri: avatar }} style={styles.avatar} />
                  </TouchableOpacity>
                  <View style={styles.nameBlock}>
                    <Text style={styles.name}>Welcome back, {displayName}</Text>
                    <Text style={styles.sub}>{email}</Text>
                    <View style={styles.statusBadge}>
                      <View style={styles.statusDot} />
                      <Text style={styles.statusText}>Online</Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.notificationBtn}>
                  <Text style={styles.notificationIcon}>🔔</Text>
                  <View style={styles.notificationBadge}>
                    <Text style={styles.notificationBadgeText}>2</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.statsCard}>
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{appointmentStats.total}</Text>
                <Text style={styles.statLabel}>Total</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{appointmentStats.today}</Text>
                <Text style={styles.statLabel}>Today</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statItem}>
                <Text style={styles.statNumber}>{appointmentStats.pending}</Text>
                <Text style={styles.statLabel}>Pending</Text>
              </View>
            </View>

           

            {/* Quick Actions removed for patient-focused layout */}
          </>
        )}

        <View style={styles.content}>
          {tab === 'home' && (
            <>
              <Text style={styles.sectionTitle}>Upcoming Appointment</Text>
              <View style={styles.appCard}>
                <Text style={styles.appTitle}>Dr. Emily Carter — Teleconsult</Text>
                <Text style={styles.appTime}>Tomorrow • 10:30 AM</Text>
                <Text style={styles.appNote}>Video call — 20 minutes</Text>
              </View>

              

              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Recent messages</Text>
              <View style={styles.messages}>
                <View style={styles.msg}>
                  <Text style={styles.msgTitle}>Lab results ready</Text>
                  <Text style={styles.msgSub}>Your blood work is available — 2h ago</Text>
                </View>
                <View style={styles.msg}>
                  <Text style={styles.msgTitle}>Appointment confirmed</Text>
                  <Text style={styles.msgSub}>Dr. Carter confirmed your slot — yesterday</Text>
                </View>
              </View>
            </>
          )}
          {tab === 'appointments' && <Appointment userId={userId} />}
          {tab === 'settings' && <Settings email={email} onLogout={onLogout} />}
          {tab === 'profile' && <Profile />}
        </View>

        <View style={styles.bottomMenu}>
          <TouchableOpacity style={[styles.tab, tab === 'home' && styles.tabActive]} onPress={() => setTab('home')}>
            
            <Text style={[styles.tabLabel, tab === 'home' && styles.tabLabelActive]}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, tab === 'appointments' && styles.tabActive]} onPress={() => setTab('appointments')}>

            <Text style={[styles.tabLabel, tab === 'appointments' && styles.tabLabelActive]}>Appointments</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, tab === 'settings' && styles.tabActive]} onPress={() => setTab('settings')}>
            
            <Text style={[styles.tabLabel, tab === 'settings' && styles.tabLabelActive]}>Settings</Text>
          </TouchableOpacity>
        </View>
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
    flex: 1, 
    padding: 16 
  },
  headerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center' 
  },
  profileRow: { 
    flexDirection: 'row', 
    alignItems: 'center',
    flex: 1,
  },
  avatar: { 
    width: 60, 
    height: 60, 
    borderRadius: 30, 
    backgroundColor: '#059669', 
    marginRight: 16,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#059669',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  nameBlock: {
    flex: 1,
  },
  name: { 
    fontSize: 20, 
    fontWeight: '700', 
    color: '#1E293B',
    marginBottom: 4,
  },
  sub: { 
    color: '#64748B', 
    fontSize: 14,
    marginBottom: 6,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
    marginRight: 6,
  },
  statusText: {
    color: '#10B981',
    fontSize: 12,
    fontWeight: '600',
  },
  notificationBtn: {
    position: 'relative',
    padding: 8,
  },
  notificationIcon: {
    fontSize: 24,
  },
  notificationBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
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
  statsContainer: {
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 16,
  },
  cardsRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between',
    gap: 12,
  },
  card: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    padding: 20, 
    borderRadius: 16, 
    alignItems: 'center', 
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  pendingCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#F59E0B',
  },
  waitingCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
  },
  completedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#3B82F6',
  },
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardIconText: {
    fontSize: 18,
  },
  cardTitle: { 
    color: '#64748B', 
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  cardCount: { 
    fontSize: 24, 
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: '#94A3B8',
    fontSize: 11,
    fontWeight: '500',
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickActionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '23%',
    minWidth: 70,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  quickActionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionIconText: {
    fontSize: 16,
  },
  quickActionText: {
    color: '#374151',
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  content: { 
    flex: 1,
    paddingBottom: 100, // Space for bottom navigation
  },
  bottomMenu: {
    position: 'absolute',
    left: 5,
    right: 5,
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
    paddingHorizontal: 8,
    paddingVertical: 8,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
  },
  tab: { 
    flex: 1, 
    alignItems: 'center', 
    paddingVertical: 12, 
    borderRadius: 12,
    marginHorizontal: 4,
  },
  tabActive: { 
    backgroundColor: '#059669',
  },
  icon: { 
    fontSize: 20,
    marginBottom: 4,
  },
  iconActive: {
    transform: [{ scale: 1.1 }],
  },
  tabLabel: { 
    fontSize: 11, 
    color: '#64748B',
    fontWeight: '600',
  },
  tabLabelActive: {
    color: '#FFFFFF',
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1E293B', 
    marginBottom: 12 
  },
  appCard: { 
    backgroundColor: '#FFFFFF', 
    padding: 16, 
    borderRadius: 12, 
    shadowColor: '#1E293B', 
    shadowOffset: { width: 0, height: 4 }, 
    shadowOpacity: 0.08, 
    shadowRadius: 8, 
    elevation: 4,
    marginBottom: 16,
  },
  appTitle: { 
    fontSize: 16, 
    fontWeight: '700', 
    color: '#1E293B' 
  },
  appTime: { 
    marginTop: 6, 
    color: '#64748B',
    fontSize: 14,
  },
  appNote: { 
    marginTop: 6, 
    color: '#94A3B8', 
    fontSize: 12 
  },
  messages: { 
    gap: 8,
  },
  msg: { 
    backgroundColor: '#FFFFFF', 
    padding: 16, 
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#059669',
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  msgTitle: { 
    fontWeight: '700', 
    color: '#1E293B',
    fontSize: 14,
  },
  msgSub: { 
    color: '#64748B', 
    marginTop: 4,
    fontSize: 12,
  },
});
