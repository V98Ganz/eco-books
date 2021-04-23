import React, { Component } from 'react';
import { Image, Text, TouchableHighlight, View } from 'react-native';

export default class Book extends Component {
  state = {
    showingPicture: true,
  }
  
  changeState = () => {
    console.log("we are in changeState function")
    this.setState((currentState) => {
      if (currentState.showingPicture) {
        return this.setState({ showingPicture: false })
      } else {
        return this.setState({ showingPicture: true })
      }
    })
  }

  render() {
    const { showingPicture } = this.state;
    return (
      showingPicture ? 
      <TouchableHighlight onPress={() => this.changeState()} >
        <Image source={{uri: this.props.bookImage}} style={{width: 400, height: 400}}  />
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