import React from 'react'
import { StyleSheet, View, TouchableWithoutFeedback } from 'react-native'
const Hole = props => {
  const { index, handlePressEmpty } = props

  return (
    <View>
      <TouchableWithoutFeedback onPress={() => handlePressEmpty(index)}>
        <View style={styles.holes}></View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  holes: {
    backgroundColor: '#222',
    height: 110,
    width: 110,
    borderRadius: 55,
    margin: 10,
    marginTop: 15
  }
})

export default Hole
