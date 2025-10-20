import React from 'react';
import { Pressable, Text } from 'react-native';
import buttonStyles from '../styles/buttonStyles';

export default function CustomButton({ label, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        buttonStyles.button,
        pressed && buttonStyles.buttonPressed,
        disabled && buttonStyles.buttonDisabled,
      ]}
    >
      <Text style={buttonStyles.buttonText}>{label}</Text>
    </Pressable>
  );
}
