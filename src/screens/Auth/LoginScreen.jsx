import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image
          source={{ uri: 'https://img.icons8.com/ios-filled/100/2D79F3/box.png' }}
          style={styles.logo}
        />

        <Text style={styles.welcomeText}>
          Welcome Back <Text style={styles.wave}>👋</Text>
        </Text>
        <Text style={styles.hrText}>to <Text style={styles.hrHighlight}>HR Attendee</Text></Text>
        <Text style={styles.subText}>Hello there, login to continue</Text>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="michael.mitc@example.com"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputBox}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordField}>
            <TextInput
              style={styles.inputPassword}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={hidePassword}
            />
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
              <Icon
                name={hidePassword ? 'eye-off' : 'eye'}
                size={20}
                color="#888"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot Password ?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.dividerWrap}>
          <View style={styles.line} />
          <Text style={styles.or}>Or continue with social account</Text>
          <View style={styles.line} />
        </View>

        <TouchableOpacity style={styles.googleBtn}>
          <FontAwesome name="google" size={20} color="#DB4437" />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.registerWrap}>
          <Text style={styles.registerText}>
            Didn’t have an account? <Text style={styles.registerLink}>Register</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 30,
    paddingBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
  },
  wave: {
    fontSize: 22,
  },
  hrText: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 4,
  },
  hrHighlight: {
    color: '#2D79F3',
  },
  subText: {
    color: '#999',
    fontSize: 14,
    marginVertical: 14,
  },
  inputBox: {
    width: '100%',
    marginBottom: 14,
  },
  label: {
    color: '#2D79F3',
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#2D79F3',
    borderRadius: 10,
    height: 48,
    paddingHorizontal: 12,
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2D79F3',
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 48,
  },
  inputPassword: {
    flex: 1,
  },
  forgotBtn: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 20,
  },
  forgotText: {
    color: '#2D79F3',
    fontSize: 13,
  },
  loginBtn: {
    backgroundColor: '#2D79F3',
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  dividerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  or: {
    marginHorizontal: 10,
    fontSize: 12,
    color: '#aaa',
  },
  googleBtn: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    height: 48,
    width: '100%',
    marginBottom: 30,
  },
  googleText: {
    fontSize: 16,
    color: '#000',
  },
  registerWrap: {
    alignItems: 'center',
  },
  registerText: {
    fontSize: 13,
    color: '#333',
  },
  registerLink: {
    color: '#2D79F3',
    fontWeight: '500',
  },
});
