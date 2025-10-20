import React, { useState } from 'react';
import { SafeAreaView, View, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import CustomButton from '../components/Button';
import useThemeStyles from '../hooks/useThemeStyles';

export default function CounterScreen() {
  const [count, setCount] = useState(0);
  const [isDark, setIsDark] = useState(false);
  const { styles, MAX } = useThemeStyles(isDark);

  const disabledInc = count >= MAX;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={isDark ? 'light' : 'dark'} />

      <View style={styles.card}>
        <Text style={styles.label}>Contador</Text>

        <Text style={styles.count}>{count}</Text>

        {disabledInc && <Text style={styles.warning}>Límite alcanzado ({MAX})</Text>}

        <View style={styles.buttonsRow}>
          <CustomButton
            label="+1"
            onPress={() => setCount(c => c + 1)}
            disabled={disabledInc}
          />
          <CustomButton label="Reset" onPress={() => setCount(0)} />
          <CustomButton
            label={isDark ? 'Tema claro' : 'Tema oscuro'}
            onPress={() => setIsDark(d => !d)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
