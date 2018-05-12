import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Footer from "./Footer";

export default class NewQuestion extends React.Component {
    static navigationOptions = {
        headerTitle: "Add Question"
    };

    handlerPress() {

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    placeholder="Summary..."
                    multiline={true}
                    numberOfLines={5}
                    editable
                />
                <TextInput
                    placeholder="Description..."
                    multiline={true}
                    numberOfLines={5}
                    editable={true}
                />
                <Button
                    title='Save'
                    style={{ fontSize: 20, color: 'blue' }}
                    styleDisabled={{ color: 'grey' }}
                    onPress={() =>{this.handlerPress()}}>
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
