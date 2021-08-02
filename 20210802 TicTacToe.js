import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width':'60px',
  'height':'60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}

function Square ({content, id, count, DropMyStep}) {
    return (
      <div className="square" style={squareStyle} onClick={(event)=>{DropMyStep(count, id)}}>
        {content} 
      </div>
    );
  
}

function Board () {
    const [count, setCount] = useState(0)
    const [record, setRecord] = useState([["empty", "empty", "empty"], ["empty", "empty", "empty"], ["empty", "empty", "empty"]])
    const [winner, setWinner] = useState("None")
    const [nextPlayer, setNextPlayer] = useState("")

    function DropMyStep (count, id) {
      console.log("some click")
      if (winner !== "None") {return}
      let row = parseInt (id.charAt(0))
      let col = parseInt (id.charAt(1))
      if (record[row][col] !== "empty" || count === 9) {return}
      setRecord(record => {
        let recordCopy = [...record]
        if (count % 2 === 0) {recordCopy[row][col] = "X"} else {recordCopy[row][col] = "O"}
        console.log(recordCopy)
        return recordCopy
      } )
      setCount(count => count + 1)
      console.log("finish click")
    }

    useEffect(()=>{
      function judge(array) {
        if (
          record[0].every(element => element === "X") ||
          record[1].every(element => element === "X") ||
          record[2].every(element => element === "X") ||
          record[0][0] + record[1][0] + record[2][0] === "XXX" ||
          record[0][1] + record[1][1] + record[2][1] === "XXX" ||
          record[0][2] + record[1][2] + record[2][2] === "XXX" ||
          record[0][0] + record[1][1] + record[2][2] === "XXX" ||
          record[0][2] + record[1][1] + record[2][0] === "XXX") {setWinner("X"); return true} else if 
          (record[0].every(element => element === "O") ||
          record[1].every(element => element === "O") ||
          record[2].every(element => element === "O") ||
          record[0][0] + record[1][0] + record[2][0] === "OOO" ||
          record[0][1] + record[1][1] + record[2][1] === "OOO" ||
          record[0][2] + record[1][2] + record[2][2] === "OOO" ||
          record[0][0] + record[1][1] + record[2][2] === "OOO" ||
          record[0][2] + record[1][1] + record[2][0] === "OOO" 
        ) {setWinner("O"); return true} else {return false}
      }


      console.log("count is", count)
      if (count % 2 === 0  ) {setNextPlayer("X")} else {setNextPlayer("O")}
      if (judge(record)) {
        // The click function will stop work
        DropMyStep = ""
      }

    }, [count])

    function reset() {
      setRecord([["empty", "empty", "empty"], ["empty", "empty", "empty"], ["empty", "empty", "empty"]])
      setCount(0)
      setNextPlayer("")
      setWinner("None")
    }


    return (
      <div style={containerStyle} className="gameBoard">
        <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span> {nextPlayer} </span></div>
        <div id="winnerArea" className="winner" style={instructionsStyle} onClick={()=>{console.log("Click")}}>Winner: <span> {winner} </span></div>
        <button style={buttonStyle} onClick={reset}>Reset</button>
        <div style={boardStyle}>
          <div className="board-row" style={rowStyle}>
            <Square id="00" content = {record[0][0]} count={count} DropMyStep={DropMyStep}/>
            <Square id="01" content = {record[0][1]} count={count} DropMyStep={DropMyStep}/>
            <Square id="02" content = {record[0][2]} count={count} DropMyStep={DropMyStep}/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square id="10" content = {record[1][0]} count={count} DropMyStep={DropMyStep}/>
            <Square id="11" content = {record[1][1]} count={count} DropMyStep={DropMyStep}/>
            <Square id="12" content = {record[1][2]} count={count} DropMyStep={DropMyStep}/>
          </div>
          <div className="board-row" style={rowStyle}>
            <Square id="20" content = {record[2][0]} count={count} DropMyStep={DropMyStep}/>
            <Square id="21" content = {record[2][1]} count={count} DropMyStep={DropMyStep}/>
            <Square id="22" content = {record[2][2]} count={count} DropMyStep={DropMyStep}/>
          </div>
        </div>
      </div>
    );
  
}



export default function Game() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
      </div>
    );
  
}
