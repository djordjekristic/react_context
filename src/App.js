import logo from './logo.svg';
import './App.css';
import Payment from './Components/Payment';
import { createContext, useEffect, useReducer, useState } from 'react';
import { CURRENCIES } from './Utils/CurrencyUtils';
import { type } from '@testing-library/user-event/dist/type';
import { userReducer, initialUserState, loadUserState } from './Reducers/Users';

export const CurrencyContext = createContext("usd")

export const AmountContext = createContext(0)

function App() {

  const [userState, dispatch] = useReducer(userReducer, loadUserState())

  let[currency,setCurrency] = useState('USD')
  let [amount,setAmount] = useState(0);

  

  
  

  const updateAmount = (value) =>{
    setAmount(value);
    
    
  }

  const changeCurrency = (currency) =>{
    setCurrency(currency)
    
  }

  const saveUser = () =>{

    if(userState.userName === null  || userState.money === null || isNaN(userState.money)){
      return;
      
    }
    dispatch({type: "SET_ISUSERCREATED", payload: true})
    
  }
  useEffect(() =>{
    if(userState.isUserCreated){
      localStorage.setItem("userState", JSON.stringify(userState))
    }
  }, [userState])

  
  return (
    <>
    <CurrencyContext.Provider value={{currency, changeCurrency}}>
      <AmountContext.Provider value = {{amount,updateAmount}}>
         <Payment/>
      </AmountContext.Provider>
      
    </CurrencyContext.Provider>
    <input onInput={e => updateAmount(e.currentTarget.value)} type="number" />
    <select onChange={e => changeCurrency(e.target.value)}>
      {Object.keys(CURRENCIES).map(currency => (
        <option key={currency} value={currency}>{currency}</option>
      ))}

    </select>
    {!userState.isUserCreated &&
      <form>
      <input  placeholder='User name' onInput={e => dispatch({type: "SET_USERNAME", payload: e.target.value})} type="text" />
      <input  placeholder='Money' onInput={e => dispatch({type: "SET_MONEY", payload: e.target.value})}/>
      <button onClick={saveUser} type='button'>Create user</button>
  </form>
    }
    
    
    </>
  );
}

export default App;
