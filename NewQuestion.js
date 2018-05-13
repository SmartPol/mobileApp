import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, Image } from 'react-native';

export default class NewQuestion extends React.Component {
    static navigationOptions = {
        headerTitle: "Add Question"
    };

    constructor() {
        super();
        this.state = {
            title: '',
            description: '',
            insideOnly: false,
            type: 'ARTICLE',
            user_id: 1
        };

    }

    handlerPress() {
        var title = this.state.title;
        var description = this.state.description;

        if(title && description){
            const query = {
                "query": `
                    mutation {
                        createPost (
                            title: "${this.state.title}",
                            description: "${this.state.description}",
                            insideOnly: ${this.state.insideOnly},
                            type: ${this.state.type},
                            userId: ${this.state.user_id}
                        ) { id }
                    }`
                };
        const url = 'https://smart-pol-api.herokuapp.com/api';
        var self = this;
        fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(query),
            mode: "no-cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log('Here is the data: ', data);
                self.props.navigation.navigate('QuestionsList');
            });
        }
    }

    render() {
        return (
           <View style={{flexDirection: "column"}}>
            <TextInput
              style={{margin: 20, backgroundColor: "white", padding: 10}}
              placeholder="Title..."
              onSubmitEditing={(e) => {if(e.nativeEvent.text === "") {

                                      } else {
                                        this.setState({title: e.nativeEvent.text});
                                      }}}/>
            <TextInput
              style={{margin: 20, backgroundColor: "white", padding: 10, height: 100}}
              placeholder="Description..."
              onChangeText={(text) => {if(text === "") {

                                      } else {
                                        this.setState({description: text});
                                      }}}
              multiline={true}
              numberOfLines={5}/>
            <Button
                    title='Submit'
                    style={{ fontSize: 20, color: 'blue' }}
                    styleDisabled={{ color: 'grey' }}
                    onPress={() => { this.handlerPress() }}>
            </Button>
          </View>
        );
    }

}

// <View style={{ flex: 1 }}>
//     <TextInput
//         onChangeText={(text) => this.setState({title: text})}
//         placeholder="Title..."
//     />
//     <TextInput
//         onChangeText={(text) => this.setState({description: text})}
//         placeholder="Description..."
//         multiline={true}
//         numberOfLines={5}
//     />
//     <Button
//         title='Save'
//         style={{ fontSize: 20, color: 'blue' }}
//         styleDisabled={{ color: 'grey' }}
//         onPress={() => { this.handlerPress() }}>
//     </Button>
// </View>
