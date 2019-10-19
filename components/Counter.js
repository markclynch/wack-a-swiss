import React, { useState, useEffect, useRef } from 'react'
import { Text } from 'react-native'

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

import React from 'react'

const Counter = () => {
  let [count, setCount] = useState(0)
  useInterval(() => {
    // Your custom logic here
    setCount(count + 0.1)
  }, 100)
  return <Text>{count}</Text>
}

export default Counter
