import React from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'

const Swiss = props => {
  const { index, handlePress } = props
  return (
    <View>
      <TouchableWithoutFeedback onPress={() => handlePress(index)}>
        <Image source={require('../images/Swiss.png')} style={styles.holes} />
      </TouchableWithoutFeedback>
    </View>
  )
}
const styles = StyleSheet.create({
  holes: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 10
  }
})
export default Swiss
