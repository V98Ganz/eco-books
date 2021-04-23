import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';

export default class Book extends Component {
  state = {
    showingPicture: true,
  }
  
  changeState = () => {
    this.setState((currentState) => {
      if (currentState.showingPicture) {
        return { showingPicture: false }
      } else {
        return { showingPicture: true }
      }
    })
  }

  render() {
    const { showingPicture } = this.state;
    return (
      showingPicture ? 
      <TouchableHighlight onPress={() => this.changeState()} >
        <Image source={{uri: this.props.bookImage}} style={{width: 400, height: 550}}  />
      </TouchableHighlight>
      : 
      <TouchableHighlight onPress={() => this.changeState()}>
        <View>
          <Text >{this.props.bookAuthor}</Text>
          <Text>{this.props.bookTitle}</Text>
          <Text>{this.props.bookDescription}</Text>
        </View>
      </TouchableHighlight>

    )
  }
}