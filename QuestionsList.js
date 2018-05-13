import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
  TextInput,
  Image,
  Button,
  TouchableOpacity, TouchableHighlight
} from 'react-native';
import Footer from "./Footer";


export default class QuestionsList extends React.Component {
  static navigationOptions = {
    headerTitle: "Questions"
  }
  constructor() {
    super();
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      data: ds.cloneWithRows([])
    };
  }

  componentWillMount() {
    this.getData();
  }

  getResponse(id) {
    return this.state.response.filter(function (item) { return item.id === id })
      .map(function (item) { return item.title })[0];
  }

  getAnswers(id) {
    return this.state.response.filter(function (item) { return item.id === id })
      .map(function (item) { return item.answers })[0];
  }

  getComments(id) {
    return this.state.response.filter(function (item) { return item.id === id })
      .map(function (item) { return item.comments })[0];
  }

  getQuestionDescription(id) {
    return this.state.response.filter(function (item) { return item.id === id })
      .map(function (item) { return item.description })[0];
  }

  getData() {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const url = 'http://smartpol.40k.ro:4000/api';
    const query = {
      "query": "{posts {id title description totalVotes insideOnly type answers {id description} comments {id description}}}",
      "operationName": null,
      "variables": null
    };


    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(query),
      mode: "no-cors"
    })
      .then(response => response.json())
      .then(data => {
        var response = data.data.posts;
        this.setState(
          {
            response: response,
            data: ds.cloneWithRows(response.map(function (item) {
              return item.id;
            }))
          });
        console.log('Here is the data: ', response);
      });
  }

  filterSearch(text) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    const newData = (this.state.response || []).filter(function (item) {
      const itemData = item.description.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    }).map(function (item) { return item.id; });
    this.setState({
      data: ds.cloneWithRows(newData),
    })
  }

  handleAddQuestion() {
    this.props.navigation.navigate('NewQuestion');
  }

  render() {

    return (
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <Image style={{ flex: 1, width: 25, height: 25 }} source={require('./img/search-icon.png')} />
          <TextInput style={{ flex: 10, height: 25, fontSize: 16, marginTop: 5 }}
            onChangeText={(text) => { this.filterSearch(text) }}
            onSubmitEditing={() => console.log("done")}
            placeholder="Search..." />
        </View>
        <ListView style={{ marginTop: 10 }}
          dataSource={this.state.data}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Question', {
                question: {title: this.getResponse(rowData),
                           description: this.getQuestionDescription(rowData)},
                answers: this.getAnswers(rowData),
                comments: this.getComments(rowData)
              })
            }}>
              <Text style={{
                marginLeft: 20,
                height: 50
              }}>{this.getResponse(rowData)}</Text>
            </TouchableOpacity>} />
        <TouchableOpacity style={styles.imageContainer} onPress={() =>{this.handleAddQuestion()}}>
          <Image style={styles.imageContainer} source={require('./img/addbtn3.png')} />
         </TouchableOpacity>
        <Footer props={this.props} />
      </View>
    );
  }
}

// this.props.navigation.navigate('NewQuestion')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  imageContainer: {
    height: 50,
    width: 50,
    alignSelf: 'flex-end',
  }
});
