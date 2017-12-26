import React from 'react';
import { View, Image, Text } from 'react-native';

import styles from './styles';

const Logo = () => (
  <View style={styles.container}>
    <Text style={styles.text}>La quiniela mas jugada en el mundo</Text>
    <Image
      resizeMode="contain"
      style={styles.containerImage}
      source={require('./images/copa1.png')}
    />
  </View>
);

export default Logo;
