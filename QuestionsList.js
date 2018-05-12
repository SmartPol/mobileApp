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
      dataSource: ds.cloneWithRows(['Question 1',
                                    'Question 2',
                                    'Question 3',
                                    'Question 4',
                                    'Question 5',
                                    'Question 6',
                                    'Question 7',
                                    'Question 8',
                                    'Question 9',
                                    'Question 10',
                                    'Question 11']),
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ListView style={{marginTop: 10}}
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) =>
                    <TouchableOpacity onPress={ () => this.props.navigation.navigate('Question')}>
                      <Text style={{marginLeft: 20,
                                    height: 50}}>{rowData}</Text>
                    </TouchableOpacity>}/>
        <Footer props={this.props}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
