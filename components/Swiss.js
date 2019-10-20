import React from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback } from 'react-native'

const Swiss = props => {
  const { index, handlePress, wackable } = props
  return wackable ? (
    <View>
      <TouchableWithoutFeedback onPress={() => handlePress(index)}>
        <Image source={require('../images/Swiss.png')} style={styles.holes} />
      </TouchableWithoutFeedback>
    </View>
  ) : (
    <View>
      <Image source={require('../images/pow.png')} style={styles.holes} />
    </View>
  )
}
const styles = StyleSheet.create({
  holes: {
    height: 110,
    width: 110,
    borderRadius: 55,
    margin: 10,
    marginTop: 20
  }
})
export default Swiss
