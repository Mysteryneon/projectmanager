import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View
} from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import { Image } from "@rneui/themed";
import Background from '../assets/Backgroundapp.png';
import axios from "axios";

const AlbumPage = ({navigation, route: {params: {albumDetail}}}) => {
  const [photos, setPhotos] = useState([])

  const fetchPhotos = useCallback(async () => {
    try {
      const {data} = await axios
        .get(`https://jsonplaceholder.typicode.com/photos?albumId=${albumDetail?.id}`)
      setPhotos(data)
    } catch (e) {
      alert(e)
    }
  }, [albumDetail])

  useEffect(async () => {
    await fetchPhotos()
  }, [fetchPhotos])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Album',
      headerTitle: 'Album',
    });
  }, [navigation]);

  return (
    <ImageBackground
      source={Background}
      style={{width: '100%', height: '100%'}}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{flex: 1}}
      >
        <View style={styles.container}>
          <Text style={styles.title}>{albumDetail?.title}</Text>
          <FlatList
            data={photos}
            style={{width: '100%'}}
            numColumns={1}
            keyExtractor={(e) => `${e?.id}-image`}
            renderItem={({item}) => (
              <Image
                source={{uri: item.url}}
                containerStyle={styles.box}
                PlaceholderContent={<ActivityIndicator/>}
              />
            )}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default AlbumPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
  },
  title: {
    color: '#3D1273',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
    alignSelf: 'center',
    textAlign: 'left',
  },
  box: {
    width: '95%',
    height: 300,
    paddingVertical: 10,
    padding: 20,
    borderRadius: 8,
    margin: 10,
  },
  story: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 30,
    alignSelf: 'baseline',
    textAlign: 'left',
    borderBottomColor: '#00F0FF',
  },
});
