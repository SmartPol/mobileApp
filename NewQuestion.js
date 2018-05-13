import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Footer from "./Footer";

export default class NewQuestion extends React.Component {
    static navigationOptions = {
        headerTitle: "Add Question"
    };

    constructor() {
        super();
        this.state = {
            title: 'lauraTitle',
            description: 'lauraDescr',
            insideOnly: false,
            type: 'QUESTION',
            user_id: 1
        };

    }

    handlerPress() {
        const query = { "query": "mutation {createPost (title: \"" + this.state.title + "\"" + 
                                                ", description: \"" + this.state.description + "\"" + 
                                                ", insideOnly: " + this.state.insideOnly + 
                                                ", type: \"" + this.state.type + "\"" + 
                                                ", userId: " + this.state.user_id + ") {id}", "operationName":null,"variable":null};
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

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    onChangeText={(text) => this.setState({title: text})}
                    placeholder="Title..."
                />
                <TextInput
                    onChangeText={(text) => this.setState({description: text})}
                    placeholder="Description..."
                    multiline={true}
                    numberOfLines={5}
                />
                <Button
                    title='Save'
                    style={{ fontSize: 20, color: 'blue' }}
                    styleDisabled={{ color: 'grey' }}
                    onPress={() => { this.handlerPress() }}>
                </Button>
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
