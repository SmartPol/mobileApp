import React from 'react';
import { StyleSheet,
        Text,
        View,
        ListView,
        TextInput,
        Image,
        Button,
        TouchableOpacity } from 'react-native';
import Footer from "./Footer";


export default class QuestionsList extends React.Component {
  static navigationOptions = {
    headerTitle: <View style={{flexDirection: "row"}}>
      <Image style={{flex: 1, width: 25, height: 25}} source={require('./img/search-icon.png')}/>
      <TextInput style={{flex: 10, height: 25, fontSize: 16, marginTop: 5}}
                 onChangeText={(text) => console.log(text)}
                 onSubmitEditing={() => console.log("done")}
                 placeholder= "Search...">
      </TextInput>
    </View>
  };
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      data: ds.cloneWithRows([])
    };

  }

  componentWillMount(){
    this.getData();
  }

  getData() {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const url = 'https://smart-pol-api.herokuapp.com/';
    const query = {"query": "{posts {id title description totalVotes insideOnly type answers {id description created} comments {id description}}}",
                   "operationName": null,
                   "variables": null};


    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(query),
      mode: "no-cors"
    })
    .then(response => response.json())
    .then(data => {
      var response = data.data.posts;
      this.setState({data: ds.cloneWithRows(response.map(function(item){
        return item.description;
      }))});
      console.log('Here is the data: ', response);
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ListView style={{marginTop: 10}}
                  dataSource={this.state.data}
                  renderRow={(rowData) =>
                     <TouchableOpacity onPress={ () => {console.log(rowData);}>
                      <Text style={{marginLeft: 20,
                                    height: 50}}>{rowData}</Text>
                     </TouchableOpacity>}/>
        <Footer props={this.props}/>
      </View>
    );
  }
}

// this.props.navigation.navigate('Question')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
