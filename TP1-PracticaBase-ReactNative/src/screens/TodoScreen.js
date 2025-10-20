import React, { useState, useEffect } from 'react';
import { SafeAreaView, TextInput, FlatList, View, Text, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskItem from '../components/TaskItem';
import todoStyles from '../styles/todoStyles';

const FILTERS = {
  ALL: 'Todas',
  ACTIVE: 'Activas',
  COMPLETED: 'Completadas',
};

export default function TodoScreen() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    AsyncStorage.getItem('tasks').then(saved => {
      if (saved) setTasks(JSON.parse(saved));
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setTasks([...tasks, { id: Date.now().toString(), title: trimmed, done: false }]);
    setText('');
  };

  const toggleTask = id => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const deleteTask = id => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === FILTERS.ALL) return true;
    if (filter === FILTERS.ACTIVE) return !task.done;
    if (filter === FILTERS.COMPLETED) return task.done;
  });

  const total = tasks.length;
  const completed = tasks.filter(t => t.done).length;

  return (
    <SafeAreaView style={todoStyles.container}>
      <TextInput
        placeholder="Nueva tarea..."
        value={text}
        onChangeText={setText}
        onSubmitEditing={addTask}
        style={todoStyles.input}
      />

      <View style={todoStyles.counters}>
        <Text>Total: {total}</Text>
        <Text>Completadas: {completed}</Text>
      </View>

      <View style={todoStyles.filterRow}>
        {Object.values(FILTERS).map(f => (
          <Pressable
            key={f}
            onPress={() => setFilter(f)}
            style={[
              todoStyles.filterButton,
              filter === f && todoStyles.filterButtonActive
            ]}
          >
            <Text style={[
              todoStyles.filterButtonText,
              filter === f && todoStyles.filterButtonTextActive
            ]}>
              {f}
            </Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onToggle={toggleTask} onDelete={deleteTask} />
        )}
      />
    </SafeAreaView>
  );
}

