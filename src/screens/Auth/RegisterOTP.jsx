import React, { useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Colors from '../../utils/ColorScheme';
import Fonts from '../../utils/Typography';
import phonesvg from '../../../assets/otpsent.png'; 

export default function VerifyPhoneScreen({ route }) {
  const { phone } = route.params || {};
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const inputs = Array.from({ length: 6 }, () => useRef(null));

  const handleChange = (text, index) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      if (text && index < 5) {
        inputs[index + 1].current.focus();
        setFocusedIndex(index + 1);
      }
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs[index - 1].current.focus();
      setFocusedIndex(index - 1);
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otp.join('');
    if (enteredOtp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter all 6 digits.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('https://api.bill365.in/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp: enteredOtp }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.success) {
        Alert.alert('Success', 'Phone number verified successfully.', [
          {
            text: 'OK',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Tabs' }],
            }),
          },
        ]);
      } else {
        Alert.alert('Failed', data.message || 'Invalid or expired OTP.', [
          {
            text: 'Go Back',
            onPress: () => navigation.reset({
              index: 0,
              routes: [{ name: 'Register' }],
            }),
          },
        ]);
      }
    } catch (err) {
      setLoading(false);
      Alert.alert('Error', 'Something went wrong.', [
        {
          text: 'Go Back',
          onPress: () => navigation.reset({
            index: 0,
            routes: [{ name: 'Register' }],
          }),
        },
      ]);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <Image source={phonesvg} style={styles.phonesvg} resizeMode="contain" />
        <Text style={styles.title}>Verify Your Phone</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to {phone}</Text>

        <View style={styles.otpContainer}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              ref={inputs[index]}
              style={[
                styles.otpBox,
                focusedIndex === index || digit ? styles.activeOtpBox : null,
              ]}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              onKeyPress={(e) => handleKeyPress(e, index)}
              onFocus={() => setFocusedIndex(index)}
              selectionColor="transparent"
            />
          ))}
        </View>

        <TouchableOpacity style={styles.verifyButton} onPress={handleVerify} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 24,
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phonesvg: {
    width: '60%',
    height: '40%',
  },
  title: {
    fontSize: 24,
    fontFamily: Fonts.bold,
    color: Colors.primary,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.gray,
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: Fonts.regular,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '98%',
    marginBottom: 20,
  },
  otpBox: {
    width: 45,
    height: 45,
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    color: Colors.secondary,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  activeOtpBox: {
    borderColor: Colors.primary,
    borderWidth: 2,
    backgroundColor: '#e5e7eb',
  },
  verifyButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: Fonts.semiBold,
  },
});
