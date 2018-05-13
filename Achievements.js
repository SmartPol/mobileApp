import React from 'react';
import { StyleSheet,
Text,
View,
ListView,
TextInput,
Image,
Button,
TouchableOpacity, TouchableHighlight} from 'react-native';
import Footer from "./Footer";

export default class Achievements extends React.Component {
  static navigationOptions = {
    headerTitle: "Articles"}

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

  getQuestionVotes(id) {
    return this.state.response.filter(function (item) { return item.id === id })
      .map(function (item) { return item.totalVotes })[0];
  }

  getData() {
    const url = 'https://smart-pol-api.herokuapp.com/api';
    const query = {
      "query": '{posts(type: "ARTICLE", search: "") {id title description totalVotes insideOnly type answers {id description accepted totalVotes} comments {id description}}}',
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
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        var response = data.data.posts;
        self.setState(
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
      const itemData = item.title.toUpperCase()
      const textData = text.toUpperCase()
      return itemData.indexOf(textData) > -1
    }).map(function (item) { return item.id; });
    this.setState({
      data: ds.cloneWithRows(newData),
    })
  }

  render() {
    return (
      <View style={{flex: 1}}>
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
              this.props.navigation.navigate('Article', {
                question: {title: this.getResponse(rowData),
                           description: this.getQuestionDescription(rowData),
                           id: rowData,
                           totalVotes: this.getQuestionVotes(rowData)},
                answers: this.getAnswers(rowData),
                comments: this.getComments(rowData)
              })
            }}>
              <Text style={{
                marginLeft: 20,
                height: 50
              }}>{this.getResponse(rowData)}</Text>
            </TouchableOpacity>} />
        <Footer props={this.props}/>
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
