import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView as RNSSafeAreaView } from 'react-native-safe-area-context/lib/commonjs/SafeAreaView';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import Register from './Register';
import Dashboard from './Dashboard';

if (Platform.OS === 'web') {
  try { require('./web/tailwind.css'); } catch (e) { /* built CSS not found yet */ }
}
export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://clinic-backend-s2lx.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        Alert.alert('Success', data.message);
      } else {
        Alert.alert('Error', data.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (showRegister) {
    return <Register onCancel={() => setShowRegister(false)} />;
  }

  if (user) {
    return <Dashboard 
      email={user.email} 
      name={user.name} 
      avatarUri={user.avatar} 
      userId={user.id}
      onLogout={() => setUser(null)} 
    />;
  }

  return (
    <RNSSafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.brandHeader}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoIcon}>🏥</Text>
            </View>
            <Text style={styles.brandTitle}>Clinova</Text>
            <Text style={styles.brandSubtitle}>Your Personal Healthcare App</Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.cardTitle}>Welcome back</Text>
            <Text style={styles.cardSubtitle}>Access your health dashboard</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="patient@email.com"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              autoCapitalize="none"
              style={[styles.input, styles.inputFilled]}
            
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={true}
              style={[styles.input, styles.inputFilled]}
              placeholderTextColor="#9CA3AF"
            />

            <TouchableOpacity onPress={handleLogin} style={[styles.button, loading && styles.buttonDisabled]} activeOpacity={0.9} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
            </TouchableOpacity>

            <View style={styles.row}>
              <TouchableOpacity>
                <Text style={styles.link}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setShowRegister(true)}>
                <Text style={styles.linkSecondary}>Create account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </RNSSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F0F9FF', // Healthcare light blue background
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#0EA5E9', // Sky blue
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  logoIcon: {
    fontSize: 32,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1E293B',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  brandSubtitle: {
    fontSize: 16,
    color: '#64748B',
    fontWeight: '500',
  },
  card: {
    width: '100%',
    maxWidth: 460,
    paddingVertical: 32,
    paddingHorizontal: 24,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    shadowColor: '#1E293B',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 12,
    borderWidth: 1,
    borderColor: 'rgba(241, 245, 249, 0.8)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    textAlign: 'center',
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
  },
  form: {
    width: '100%',
    gap: 16,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    backgroundColor: '#FAFBFC',
    color: '#1E293B',
  },
  inputFilled: {
    backgroundColor: '#FAFBFC',
    borderColor: '#E2E8F0',
    // Focus state handled via state management if needed
  },
  button: {
    width: '100%',
    backgroundColor: '#0EA5E9', // Sky blue
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#0EA5E9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  link: {
    color: '#0EA5E9', // Sky blue
    fontSize: 14,
    fontWeight: '600',
  },
  linkSecondary: {
    color: '#64748B',
    fontSize: 14,
    fontWeight: '500',
  },
});
