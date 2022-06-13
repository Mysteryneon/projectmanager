import { FlatList, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Divider, Text } from 'react-native-elements';
import Background from '../assets/Backgroundapp.png';
import AlbumScreen from "./AlbumScreen";
import { Switch } from "@rneui/base";
import axios from "axios";

const TodoItem = ({title, completed}) => {
  return <View style={{...styles.todo, flex: 1, flexDirection: 'row', margin: 20, justifyContent: 'center'}}>
    <Text style={{...styles.info, flex: 0.9}}>{title}</Text>
    <Switch style={{flex: 0.1, margin: 4}} value={completed}/>
  </View>
}
const UserPage = ({navigation, route: {params: {userDetail}}}) => {
  const [todos, setTodos] = useState([])

  const fetchTodos = useCallback(async () => {
    try {
      const {data} = await axios
        .get(`https://jsonplaceholder.typicode.com/todos?userId=${userDetail?.id}`)
      setTodos(data)
    } catch (e) {
      alert(e)
    }
  }, [userDetail])

  useEffect(async () => {
    await fetchTodos()
  }, [fetchTodos])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Users',
      headerTitle: userDetail?.name,
    });
  }, [navigation]);

  return (
    <ScrollView>
      <ImageBackground
        source={Background}
        style={{width: '100%', height: '100%'}}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}
        >
          <View style={styles.container}>
            <Text style={styles.title}>{userDetail?.name}</Text>
            <View style={styles.box}>
              <Text style={styles.main}>Name:</Text>
              <Text style={styles.info}>{userDetail?.name}</Text>
              <Divider orientation="vertical" width={10} style={styles.divider}/>

              <Text style={styles.main}>Email:</Text>
              <Text style={styles.info}>{userDetail?.email}</Text>
              <Divider orientation="vertical" width={10} style={styles.divider}/>

              <Text style={styles.main}>Phone:</Text>
              <Text style={styles.info}>{userDetail?.phone}</Text>
              <Divider orientation="vertical" width={10} style={styles.divider}/>

              <Text style={styles.main}>Website:</Text>
              <Text style={styles.info}>{userDetail?.website}</Text>
              <Divider orientation="vertical" width={10} style={styles.divider}/>

              <Text style={styles.main}>Address:</Text>
              <Text style={styles.info}>
                {userDetail?.address?.city}, {userDetail?.address?.street},{' '}
                {userDetail?.address?.suite}
              </Text>
              <Divider orientation="vertical" width={10}/>
            </View>
            <AlbumScreen id={userDetail?.id}/>
            <Text style={styles.title}>Todos List</Text>
            <FlatList
              style={{width: '100%', height: 500}}
              data={todos}
              renderItem={({item}) => <TodoItem {...item}/>}
              keyExtractor={(item) => item.id}
            />
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  )
    ;
};

export default UserPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
  },
  title: {
    color: '#3D1273',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
    textAlign: 'left'
  },
  box: {
    width: '95%',
    fontSize: 12,
    paddingVertical: 10,
    padding: 20,
    backgroundColor: 'rgba(30, 31, 32, 0.25)',
    borderRadius: 8,
    marginTop: 30,
    justifyContent: 'flex-start',
  },
  main: {
    alignSelf: 'baseline',
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },
  info: {
    color: '#FFF',
    fontSize: 14,
    alignSelf: 'baseline',
    borderBottomColor: '#00F0FF',
    margin: 10,
  },
  todo: {
    backgroundColor: 'rgba(72,111,184,0.25)',
    borderRadius: 8,
  },
  divider: {
    marginBottom: 20,
  },
});
