import React from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Footer from "./Footer";

export default class NewQuestion extends React.Component {
    static navigationOptions = {
        headerTitle: "Add Question"
    };
    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput
                    style={{ height: 40 }}
                    placeholder="Summary..."

                />
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
