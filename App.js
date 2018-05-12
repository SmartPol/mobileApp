import React from 'react';
import { StyleSheet, Text, View, Button} from 'react-native';
import QuestionsList from "./QuestionsList";
import Achievements from "./Achievements";
import Question from "./Question";
import { createStackNavigator } from 'react-navigation';

class App extends React.Component {
  render() {
    return;
  }
}


export default createStackNavigator(
  {
    QuestionsList: QuestionsList,
    Question: Question,
    Achievements: Achievements,
  },
  {
    initialRouteName: 'QuestionsList'
  }
);
