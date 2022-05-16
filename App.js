import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import HomeScreen from './components/HomeScreen.js';
import UserPage from './components/UserPage.js';
import PostsScreen from './components/PostsScreen.js';
import PostPage from './components/PostPage.js';

const Stack = createNativeStackNavigator();

export default function App() {
  const [users, setUsers] = React.useState();
  const [posts, setPosts] = React.useState();

  React.useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => setUsers(res.data))
      .catch((err) => alert(err));

    axios
      .get('https://jsonplaceholder.typicode.com/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => alert(err));
  }, []);

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#10A9B0" barStyle="light-content" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="PostsScreen">
          {(props) => <PostsScreen {...props} data={posts} />}
        </Stack.Screen>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} data={users} />}
        </Stack.Screen>
        {users?.map((user) => {
          return (
            <Stack.Screen
              key={user.id}
              name={`${user.id}${user.name.replace(/ /g, '-')}`}
            >
              {(props) => <PostPage {...props} data={user} />}
            </Stack.Screen>
          );
        })}

        {posts?.map((post) => {
          return (
            <Stack.Screen
              key={post.id}
              name={`${post.id}${
                post.title.replace(/ /g, '-').split(0, 24)[0]
              }`}
            >
              {(props) => <UserPage {...props} data={post} />}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
