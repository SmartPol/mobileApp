import React from 'react';
import { StyleSheet, Text, View, ListView} from 'react-native';
import Footer from "./Footer";

export default class Achievements extends React.Component {
  static navigationOptions = {
    headerTitle: "Achievements"}
  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(['Achievement 1',
                                    'Achievement 2',
                                    'Achievement 3',
                                    'Achievement 4',
                                    'Achievement 5',
                                    'Achievement 6',
                                    'Achievement 7',
                                    'Achievement 8',
                                    'Achievement 9',
                                    'Achievement 10',
                                    'Achievement 11']),
    };
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ListView style={{marginTop: 40}}
                  dataSource={this.state.dataSource}
                  renderRow={(rowData) => <Text style={{marginLeft: 20, height: 50}}>{rowData}</Text>}/>
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
