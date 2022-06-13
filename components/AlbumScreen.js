import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import React, { useCallback, useEffect, useState } from 'react';
import axios from "axios";
import { ROUTES } from "../constants";
import { useNavigation } from '@react-navigation/native';

const AlbumScreen = ({id: userId}) => {
  const navigation = useNavigation();
  const [albums, setAlbums] = useState([])

  const fetchAlbums = useCallback(async () => {
    try {
      const {data} = await axios
        .get(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
      setAlbums(data)
    } catch (e) {
      alert(e)
    }
  }, [])

  useEffect(async () => {
    await fetchAlbums()
  }, [fetchAlbums])

  const renderItem = ({item}) => (
    <View style={styles.item}>
      <Pressable
        style={{
          backgroundColor: 'transparent',
          margin: 10,
          width: '100%',
          height: '100%'
        }}
        onPress={() =>
          navigation.navigate(ROUTES.ALBUM_DETAIL, {albumDetail: item})
        }
      >
        <Text style={{color: 'white', justifyContent: 'center'}}>{item.title}</Text>
      </Pressable>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Albums List</Text>
      <FlatList
        style={{height: 400}}
        data={albums}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
      />
    </View>
  );
};

export default AlbumScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
    flexDirection: 'column',
    width: '100%'
  },
  title: {
    color: '#3D1273',
    fontSize: 24,
    fontWeight: '600',
    margin: 10,
    alignSelf: 'flex-start',
  },
  item: {
    textAlign: 'left',
    fontSize: 12,
    margin: 10,
    backgroundColor: 'rgba(30, 31, 32, 0.25)',
    borderRadius: 8,
  },
});
