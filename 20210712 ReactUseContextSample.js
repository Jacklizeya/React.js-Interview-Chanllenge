// in App.js

import React from "react"
import Display from "./Display"

export const NumberContext = React.createContext()

export default function App() {
  // Use the Provider to make a value available to all
  // children and grandchildren
  return (
    <NumberContext.Provider value={42}>
      <div>
        <Display />
      </div>
    </NumberContext.Provider>
  );
}

// in Display.js

import React, {useContext} from 'react'
import {NumberContext} from "./App.js"


export default function Display() {
    // Use the Consumer to grab the value from context
    // Notice this component didn't get any props!
    const value = useContext(NumberContext)


    return (
        <div>The answer is {value + 10}.</div>
    )
  }
