import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import Hole from './components/Hole'
import Swiss from './components/Swiss'
import { Audio } from 'expo-av'

const emptyArray = [true, true, true, true, true, true, true, true, true]
// const arrayIndexIndicator = -1
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
  const [wackable, setWackable] = useState(true)
  const [lives, setLives] = useState(5)
  //Start with a fresh board of empty holes, 1/4 second before new Swiss loaded
  const refreshBoard = () => {
    setTimeout(function() {
      const index = Math.floor(Math.random() * Math.floor(8))
      setWackable(true)
      setHoles(emptyArray.map((curBool, i) => (i === index ? false : curBool)))
    }, 250)
  }

  useInterval(() => {
    if (isRunning) {
      if (
        count.toFixed(1) == 0.1 ||
        (count.toFixed(1) >= 1 && count.toFixed(1) % difficultyLevel == 0)
      ) {
        setHoles(emptyArray)
        refreshBoard(emptyArray)
      }

      setCount(prevCount => prevCount + 0.1)
    }
  }, 100)

  const handlePressEmpty = e => {
    if (isRunning) {
      setLives(lives - 1)
      setScore(score - 21)
    }
  }

  const handlePress = index => {
    if (isRunning) {
      console.log(index)
      setScore(score + 16)
      console.log('index')
      setWackable(false)
      setTimeout(function() {
        refreshBoard(holes)
      }, 300)
    }
  }

  const handleStart = () => {
    console.log(isRunning)
    setIsRunning(!isRunning)
  }

  const handleReset = () => {
    setIsRunning(false)
    setCount(0)
    setScore(0)
    setLives(5)
    setHoles(emptyArray)
  }

  return lives > 0 ? (
    <View>
      <Text style={styles.title}>Wack'a'Swiss</Text>

      <Button
        title={!isRunning ? 'START WACKING' : 'PAUSE'}
        titleStyle={{
          fontSize: 26
        }}
        buttonStyle={{
          backgroundColor: 'rgb(79, 185, 77)'
        }}
        containerStyle={{ marginLeft: 100, marginRight: 100 }}
        onPress={e => handleStart(e)}
      />
      <Button
        title='RESET'
        titleStyle={{
          fontSize: 26
        }}
        containerStyle={{
          marginLeft: 100,
          marginRight: 100,
          marginTop: 10
        }}
        buttonStyle={{
          backgroundColor: 'red'
        }}
        onPress={e => handleReset(e)}
      />

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
              key={i}
              index={i}
              handlePress={e => handlePress(e)}
              wackable={wackable}
            />
          )
        })}
      </View>
      <View style={{ alignItems: 'center', backgroundColor: 'red' }}>
        <View style={styles.row}>
          <View>
            <Text style={styles.subTitle}>{`Score:${score} `}</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>{`Time: ${count.toFixed(1)}`}</Text>
          </View>
          <View>
            <Text style={styles.subTitle}>{`Lives: ${lives}`}</Text>
          </View>
        </View>
      </View>
    </View>
  ) : (
    <View style={styles.loser}>
      <Text style={styles.loserText}>Game Over</Text>
      <Text style={styles.loserText}>{`Final Score: ${score}`}</Text>
      <Button
        title='Start Over'
        titleStyle={{
          fontSize: 26
        }}
        containerStyle={{
          marginLeft: 100,
          marginRight: 100,
          marginTop: 10
        }}
        buttonStyle={{
          backgroundColor: 'red'
        }}
        onPress={e => handleReset(e)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: 'rgb(79, 185, 77)',
    marginTop: 50,
    marginBottom: 20,
    alignSelf: 'center'
  },
  subTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 50,
    marginBottom: 50,
    alignContent: 'center'
  },
  loserText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'rgb(79, 185, 77)',
    marginTop: 15,
    alignSelf: 'center'
  },
  loser: {
    marginTop: 200
  }
})
