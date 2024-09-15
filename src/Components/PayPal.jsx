import { useContext } from "react"
import { AmountContext, CurrencyContext } from "../App"
import { CURRENCIES } from "../Utils/CurrencyUtils"

const PayPal = () =>{

    const currency = useContext(CurrencyContext)
    const amount = useContext(AmountContext)
    console.log(currency,amount)
    
    return(
        <>
        <h3>PayPal</h3>
        <p>{currency.currency},{amount.amount} = {amount.amount * CURRENCIES[currency.currency]}</p>
       
        </>
    )
}
export default PayPal