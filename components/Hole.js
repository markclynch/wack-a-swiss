import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
export default class Hole extends Component {
  render() {
    return <View style={styles.holes}></View>
  }
}
const styles = StyleSheet.create({
  holes: {
    backgroundColor: '#222',
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 10
  }
})
