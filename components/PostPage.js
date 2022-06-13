import { FlatList, ImageBackground, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import Background from '../assets/Backgroundapp.png';
import axios from "axios";
import { Card } from "@rneui/themed";

const Comment = ({name, email, body}) => {
  return <Card style={{backgroundColor: 'rgba(30, 31, 32, 0.25)'}}>
    <Text>{body}</Text>
    <View style={{flex: 1, flexDirection: 'column', alignItems: 'end', margin: 4}}>
      <Text>{name}</Text>
      <Text>{email}</Text>
    </View>
  </Card>
}
const PostPage = ({navigation, route: {params: {postDetail}}}) => {
  const [comments, setComments] = useState([])

  const fetchComments = useCallback(async () => {
    try {
      const {data} = await axios
        .get(`https://jsonplaceholder.typicode.com/posts/${postDetail?.id}/comments`)
      setComments(data)
    } catch (e) {
      alert(e)
    }
  }, [postDetail])

  useEffect(async () => {
    await fetchComments()
  }, [fetchComments])


  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Posts',
      headerTitle: 'Post',
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
            <Text style={styles.title}>{postDetail?.title}</Text>
            <View style={styles.box}>
              <Text style={styles.story}>{postDetail?.body}</Text>
            </View>
            <View style={styles.container}>
              <Text style={styles.title}>Comments</Text>
              <FlatList
                style={{width: '100%'}}
                data={comments}
                renderItem={({item}) => <Comment {...item}/>}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </ImageBackground>
    </ScrollView>
  );
};

export default PostPage;

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
    alignSelf: 'center',
    textAlign: 'center',
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
  story: {
    color: '#FFF',
    fontSize: 14,
    lineHeight: 30,
    alignSelf: 'baseline',
    textAlign: 'left',
    borderBottomColor: '#00F0FF',
  },
});
