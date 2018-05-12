import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity
} from 'react-native';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.props = props;
  }
  render() {
    var props = this.props.props;
    return (
      <View style={{
        height: 50,
        flexDirection: "row",
        backgroundColor: "transparent"
      }}>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => props.navigation.navigate('QuestionsList')}>
          <View style={{
            flex: 1,
            backgroundColor: "lightgrey"
          }} />
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => props.navigation.navigate('Achievements')}>
          <View style={{
            flex: 1,
            backgroundColor: "grey"
          }} />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: '#fff'
  },
});
