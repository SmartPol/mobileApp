import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Button } from 'react-native';

import { Constants, Speech } from 'expo';
class Voting extends React.Component {
  render() { return(
    <View style={{flexDirection: "column", width: 50, marginTop: 10, marginLeft: 5, alignItems: "center"}}>
      <TouchableOpacity onPress={ () => console.log("Upvote")}>
        <Image style={{width: 30, height: 25}} source={require('./img/up.png')} resizeMode={"stretch"}/>
      </TouchableOpacity>
      <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 5, marginBottom: 5}}>2</Text>
      <TouchableOpacity onPress={ () => console.log("Downvote")}>
        <Image style={{width: 30, height: 25}} source={require('./img/down.png')} resizeMode={"stretch"}/>
      </TouchableOpacity>
    </View>);
  }
}

export default class Question extends React.Component {
  constructor(props){
    super(props);
    this.state = {question: this.props.navigation.state.params.question,
                  answers: this.props.navigation.state.params.answers,
                  comments: this.props.navigation.state.params.comments,
                translate: "Translate"}
  }
  _speak = () => {
    Speech.speak("Hello word");
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: "row"}}>
          <Voting/>
          <View style={{margin: 20}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{this.state.question.title}</Text>
            <Text>{this.state.question.description}</Text>
          </View>
        </View>
        <View style={{marginLeft: 60}}>
          <Text style={{fontSize: 15, fontWeight: "bold"}}>Comments</Text>
          {this.state.comments.map(function(item){ return <Text key={item.id} style={{fontSize: 10, marginLeft: 10, marginRight: 10, padding: 5, borderWidth: 1, borderRadius: 10, margin: 2}}>{item.description}</Text>})}
        </View>
        <View style={{marginLeft: 20}}>
          {this.state.answers.map(function(item){ return <View style={{flexDirection: "row"}}><Voting/><Text key={item.id} style={{fontSize: 16, marginTop: 15}}>{item.description}</Text></View>})}
        </View>
        <View>
          <Button onPress={this._speak}  title={this.state.translate}></Button>
        </View>
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
