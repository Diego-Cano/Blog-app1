import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const createPost = async (newPost) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
  return data;
};

export default function AddPostScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  
  const queryClient = useQueryClient();
  
  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      console.log('Post created');
      queryClient.invalidateQueries(['posts']);
      navigation.goBack();
    },
  });
  
  const handleCreate = () => {
    console.log('Creating post');
    createMutation.mutate({ title, body, userId: 1 });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Post</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Title"
        style={styles.input}
      />
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Body"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button} onPress={handleCreate}>
        <Text style={styles.buttonText}>Create Post</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f0f4f7',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
