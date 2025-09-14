import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions, Image } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = () => {
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(logoOpacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LottieView
        source={require('../../../assets/splash.json')}
        autoPlay
        loop
        style={styles.lottie}
      />
      <Animated.Image
        source={require('../../../assets/app_icon.jpg')}
        style={[styles.logo, { opacity: logoOpacity }]}
        resizeMode="contain"
      />
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: width * 1.2,     
    height: width * 1.2,   
    position: 'absolute',
    top: height / 2 - (width * 1.2) / 2,
    left: width / 2 - (width * 1.2) / 2,
  },
  logo: {
    width: width * 0.4, 
    height: width * 0.4,
    position: 'absolute',
    top: height / 2 - (width * 0.4) / 2,
    left: width / 2 - (width * 0.4) / 2,
  },
});

export default SplashScreen;
