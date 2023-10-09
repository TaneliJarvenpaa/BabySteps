import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image 
    source={{ uri: 'https://example.com/your-logo.png' }} 
    style={styles.logo} 
  />
);

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 150,
  }
});

export default Logo;
