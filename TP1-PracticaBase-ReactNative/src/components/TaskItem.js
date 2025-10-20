import React from 'react';
import { Pressable, Text } from 'react-native';
import todoStyles from '../styles/todoStyles';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <Pressable
      onPress={() => onToggle(task.id)}
      onLongPress={() => onDelete(task.id)}
      style={[
        todoStyles.task,
        task.done && todoStyles.taskDone
      ]}
    >
      <Text style={[todoStyles.taskText, task.done && todoStyles.taskTextDone]}>
        {task.title}
      </Text>
    </Pressable>
  );
}
