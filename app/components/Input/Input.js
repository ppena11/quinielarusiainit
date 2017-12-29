import React, { Component } from 'react';
import { View, Text, TextInput } from 'react-native';
import PropTypes from 'prop-types';

import styles from './styles';

class Input extends Component {
  render() {
    const {
      label,
      value,
      onChangeText,
      placeholder,
      secureTextEntry,
      keyboardType,
      autoCapitalize,
      underlineColorAndroid,
    } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          autoCorrect={false}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          value={value}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          underlineColorAndroid={underlineColorAndroid}
        />
      </View>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  underlineColorAndroid: PropTypes.string,
};

export default Input;
