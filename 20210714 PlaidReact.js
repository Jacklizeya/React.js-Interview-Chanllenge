import React , { useEffect, useState, useCallback } from 'react'
import { PlaidButton, Descriptiondiv} from './assetAndBudget.elements'
import { usePlaidLink, PlaidLinkOptions, PlaidLinkOnSuccess } from 'react-plaid-link';
import axios from "axios"

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
    const onSuccess = useCallback(async (public_token, metadata) => {
      // send public_token to server
      const {data} = await axios.post('/api/plaid/token-exchange', {public_token}, {headers : {"Content-Type": "application/json"}})
      
      // Handle response ...
      console.log("data", data.accounts)
    }, []);

    const config = {
      token: linkToken,
      onSuccess,
    };

    const { open, ready } = usePlaidLink(config);
    return (
      <PlaidButton onClick={() => open()} disabled={!ready}>
        Add asset info from your financial institution
      </PlaidButton>
    );
  };

