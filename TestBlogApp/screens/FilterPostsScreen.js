import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const fetchPostsByUser = async ({ queryKey }) => {
  const [_, userId] = queryKey;
  const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
  return data;
};

export default function FilterPostsScreen() {
  const [userId, setUserId] = useState('');
  const { data: posts, isLoading, isError, refetch } = useQuery({
    queryKey: ['posts', userId],
    queryFn: fetchPostsByUser,
    enabled: false,
  });

  const handleFetchPosts = () => {
    console.log('Fetching posts for user ID:', userId);
    refetch();
  };

  return (
    <View style={styles.container}>
      <Text>Filter Posts by User ID</Text>
      <TextInput
        value={userId}
        onChangeText={setUserId}
        placeholder="User ID"
        keyboardType="numeric"
        style={styles.input}
      />
      <Button title="Fetch Posts" onPress={handleFetchPosts} />
      {isLoading && <Text>Loading...</Text>}
      {isError && <Text>Error fetching posts</Text>}
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.post}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    borderRadius: 4,
  },
  post: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
