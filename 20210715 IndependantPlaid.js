import React , { useEffect, useState, useCallback } from 'react'
import { PlaidButton, Descriptiondiv} from './assetAndBudget.elements'
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from 'react-plaid-link';
import axios from "axios"
import {SubmitButton, Tablediv, Heading1, FormDiv, TableBottomData, Numbertd, tdContainButton} from "./assetAndBudget.elements"
import {  RiEditLine, RiDeleteBin6Line } from 'react-icons/ri';
import {  FaSortUp, FaSortDown } from "react-icons/fa"

export default function Plaid() {

    const [linkToken, setLinkToken] = useState(null);
    const generateToken = async () => {
      const {data} = await axios.get('/api/plaid/create-link-token',)
      console.log(data)
      setLinkToken(data.linkToken);
    };
    useEffect(() => {
      generateToken();
    }, []);

    return (
        <div>
            <Descriptiondiv> Import Data from your financial Institution  directly </Descriptiondiv>
            {linkToken != null ? <Link linkToken={linkToken} /> : <div></div>}
        </div>
    )
}

  const Link = ({linkToken}) => {


    const [assetFromPlaid, setAssetFromPlaid] = useState([])
    const [name, setName] = useState("")
    const [type, setType] = useState("asset")
    const [value, setValue] = useState(0)
    const [changeMonthToMonth, setChangeMonthToMonth] = useState(0)
    //  which one is going to be updated?
    const [editLocation, setEditLocation] = useState()

    const onSuccess = useCallback(async (public_token, metadata) => {
      // send public_token to server
      const {data} = await axios.post('/api/plaid/token-exchange', {public_token}, {headers : {"Content-Type": "application/json"}})
      setAssetFromPlaid(data)
      // Handle response ...
      console.log("data", data)
    }, []);
    const config = {
      token: linkToken,
      onSuccess,
    };
    const { open, ready } = usePlaidLink(config);



    function editPlaidItem(event) {
      let index = event.target.id
      // Right now I am using users[0], eventually it will be just one user, so need to fix this later
      let dataToEdit = assetFromPlaid[index]
      console.log(dataToEdit)
      setEditLocation(index)
      setName(dataToEdit.name)
      setType(dataToEdit.type)
      setValue(dataToEdit.value)
      setChangeMonthToMonth(dataToEdit.changeMonthToMonth)
    }

    function deletePlaidItem(event) {
      let index = event.target.id
      let newAssetFromPlaid = [...assetFromPlaid]
      newAssetFromPlaid.splice(index, 1)
      setAssetFromPlaid(newAssetFromPlaid)
    }

    function confirmEdit(event) {
    event.preventDefault()
    let newPlaidItem = {name: name.toLowerCase(), type: type, value: Number(value), changeMonthToMonth: Number(changeMonthToMonth)}
    console.log("newPlaidItem", newPlaidItem)
    let newAssetFromPlaid = [...assetFromPlaid]
    newAssetFromPlaid.splice(editLocation, 1, newPlaidItem)
    // synchronous update
    setAssetFromPlaid(newAssetFromPlaid)
    // reset everything here
    setName("")
    setType("asset")
    setValue(0)
    setChangeMonthToMonth(0)
    setEditLocation(null)
    }

    return (
      <div> 
        <PlaidButton onClick={() => {setAssetFromPlaid([]); open()}} disabled={!ready}>
        Import info from your financial institution
        </PlaidButton>
        

        {assetFromPlaid.length? 
            <div>
            <Tablediv>
            
            <table> 
                <thead>
                    <tr key="itemname">
                        <th id="name" > item name </th>
                        <th id="type" > type </th>
                        <th id="value" > value </th>
                        <th> changeMonthToMonth </th>
                        <th> edit </th>
                        <th> delete </th>
                    </tr>
                </thead>
                
                <tbody>
                {assetFromPlaid.map(
                    (assetFromPlaid, index) => 
                    <tr key={assetFromPlaid.name}>
                        <td> {assetFromPlaid.name} </td>
                        <td> {assetFromPlaid.type} </td>
                        <Numbertd value={assetFromPlaid.value}> {assetFromPlaid.value} </Numbertd>
                        <td> {assetFromPlaid.changeMonthToMonth} </td>    
                        <td> 
                            <a href="#plaidform">
                                <button id={index} onClick={editPlaidItem}> 
                                    <RiEditLine style={{"pointerEvents": 'none'}}></RiEditLine>
                                </button>
                            </a>
                        </td> 
                        <td>
                            <button id={index} onClick={deletePlaidItem}>
                                <RiDeleteBin6Line style={{"pointerEvents": 'none'}}></RiDeleteBin6Line>
                            </button> 
                        </td>     
                    </tr>
                    )} 
                </tbody>           
            </table> 
            <br/>
            <SubmitButton> Reviewed and accept all the data from {assetFromPlaid[0].name.split(" ")[0].toUpperCase()} </SubmitButton>
        </Tablediv> 
        
        <FormDiv>
        <div className="form" id="plaidform">
            <label> Edit items from Plaid  </label>
            <form onSubmit={confirmEdit}>
                <label> Name of the item </label>
                <input type="text" required value={name} onChange={(event)=>{setName(event.target.value)} }/> <br/>
                <label> Type </label>
                <select value={type} required onChange={(event)=>{setType(event.target.value)}}>
                    <option value="asset"> asset </option>
                    <option value="liability"> liability </option>
                    </select>   <br/>
                <label> value </label>
                <input type="text" required value={value} onChange={(event)=>{(setValue(event.target.value))}}/> <br/>
                <label> changeMonthToMonth </label>
                <input type="text" required value={changeMonthToMonth} onChange={(event)=>{setChangeMonthToMonth(event.target.value)}} /> <br/>
                <SubmitButton type="submit"> Change {name} </SubmitButton>
            </form>
    </div>         
    </FormDiv>
        </div>    
        
            : null}
      </div>

    );
  };
