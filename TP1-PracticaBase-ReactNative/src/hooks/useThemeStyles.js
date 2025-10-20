import { StyleSheet, useWindowDimensions } from 'react-native';

export default function useThemeStyles(isDark) {
  const { width } = useWindowDimensions();
  const MAX = 10;

  const bg = isDark ? '#0f1724' : '#f8fafc';
  const cardBg = isDark ? '#0b1220' : '#ffffff';
  const text = isDark ? '#e6eef8' : '#0b1220';
  const accent = isDark ? '#60a5fa' : '#1e3a8a';
  const warningColor = '#f59e0b';

  const fontSizeLarge = Math.min(96, Math.max(36, Math.floor(width * 0.22)));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: bg,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 16,
    },
    card: {
      width: '100%',
      maxWidth: 520,
      padding: 20,
      borderRadius: 16,
      backgroundColor: cardBg,
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 10,
      elevation: 6,
      alignItems: 'center',
    },
    label: { color: text, fontSize: 16, marginBottom: 8 },
    count: {
      color: accent,
      fontSize: fontSizeLarge,
      fontWeight: '800',
      textAlign: 'center',
      marginVertical: 12,
    },
    warning: { color: warningColor, marginBottom: 8, fontWeight: '600' },
    buttonsRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
  });

  return { styles, MAX };
}
