import React, { useState } from 'react';
import { SafeAreaView as RNSSafeAreaView } from 'react-native-safe-area-context/lib/commonjs/SafeAreaView';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { apiService, RegisterRequest } from './services/api';

type Props = {
  onCancel: () => void;
};

export default function Register({ onCancel }: Props) {
  const [fullName, setFullName] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!fullName || !email || !password || !confirmPassword) {
      Alert.alert('Missing fields', 'Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const userData: RegisterRequest = { 
        email, 
        password, 
        name: fullName,
        phone: phone || undefined 
      };
      await apiService.register(userData);
      
      Alert.alert('Success', 'Account created successfully!', [
        { text: 'OK', onPress: onCancel }
      ]);
    } catch (error) {
      Alert.alert('Registration Failed', 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RNSSafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Create account</Text>

          <View style={styles.form}>
            <Text style={styles.label}>Full name</Text>
            <TextInput value={fullName} onChangeText={setFullName} placeholder="First Last" style={[styles.input, styles.inputFilled]} placeholderTextColor="#9CA3AF" />

            <Text style={styles.label}>Gender</Text>
            <View style={[styles.input, styles.inputFilled, styles.pickerWrapper]}>
              <Picker selectedValue={gender} onValueChange={(val) => setGender(String(val))} mode="dropdown" style={styles.picker}>
                <Picker.Item label="Select gender" value="" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Non-binary" value="nonbinary" />
                <Picker.Item label="Prefer not to say" value="prefer_not" />
              </Picker>
            </View>

            <Text style={styles.label}>Phone</Text>
            <TextInput value={phone} onChangeText={setPhone} placeholder="+1 555 555 5555" keyboardType="phone-pad" style={[styles.input, styles.inputFilled]} placeholderTextColor="#9CA3AF" />

            <Text style={styles.label}>Email</Text>
            <TextInput value={email} onChangeText={setEmail} placeholder="you@company.com" keyboardType="email-address" autoCapitalize="none" style={[styles.input, styles.inputFilled]} placeholderTextColor="#9CA3AF" />

            <Text style={styles.label}>Password</Text>
            <TextInput value={password} onChangeText={setPassword} placeholder="Create a password" secureTextEntry style={[styles.input, styles.inputFilled]} placeholderTextColor="#9CA3AF" />

            <Text style={styles.label}>Confirm password</Text>
            <TextInput value={confirmPassword} onChangeText={setConfirmPassword} placeholder="Repeat password" secureTextEntry style={[styles.input, styles.inputFilled]} placeholderTextColor="#9CA3AF" />

            <TouchableOpacity onPress={handleRegister} style={[styles.button, loading && styles.buttonDisabled]} activeOpacity={0.9} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Creating Account...' : 'Register'}</Text>
            </TouchableOpacity>

            <View style={styles.row}>
              <TouchableOpacity onPress={onCancel}>
                <Text style={styles.linkSecondary}>Back to sign in</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        </KeyboardAvoidingView>
      </RNSSafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical:6,
    marginBottom: 16,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    backgroundColor: '#ffffff',
  },
  card: {
    width: '100%',
    maxWidth: 460,
    paddingVertical: 22,
    paddingHorizontal: 20,
    alignItems: 'stretch',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  form: { width: '100%', marginTop: 6 },
  safeArea: { flex: 1, backgroundColor: '#F3F4F6' },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#111827', textAlign: 'center' },
  label: { color: '#374151', fontSize: 13, marginBottom: 6, marginTop: 8 },
  inputFilled: { backgroundColor: '#F9FAFB', borderWidth: 0, paddingHorizontal: 14, paddingVertical: 12 },
  pickerWrapper: {
    paddingHorizontal: 2,
    paddingVertical: 0,
  },
  picker: {
    width: '100%'
  },
  button: { width: '100%', backgroundColor: '#2563EB', borderRadius: 8, paddingVertical: 12, alignItems: 'center', marginTop: 4 },
  buttonText: { color: '#FFFFFF', fontWeight: '600' },
  row: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 12 },
  buttonDisabled: {
    opacity: 0.6,
  },
});
