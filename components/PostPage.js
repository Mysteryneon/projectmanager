import { StyleSheet, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { KeyboardAvoidingView, ImageBackground, Platform } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import Background from '../assets/Backgroundapp.png';

const PostPage = ({ navigation, data }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Posts',
      headerTitle: 'Post',
    });
  }, [navigation]);

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
          <Text style={styles.title}>{data?.title}</Text>
          <View style={styles.box}>
            <Text style={styles.story}>{data?.body}</Text>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
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
