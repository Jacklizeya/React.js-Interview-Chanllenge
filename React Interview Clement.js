import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from "react"
import axios from "axios"

console.log("initial Mount")

function App() {


  console.log("*****enter app function component once")
  let [count, setCount] = useState(1)
  let [string, setString] = useState([])
  

  useEffect(
    ()=>{
    const getString = async() => {const {data} = await axios.get(`https://randomuser.me/api/?page={count}`, ); 
    console.log("data", data)
    setString(string => [data, ...string])
  } 
  // use something that not mutable 
    getString()
  },    
    [count])

  console.log("before return")

  return (
    <div className="App">
      <h1> Hello Code SandBox </h1>
      <h2> Start editing to see morre maginc happen ! </h2>
      <button className="test1" onClick={()=>{setCount(count+1)}}> load more page </button>
      
      <br></br> <br></br> <br></br> <br></br>
      {string.map((singleuser, ind) => (<div key={ind}>
        <p> {singleuser.length !== 0? singleuser.results[0].name.title: ""} </p>
        <p> {singleuser.length !== 0? singleuser.results[0].name.first: ""} </p>
        <p> {singleuser.length !== 0? singleuser.results[0].name.last: ""} </p>
        {singleuser.length !== 0? <img src={singleuser.results[0].picture.large} /> : ""}
        </div>))}

      
    </div>
  );
}

export default App;
