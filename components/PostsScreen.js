import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import React, { useLayoutEffect } from 'react';
import { KeyboardAvoidingView, ImageBackground, Platform } from 'react-native';
import Background from '../assets/Backgroundapp.png';

const PostsScreen = ({ navigation, data }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Posts',
    });
  }, [navigation]);

  const renderItem = ({ item }) => (
    <Button
      title={item.title}
      buttonStyle={{
        backgroundColor: 'transparent',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      containerStyle={styles.item}
      onPress={() =>
        navigation.navigate(
          `${item.id}${item.title.replace(/ /g, '-').split(0, 24)[0]}`
        )
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
          <Text style={styles.title}>Posts List</Text>
          <FlatList
            style={{ width: '100%' }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default PostsScreen;

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
