import logo from './logo.svg';
import './App.css';
import Payment from './Components/Payment';
import { createContext, useState } from 'react';
import { CURRENCIES } from './Utils/CurrencyUtils';

export const CurrencyContext = createContext("usd")

export const AmountContext = createContext(0)

function App() {

  let[currency,setCurrency] = useState('USD')
  let [amount,setAmount] = useState(0);

  const updateAmount = (value) =>{
    setAmount(value);
    
    
  }

  const changeCurrency = (currency) =>{
    setCurrency(currency)
    
  }

  
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
    </>
  );
}

export default App;
