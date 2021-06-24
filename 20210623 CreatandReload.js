// Using a button to create, setState to activate useEffect
// In useEffect, reset it, will run twice, but it is totally OK


import React, {useState, useEffect} from 'react';
import axios from "axios"


function Budget() {

    const [users, setUsers] = useState([])   
    const [name, setName] = useState("")
    const [amount, setAmount] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [status, setStatus] = useState(0)

    useEffect(() => {
        async function getUsers() {
            let {data} = await axios.get("/api/user", )
            console.log(data)
            setUsers(data)
        }
        console.log("enter use Effect")
        getUsers()
        setStatus(0)
    }, [status])

    async function addNewCashFlow(event, id) {
        event.preventDefault()
        let newCashFlow = {name, amount, changeMonthToMonth, startDate, endDate}
        console.log("newCashFlow", newCashFlow)
        let {data} = await axios.put(`/api/user/addcashflow/${id}`, newCashFlow, {headers : {"Content-Type": "application/json"}})
        if (data.ok) {
            setName("")
            setAmount(0)
            setChangeMonthToMonth(0)
            setStartDate("")
            setEndDate("")
            setStatus(data.ok)
        }
    }
// at line 46, right now I am only showing one, eventually will be changed
 return (
    <>
        <h1> CashFlow </h1>
        {users? users.map((user, index) => (

            index === 0 ? 
            <div className="eachUser" key={user.firstName}>
                {user.firstName}
                {user.lastName}
                {user.email}
                {user.address}
                {user.phoneNumber}

                    <table> 
                        <thead>
                            <tr>
                                <th> item name </th>
                                <th> amount </th>
                                <th> changeMonthToMonth </th>
                                <th> startDate </th>
                                <th> endDate </th>
                            </tr>
                        </thead>
                        <tbody>

                        {user.cashFlow.map(
                            (singleCashFlow, index) => 

                            <tr key={singleCashFlow.name + index}>
                                <td> {singleCashFlow.name} </td>
                                <td> {singleCashFlow.amount} </td>
                                <td> {singleCashFlow.changeMonthToMonth} </td>
                                <td> {singleCashFlow.startDate} </td>
                                <td> {singleCashFlow.endDate} </td>                   
                            </tr>
                            )} 

                        </tbody>                 
                    </table>    
                
                <br/> 
                <div className="form">
                    Add new item 
                    <form onSubmit={(event) => addNewCashFlow(event, user._id)}>
                        <label> Name of the item </label>
                        <input type="text" value={name} onChange={(event)=>{setName(event.target.value)}}/> <br/>
                        <label> amount </label>
                        <input type="text" value={amount} onChange={(event)=>{setAmount(event.target.value)}}/> <br/>
                        <label> changeMonthToMonth </label>
                        <input type="text" value={changeMonthToMonth} onChange={(event)=>{setChangeMonthToMonth(event.target.value)}} /> <br/>
                        <label> startDate YYYY-MM-DD </label>
                        <input type="text" value={startDate} onChange={(event)=>{setStartDate(event.target.value)}} /> <br/>
                        <label> endDate YYYY-MM-DD </label>
                        <input type="text" value={endDate} onChange={(event)=>{setEndDate(event.target.value)}} /> <br/>
                        <button display="block" type="submit"> Submit </button>
                        <div> End of Form </div>
                    </form>
                </div>
                <br/>         
            </div> : ""
        )) : <div> No data yet </div>}
    
    
    </>
 )
}

export default Budget;
