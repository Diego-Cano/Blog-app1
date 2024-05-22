import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const updatePost = async ({ id, ...updatedPost }) => {
  const { data } = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost);
  return data;
};

export default function EditPostScreen({ route, navigation }) {
  const { post } = route.params;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  
  const queryClient = useQueryClient();
  
  const updateMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      console.log('Post updated');
      queryClient.invalidateQueries(['posts']);
      navigation.goBack();
    },
  });
  
  const handleUpdate = () => {
    console.log('Updating post');
    updateMutation.mutate({ id: post.id, title, body });
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Edit Post</Text>
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
      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Update Post</Text>
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
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
