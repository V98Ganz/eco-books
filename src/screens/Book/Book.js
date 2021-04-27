import React, { Component } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

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
    
    return (
      <View style={styles.container} key={this.props.index} >
      {this.state.showingPicture} ?
      <TouchableHighlight onPress={() => this.changeState()} >
        <Image source={{uri: this.props.item.bookImage}} style={styles.image}  />
      </TouchableHighlight>
      : 
      <TouchableHighlight onPress={() => this.changeState()}>
        <View>
          <Text style={styles.header}>{this.props.item.bookAuthor}</Text>
          <Text style={styles.header}>{this.props.item.bookTitle}</Text>
          <Text style={style.body}>{this.props.item.bookDescription}</Text>
        </View>
      </TouchableHighlight>
      </View>

    )
  }
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 8,
      width: ITEM_WIDTH,
      paddingBottom: 40,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 7,
    },
    image: {
      width: ITEM_WIDTH,
      height: 300,
    },
    header: {
      color: "#222",
      fontSize: 28,
      fontWeight: "bold",
      paddingLeft: 20,
      paddingTop: 20
    },
    body: {
      color: "#222",
      fontSize: 18,
      paddingLeft: 20,
      paddingLeft: 20,
      paddingRight: 20
    }
  })