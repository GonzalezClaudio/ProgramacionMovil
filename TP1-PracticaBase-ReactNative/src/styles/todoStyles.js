import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#888',
    padding: 8,
    marginBottom: 16,
    borderRadius: 8,
  },
  task: {
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  taskDone: {
    backgroundColor: '#60a5fa',
  },
  taskText: {
    color: '#000',
  },
  taskTextDone: {
    color: '#fff',
    textDecorationLine: 'line-through',
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#888',
  },
  filterButtonActive: {
    backgroundColor: '#60a5fa',
    borderColor: '#60a5fa',
  },
  filterButtonText: {
    color: '#000',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  counters: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
});
