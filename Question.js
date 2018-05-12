import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class Question extends React.Component {
  static navigationOptions = {
    headerTitle: "Question?"};
  render() {
    return (
      <View style={styles.container}>
        <Text>This is Question page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
