import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UsersIcon from 'react-native-vector-icons/FontAwesome5';
import PostsIcon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';

import HomeScreen from './components/HomeScreen.js';
import UserPage from './components/UserPage.js';
import PostsScreen from './components/PostsScreen.js';
import PostPage from './components/PostPage.js';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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

  const globalScreenOptions = {
    headerStyle: { backgroundColor: 'rgba(16, 169, 176, 1)' },
    headerTitleStyle: { color: 'white' },
    headerTintColor: 'white',
  };

  const BottomPanel = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Users') iconName = focused ? 'users' : 'users';
            else if (route.name === 'Posts')
              iconName = focused ? 'article' : 'article';
            return iconName === 'users' ? (
              <UsersIcon name={iconName} size={size} color={color} />
            ) : (
              <PostsIcon name={iconName} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: '#3D1273',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Users" options={{ headerShown: false }}>
          {(props) => <HomeScreen {...props} data={users} />}
        </Tab.Screen>
        <Tab.Screen name="Posts" options={{ headerShown: false }}>
          {(props) => <PostsScreen {...props} data={posts} />}
        </Tab.Screen>
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#10A9B0" barStyle="light-content" />
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen
          name="BottomPanel"
          component={BottomPanel}
          options={{ headerShown: false }}
        />

        {users?.map((user) => {
          return (
            <Stack.Screen
              key={user.id}
              name={`${user.id}${user.name.replace(/ /g, '-')}`}
            >
              {(props) => <UserPage {...props} data={user} />}
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
              {(props) => <PostPage {...props} data={post} />}
            </Stack.Screen>
          );
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
