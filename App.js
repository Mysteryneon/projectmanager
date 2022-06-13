import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UsersIcon from 'react-native-vector-icons/FontAwesome5';
import PostsIcon from 'react-native-vector-icons/MaterialIcons';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
import PostsScreen from './components/PostsScreen.js';
import { ROUTES } from "./constants";
import UserPage from "./components/UserPage";
import PostPage from "./components/PostPage";
import HomeScreen from "./components/HomeScreen";
import AlbumScreen from "./components/AlbumScreen";
import AlbumPage from "./components/AlbumPage";

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
    headerStyle: {backgroundColor: 'rgba(16, 169, 176, 1)'},
    headerTitleStyle: {color: 'white'},
    headerTintColor: 'white',
  };
  const UserStackNavigator = () => {
    return <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.USERS}
        component={HomeScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={ROUTES.USER_DETAIL}
        component={UserPage}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={ROUTES.ALBUM_DETAIL}
        component={AlbumPage}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  }
  const PostStackNavigator = () => {
    return <Stack.Navigator>
      <Stack.Screen
        name={ROUTES.POSTS}
        component={PostsScreen}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name={ROUTES.POST_DETAIL}
        component={PostPage}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  }

  const BottomPanel = () => {
    return (
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Users') iconName = focused ? 'users' : 'users';
            else if (route.name === 'Posts')
              iconName = focused ? 'article' : 'article';
            return iconName === 'users' ? (
              <UsersIcon name={iconName} size={size} color={color}/>
            ) : (
              <PostsIcon name={iconName} size={size} color={color}/>
            );
          },
          tabBarActiveTintColor: '#3D1273',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Users" options={{headerShown: false}} component={UserStackNavigator}/>
        <Tab.Screen name="Posts" options={{headerShown: false}} component={PostStackNavigator}/>
      </Tab.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#10A9B0" barStyle="light-content"/>
      <Stack.Navigator screenOptions={globalScreenOptions}>
        {/*{BottomPanel()}*/}
        <Stack.Screen
          name="BottomPanel"
          component={BottomPanel}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
