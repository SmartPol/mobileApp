import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default class Question extends React.Component {
  static navigationOptions = {
    headerTitle: "Question?"};
  constructor(props){
    super(props);
    this.state = {question: this.props.navigation.state.params.question,
                  answers: this.props.navigation.state.params.answers,
                  comments: this.props.navigation.state.params.comments}
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row"}}>
          <View style={{flexDirection: "column", width: 50, marginTop: 10, marginLeft: 5, alignItems: "center"}}>
            <TouchableOpacity onPress={ () => console.log("Upvote")}>
              <Image style={{width: 30, height: 25}} source={require('./img/up.png')} resizeMode={"stretch"}/>
            </TouchableOpacity>
            <Text style={{fontSize: 20, textDecoration: "bold", marginTop: 5, marginBottom: 5}}>2</Text>
            <TouchableOpacity onPress={ () => console.log("Downvote")}>
              <Image style={{width: 30, height: 25}} source={require('./img/down.png')} resizeMode={"stretch"}/>
            </TouchableOpacity>
          </View>
          <View style={{margin: 20}}>
            <Text>{this.state.question}</Text>
          </View>
        </View>
        {this.state.comments.map(function(item){ return <Text key={item.id} style={{fontSize: 8}}>{item.description}</Text>})}
        <View>{this.state.answers.map(function(item){ return <Text key={item.id} style={{fontSize: 16}}>{item.description}</Text>})}</View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
