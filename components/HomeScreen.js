import { FlatList, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';
import React from 'react';
import { KeyboardAvoidingView, ImageBackground, Platform } from 'react-native';
import Background from '../assets/Backgroundapp.png';

const HomeScreen = ({ navigation, data }) => {
  const renderItem = ({ item }) => (
    <Button
      title={`${item.id}) ${item.name}`}
      buttonStyle={{
        backgroundColor: 'transparent',
        width: '100%',
        justifyContent: 'flex-start',
      }}
      containerStyle={styles.item}
      onPress={() =>
        navigation.navigate(`${item.id}${item.name.replace(/ /g, '-')}`)
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
            style={{ width: '100%' }}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={{ height: 100 }} />
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
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
    width: '95%',
    fontSize: 12,
    paddingVertical: 10,
    paddingLeft: 18,
    backgroundColor: 'rgba(30, 31, 32, 0.25)',
    borderRadius: 8,
    marginTop: 30,
  },
});
