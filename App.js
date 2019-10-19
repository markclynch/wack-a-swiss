import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Hole from './components/Hole'
import Swiss from './components/Swiss'
//import { getCurrentFrame } from 'expo/build/AR'
function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}

export default function App() {
  const [holes, setHoles] = useState([
    false,
    true,
    true,
    true,
    true,
    true,
    true,
    true,
    true
  ])
  const [score, setScore] = useState(0)
  let [count, setCount] = useState(0)

  let x = -1

  let difficultyLevel = 10
  let emptyArray = [true, true, true, true, true, true, true, true, true]
  const updateHoles = newHoles => {
    setHoles(newHoles)
  }
  const refreshBoard = () => {
    const newHoles = holes.slice()
    setHoles(emptyArray)
    setTimeout(function() {
      const index = Math.floor(Math.random() * Math.floor(8))
      console.log(index)
      newHoles[index] = !newHoles[index]
      updateHoles(newHoles)
    }, 500)
  }

  useInterval(() => {
    if (count.toFixed(2) > 1 && count.toFixed(2) % difficultyLevel == 0) {
      refreshBoard()
    }

    setCount(count + 0.1)
  }, 100)

  const handlePressEmpty = e => {
    console.log(e)
    setScore(score - 20)
  }

  const handlePress = index => {
    console.log(index)
    setScore(score + 10)
  }

  return (
    <View>
      <Text style={styles.title}>Wack'a'Swiss</Text>
      <View>
        <Text style={styles.subTitle}>{`Current Score:${score} `}</Text>
      </View>
      <View>
        <Text style={styles.subTitle}>{`Seconds passed: ${count.toFixed(
          2
        )}`}</Text>
      </View>
      <View style={styles.container}>
        {holes.map(hole => {
          x += 1
          return hole ? (
            <Hole
              key={x}
              index={x}
              handlePressEmpty={e => handlePressEmpty(e)}
            />
          ) : (
            <Swiss key={x} index={x} handlePress={e => handlePress(e)} />
          )
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
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'red',
    marginTop: 10,
    alignSelf: 'center'
  }
})
