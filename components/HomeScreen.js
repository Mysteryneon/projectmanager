import { FlatList, ImageBackground, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import React, { useCallback, useEffect, useState } from 'react';
import Background from '../assets/Backgroundapp.png';
import axios from "axios";
import { ROUTES } from "../constants";

const HomeScreen = ({navigation}) => {
  const [users, setUsers] = useState([])

  const fetchUsers = useCallback(async () => {
    try {
      const {data} = await axios
        .get('https://jsonplaceholder.typicode.com/users')
      setUsers(data)
    } catch (e) {
      alert(e)
    }
  }, [])

  useEffect(async () => {
    await fetchUsers()
  }, [fetchUsers])

  const renderItem = ({item}) => (
    <Button
      title={`${item.id}) ${item.name}`}
      buttonStyle={{
        backgroundColor: 'transparent',
        width: '100%',
        justifyContent: 'flex-start',
      }}
      containerStyle={styles.item}
      onPress={() =>
        navigation.navigate(ROUTES.USER_DETAIL, {userDetail: item})
      }
    />
  );

  return (
    <ImageBackground
      source={Background}
      style={{ width: '100%', height: '100%' }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Users List</Text>
          <FlatList
            style={{width: '100%'}}
            data={users}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 100,
    padding: 20,
  },
  title: {
    color: '#3D1273',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
    alignSelf: 'center',
  },
  item: {
    width: '100%',
    fontSize: 12,
    paddingVertical: 10,
    paddingLeft: 18,
    backgroundColor: 'rgba(30, 31, 32, 0.25)',
    borderRadius: 8,
    marginTop: 30,
  },
});
