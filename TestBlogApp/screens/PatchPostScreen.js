import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import styles from '../styles/styles';

const patchPost = async ({ id, updatedPost }) => {
  const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, updatedPost);
  return response.data;
};

const PatchPostScreen = ({ route, navigation }) => {
  const { post } = route.params;
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: patchPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      navigation.goBack();
    },
  });

  const handleSubmit = () => {
    mutation.mutate({ id: post.id, updatedPost: { title, body } });
  };

  return (
    <View style={styles.container}>
      <Text>Title</Text>
      <TextInput value={title} onChangeText={setTitle} style={styles.input} />
      <Text>Body</Text>
      <TextInput value={body} onChangeText={setBody} style={styles.input} />
      <Button title="Update Post" onPress={handleSubmit} />
      {mutation.isLoading && <Text>Updating post...</Text>}
      {mutation.isError && <Text>Error updating post: {mutation.error.message}</Text>}
    </View>
  );
};

export default PatchPostScreen;
