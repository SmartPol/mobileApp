import React from 'react';
import { StyleSheet,
         Text,
         View,
         Image,
         TouchableOpacity,
         TextInput,
         Button,
         KeyboardAvoidingView,
         ScrollView } from 'react-native';

class Voting extends React.Component {
  constructor(props){
    super(props);
    this.state = {totalVotes: props.totalVotes,
                  voted: false};
  }
  render() { return(
      <View style={{flexDirection: "column", width: 50, marginTop: 10, alignItems: "center"}}>
        <TouchableOpacity onPress={ () => {if(!this.state.voted){
                                            votePost(this.props.id, true);
                                            this.setState({totalVotes: this.state.totalVotes + 1, voted: true});}}}>
          <Image style={{width: 30, height: 25}} source={require('./img/up.png')} resizeMode={"stretch"}/>
        </TouchableOpacity>
        <Text style={{fontSize: 20, fontWeight: "bold", marginTop: 5, marginBottom: 5}}>{this.state.totalVotes}</Text>
        <TouchableOpacity onPress={ () => {if(!this.state.voted){
                                            votePost(this.props.id, false);
                                            this.setState({totalVotes: this.state.totalVotes - 1, voted: true});}}}>
          <Image style={{width: 30, height: 25}} source={require('./img/down.png')} resizeMode={"stretch"}/>
        </TouchableOpacity>
      </View>
    );
  }
}

function votePost(id, voted) {
  const query = { "query": "mutation {updatePostVote (postId: "+ id +", increase: "+ voted +") {id}}", "operationName":null,"variable":null};
  const url = 'https://smart-pol-api.herokuapp.com/api';
  fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
      mode: "no-cors"
  })
      .then(response => response.json())
      .then(data => {
          console.log('Here is the data: ', data);
      });
}

function voteAnswer(id, voted) {
  const query = { "query": "mutation {updateAnswerVote (answerId: "+ id +", increase: "+ voted +") {id}}", "operationName":null,"variable":null};
  const url = 'https://smart-pol-api.herokuapp.com/api';
  fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
      mode: "no-cors"
  })
      .then(response => response.json())
      .then(data => {
          console.log('Here is the data: ', data);
      });
}

class SmallVoting extends React.Component {
  constructor(props){
    super(props);
    this.state = {totalVotes: props.totalVotes, voted: false};
  }
  render() { return(
    <View style={{flexDirection: "row"}}>
      <View style={{alignSelf: "center", marginLeft: 5, marginTop: 10, width: 20}}>
        {this.props.accepted && <Image style={{width: 20, height: 15}} source={require('./img/un_ok.png')} resizeMode={"stretch"}/>}
      </View>
      <View style={{flexDirection: "column", width: 20, marginTop: 10, marginLeft: 5, alignItems: "center"}}>
        <TouchableOpacity onPress={ () => {if(!this.state.voted){
                                            voteAnswer(this.props.id, true);
                                            this.setState({totalVotes: this.state.totalVotes + 1, voted: true});}}}>
          <Image style={{width: 20, height: 15}} source={require('./img/up.png')} resizeMode={"stretch"}/>
        </TouchableOpacity>
        <Text style={{fontSize: 15, fontWeight: "bold", marginTop: 5, marginBottom: 5}}>{this.state.totalVotes}</Text>
        <TouchableOpacity onPress={ () => {if(!this.state.voted){
                                            voteAnswer(this.props.id, false);
                                            this.setState({totalVotes: this.state.totalVotes - 1, voted: true});}}}>
          <Image style={{width: 20, height: 15}} source={require('./img/down.png')} resizeMode={"stretch"}/>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

export default class Question extends React.Component {
  constructor(props){
    super(props);
    this.state = {question: this.props.navigation.state.params.question,
                  answers: this.props.navigation.state.params.answers,
                  comments: this.props.navigation.state.params.comments,
                  addAnswer: true}
  }

  sendAnswer(description) {

    const q = 'mutation{ createAnswer(title: "Answer", description: "'+ description +'", accepted: false, postId: "'+this.state.question.id+'", userId: 1){id description accepted totalVotes}}';
    const url = 'https://smart-pol-api.herokuapp.com/api';
    const query = {
      "query": q,
      "operationName": null,
      "variables": null
    };
    var self = this;
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
      mode: "no-cors"
    })
      .then(response => response.json())
      .then(data => {
          var currentAnswers = self.state.answers;
          currentAnswers.push(data.data.createAnswer);
          self.setState({answers: currentAnswers});
        });
  }
   render() {
    return (
      <ScrollView behavior="padding" style={styles.container}>
        <View style={{flexDirection: "row"}}>
          <Voting id={this.state.question.id} totalVotes={this.state.question.totalVotes}/>
          <View style={{margin: 20, paddingRight: 30}}>
            <Text style={{fontSize: 20, fontWeight: "bold"}}>{this.state.question.title}</Text>
            <Text>{this.state.question.description}</Text>
          </View>
        </View>
        <View style={{marginLeft: 60}}>
          <View style={{flexDirection: "row"}}>
            <Text style={{fontSize: 15, fontWeight: "bold"}}>Comments</Text>
            <TouchableOpacity style={{alignSelf: "flex-end"}} onPress={ () => this.setState({addComment: true})}>
              <Text style={{fontSize: 15, color: "blue"}}> Add </Text>
            </TouchableOpacity>
          </View>
          {this.state.comments.map(function(item){ return <Text key={item.id} style={{fontSize: 12, marginLeft: 10, marginRight: 10, padding: 5, borderWidth: 1, borderRadius: 10, margin: 2}}>{item.description}</Text>})}
          {this.state.addComment && <TextInput style={{fontSize: 12, marginLeft: 10, marginRight: 10, padding: 5, borderWidth: 1, borderRadius: 10, margin: 2}}
            onSubmitEditing={(e) => {if(e.nativeEvent.text === "") {
                                      this.setState({addComment: false})
                                    } else {

                                    }}}
            placeholder="Your comment here..."/>
          }
        </View>
        <KeyboardAvoidingView behavior="padding" style={{marginTop: 20}}>
          {this.state.addAnswer && <View>
             <TextInput style={{marginTop: 10, height: 80, fontSize: 12, marginLeft: 10, marginRight: 10, padding: 5, borderWidth: 1, margin: 2}}
                       onChangeText={(text) => {if(text === "") {

                                    } else {
                                      this.setState({answerText: text});
                                    }}}
                       placeholder="Your answer here..."
                       multiline={true}
                       numberOfLines={5}/>
            <Button
              title='Submit Answer'
              style={{ fontSize: 20, color: 'blue' }}
              styleDisabled={{ color: 'grey' }}
              onPress={() => { this.setState({addAnswer: false});
                               this.sendAnswer(this.state.answerText)}}/>
           </View>}
          {this.state.answers.map(function(item){ return (
            <View key={item.id} style={{flexDirection: "row"}}>
              <SmallVoting accepted={item.accepted} totalVotes={item.totalVotes} id={item.id}/>
              <Text style={{fontSize: 16, marginTop: 15, marginLeft: 5}}>{item.description}</Text>
            </View>)})}
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
