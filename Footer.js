import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
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
        backgroundColor: "transparent",
        borderTopWidth: 1
      }}>
        <TouchableOpacity style={{ flex: 1, borderRightWidth: 1}} onPress={() => props.navigation.navigate('QuestionsList')}>
          <View style={{
            flex: 1}}>
            <Image style={{marginTop: 5, alignSelf: "center", width: 40, height: 40}} source={require('./img/question-icon.png')} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{ flex: 1 }} onPress={() => props.navigation.navigate('Achievements')}>
          <View style={{
            flex: 1
          }}>
            <Image style={{marginTop: 5, alignSelf: "center", width: 40, height: 40}} source={require('./img/article-icon.png')} />
          </View>
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
