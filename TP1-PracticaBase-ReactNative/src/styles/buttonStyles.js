import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  button: {
    flex: 1,
    marginHorizontal: 6,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#f1f5f9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonPressed: {
    opacity: 0.72,
  },
  buttonDisabled: {
    opacity: 0.45,
  },
  buttonText: {
    color: '#0b1220',
    fontWeight: '700',
  },
});
