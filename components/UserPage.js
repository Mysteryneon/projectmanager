import { StyleSheet, View } from 'react-native';
import React, { useLayoutEffect } from 'react';
import { KeyboardAvoidingView, ImageBackground, Platform } from 'react-native';
import { Text, Divider } from 'react-native-elements';
import Background from '../assets/Backgroundapp.png';

const UserPage = ({ navigation, data }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Users',
      headerTitle: data.name,
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
          <Text style={styles.title}>{data?.name}</Text>
          <View style={styles.box}>
            <Text style={styles.main}>Name:</Text>
            <Text style={styles.info}>{data?.name}</Text>
            <Divider orientation="vertical" width={10} style={styles.divider} />

            <Text style={styles.main}>Email:</Text>
            <Text style={styles.info}>{data?.email}</Text>
            <Divider orientation="vertical" width={10} style={styles.divider} />

            <Text style={styles.main}>Phone:</Text>
            <Text style={styles.info}>{data?.phone}</Text>
            <Divider orientation="vertical" width={10} style={styles.divider} />

            <Text style={styles.main}>Website:</Text>
            <Text style={styles.info}>{data?.website}</Text>
            <Divider orientation="vertical" width={10} style={styles.divider} />

            <Text style={styles.main}>Address:</Text>
            <Text style={styles.info}>
              {data?.address?.city}, {data?.address?.street},{' '}
              {data?.address?.suite}
            </Text>
            <Divider orientation="vertical" width={10} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
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
    alignSelf: 'center',
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
    marginBottom: 8,
  },
  divider: {
    marginBottom: 20,
  },
});
