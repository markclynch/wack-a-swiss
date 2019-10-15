import React, { Component } from 'react'
import { StyleSheet, View, Image } from 'react-native'
export default class Hole extends Component {
  render() {
    return (
      <View>
        <Image source={require('../images/Swiss.png')} style={styles.holes} />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  holes: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 10
  }
})
