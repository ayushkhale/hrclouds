import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Colors from '../../utils/ColorScheme';
import Fonts from '../../utils/Typography';
import logo from '../../../assets/logo.jpg';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const validateFields = () => {
    if (!email || !password) {
      setErrorMsg('Please fill all fields.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Invalid email format.');
      return false;
    }
    return true;
  };

  const handleLogin = async () => {
    setErrorMsg('');
    if (!validateFields()) return;

    setLoading(true);
    try {
      const response = await fetch('https://api.bill365.in/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const status = response.status;
      const result = await response.json();

      if (status === 200) {
        Alert.alert('Login Success', 'Welcome back!', [
          { text: 'Continue', onPress: () => navigation?.navigate?.('Tabs') },
        ]);
      } else if (status === 400) {
        setErrorMsg('Missing email or password.');
      } else if (status === 401) {
        setErrorMsg('Invalid credentials.');
      } else {
        setErrorMsg('Something went wrong. Try again.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
        <View style={styles.tile}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.bill365Text}>Your Ultimate Billing Solution!</Text>
        </View>

        {errorMsg !== '' && <Text style={styles.errorText}>{errorMsg}</Text>}

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputWrapper}>
            <Icon name="mail-outline" size={20} color={Colors.gray} style={styles.icon} />
            <TextInput
              placeholder="Enter Email"
              placeholderTextColor={Colors.darkGray}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Icon name="lock-closed-outline" size={20} color={Colors.gray} style={styles.icon} />
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor={Colors.midgray}
              style={styles.input}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.gray} />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.loginButton, { opacity: email && password ? 1 : 0.5 }]}
          onPress={handleLogin}
          disabled={loading || !(email && password)}
        >
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation?.navigate?.('ForgotPass')} style={styles.forgotContainer}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={styles.agreeText}>
          By logging in, you agree to our{' '}
          <Text style={styles.linkText} onPress={() => Linking.openURL('https://bill365.in/')}>
            Terms of Service
          </Text>{' '}
          &{' '}
          <Text style={styles.linkText} onPress={() => Linking.openURL('https://bill365.in/')}>
            Privacy Policy
          </Text>
          .
        </Text>

        <TouchableOpacity style={styles.loginRedirectButton} onPress={() => navigation?.navigate?.('Register')}>
          <Text style={styles.loginRedirectText}>New here? Create Account</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: '5%',
  },
  logo: {
    width: 180,
    height: 80,
    marginTop: '20%',
    alignSelf: 'center',
  },
  tile: {
    alignItems: 'center',
  },
  bill365Text: {
    fontSize: 14,
    fontWeight: '900',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: '15%',
  },
  inputBlock: { marginBottom: 8 },
  label: { fontSize: 14, color: Colors.primary, marginBottom: 10, fontWeight: 800 },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  icon: { marginRight: 6 },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
    fontFamily: 'Poppins-Bold',
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: Fonts.semiBold,
  },
  forgotContainer: { alignItems: 'flex-end', marginTop: 6 },
  forgotPasswordText: { color: Colors.primary, fontSize: 14, fontFamily: Fonts.medium },
  agreeText: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    marginTop: 40,
    fontFamily: Fonts.regular,
    width: '80%',
    alignSelf: 'center',
  },
  linkText: {
    color: Colors.secondary,
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: Fonts.regular,
  },
  loginRedirectButton: { marginTop: 40, alignItems: 'center' },
  loginRedirectText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
    color: Colors.primary,
    textDecorationLine: 'underline',
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginBottom: 20,
    fontFamily: Fonts.regular,
    textAlign: 'center',
  },
});
