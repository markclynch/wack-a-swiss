import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Hole from './components/Hole'
import Swiss from './components/Swiss'
import { getCurrentFrame } from 'expo/build/AR'

export default function App() {
  const [holes, setHoles] = useState([0, 0, 0, 0, 0, 0, 0, 1, 0])
  let x = -1
  return (
    <View>
      <Text style={styles.title}>Wack'a'Swiss</Text>
      <View style={styles.container}>
        {holes.map(hole => {
          x += 1
          return hole == 0 ? <Hole key={x} /> : <Swiss key={x} />
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'green',
    marginTop: 75,
    alignSelf: 'center'
  }
})
