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

export default function SignUpScreen({ navigation }) {
  const [isAlternateWay, setIsAlternateWay] = useState(false);

  const [form, setForm] = useState({
    username: '',
    email: '',
    mobileNo: '',
    password: '',
    confirmPassword: '',
  });

  const [mobileOnly, setMobileOnly] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const validateFullForm = () => {
    const { username, email, password, confirmPassword, mobileNo } = form;

    if (!username || !email || !password || !confirmPassword || !mobileNo) {
      setErrorMsg('Please fill all fields.');
      return false;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setErrorMsg('Invalid email format.');
      return false;
    }

    if (mobileNo.length !== 10 || !/^\d+$/.test(mobileNo)) {
      setErrorMsg('Enter a valid 10-digit mobile number.');
      return false;
    }

    if (password.length < 6) {
      setErrorMsg('Password should be at least 6 characters.');
      return false;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords don't match.");
      return false;
    }

    return true;
  };

  const handleSignup = async () => {
    setErrorMsg('');
    if (!validateFullForm()) return;

    setLoading(true);
    try {
      const response = await fetch('https://api.bill365.in/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const status = response.status;
      if (status === 201) {
        Alert.alert('Success', 'Account created successfully.', [
          { text: 'Login Now', onPress: () => navigation?.navigate?.('Login') },
        ]);
      } else if (status === 400) {
        setErrorMsg('Missing or invalid fields.');
      } else if (status === 409) {
        setErrorMsg('Email or mobile number already exists.');
      } else {
        setErrorMsg('Something went wrong.');
      }
    } catch (err) {
      setErrorMsg('Failed to connect to server.');
    } finally {
      setLoading(false);
    }
  };


  const handleSendOtp = async () => {
    setErrorMsg('');
    if (!mobileOnly || mobileOnly.length !== 10 || !/^\d+$/.test(mobileOnly)) {
      setErrorMsg('Enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.bill365.in/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: mobileOnly }),
      });

      const status = response.status;
      if (status === 200) {
        navigation.navigate('RegisterOTP', { phone: mobileOnly });
      } else if (status === 409) {
        setErrorMsg('Mobile number already registered.');
      } else {
        setErrorMsg('Failed to send OTP. Try again Later.');
      }
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingVertical: 10 }} showsVerticalScrollIndicator={false}>
        <View style={styles.tile}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.bill365Text}> Your Ultimate Billing Solution! </Text>
        </View>

        {errorMsg !== '' && <Text style={styles.errorText}>{errorMsg}</Text>}

        {!isAlternateWay ? (
          <>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <Icon name="call-outline" size={20} color={Colors.gray} style={styles.icon} />
                <TextInput
                  placeholder="Enter mobile number"
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={10}
                  value={mobileOnly}
                  onChangeText={setMobileOnly}
                  placeholderTextColor={Colors.darkGray}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, { opacity: loading ? 0.6 : 1 }]}
              onPress={handleSendOtp}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Send OTP</Text>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsAlternateWay(true)} style={styles.tryAnotherWayBtn}>
              <Text style={styles.linkText}>Try another way</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Icon name="person-outline" size={20} color={Colors.gray} style={styles.icon} />
                <TextInput
                  placeholder="Enter full name"
                  style={styles.input}
                  value={form.username}
                  onChangeText={(text) => handleChange('username', text)}
                  placeholderTextColor={Colors.darkGray}
                />
              </View>
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputWrapper}>
                <Icon name="mail-outline" size={20} color={Colors.gray} style={styles.icon} />
                <TextInput
                  placeholder="Enter email"
                  style={styles.input}
                  keyboardType="email-address"
                  value={form.email}
                  onChangeText={(text) => handleChange('email', text)}
                  placeholderTextColor={Colors.darkGray}
                />
              </View>
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Mobile Number</Text>
              <View style={styles.inputWrapper}>
                <Icon name="call-outline" size={20} color={Colors.gray} style={styles.icon} />
                <TextInput
                  placeholder="Enter mobile number"
                  style={styles.input}
                  keyboardType="number-pad"
                  maxLength={10}
                  value={form.mobileNo}
                  onChangeText={(text) => handleChange('mobileNo', text)}
                  placeholderTextColor={Colors.darkGray}
                />
              </View>
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock-closed-outline" size={20} color={Colors.gray} style={styles.icon} />
                <TextInput
                  placeholder="Enter password"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={form.password}
                  onChangeText={(text) => handleChange('password', text)}
                  placeholderTextColor={Colors.midgray}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color={Colors.gray} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Confirm Password</Text>
              <View style={styles.inputWrapper}>
                <Icon name="lock-closed-outline" size={20} color={Colors.gray} style={styles.icon} />
                <TextInput
                  placeholder="Re-enter password"
                  style={styles.input}
                  secureTextEntry={!showPassword}
                  value={form.confirmPassword}
                  onChangeText={(text) => handleChange('confirmPassword', text)}
                  placeholderTextColor={Colors.midgray}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[styles.loginButton, { opacity: loading ? 0.6 : 1 }]}
              onPress={handleSignup}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Create Account</Text>}
            </TouchableOpacity>
          </>
        )}

        <TouchableOpacity style={styles.loginRedirectButton} onPress={() => navigation?.navigate?.('Login')}>
          <Text style={styles.loginRedirectText}>Already have an account? Login</Text>
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
  tryAnotherWayBtn: {
    marginTop: 16,
    alignItems: 'center',
  },
  linkText: {
    fontSize: 14,
    fontFamily: Fonts.medium,
    color: Colors.secondary,
    textDecorationLine: 'underline',
  },
});
