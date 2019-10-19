import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Hole from './components/Hole'
import Swiss from './components/Swiss'

const emptyArray = [true, true, true, true, true, true, true, true, true]
const arrayIndexIndicator = -1
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
    true,
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
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [difficultyLevel, setDifficultyLevel] = useState(1.5)
  const [wackable, setWackable] = useState(false)

  const refreshBoard = () => {
    setTimeout(function() {
      const index = Math.floor(Math.random() * Math.floor(8))

      setHoles(emptyArray.map((curBool, i) => (i === index ? false : curBool)))
    }, 50)
  }
  let wackOpportunities = 0
  useInterval(() => {
    if (isRunning) {
      if (count.toFixed(2) >= 1 && count.toFixed(2) % difficultyLevel == 0) {
        setWackable(!wackable)
        setHoles(emptyArray)
        refreshBoard(emptyArray)
        wackOpportunities += 1
        if (wackOpportunities >= 5) {
          wackOpportunities = 0
          setDifficultyLevel(difficultyLevel - 0.25)
        }
      }

      setCount(prevCount => prevCount + 0.1)
    }
  }, 100)

  const handlePressEmpty = e => {
    console.log(e)
    setScore(score - 20)
  }

  const handlePress = index => {
    console.log(index)
    setScore(score + 10)
  }

  const handleStart = () => {
    console.log(isRunning)
    setIsRunning(!isRunning)
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
      <Button title='Start Wacking' onPress={e => handleStart(e)} />

      <View style={styles.container}>
        {holes.map((hole, i) => {
          return hole ? (
            <Hole
              key={i}
              index={i}
              handlePressEmpty={e => handlePressEmpty(e)}
            />
          ) : (
            <Swiss
              key={arrayIndexIndicator}
              index={arrayIndexIndicator}
              handlePress={e => handlePress(e)}
            />
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
