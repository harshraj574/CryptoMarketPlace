import './Navbar.css'
import { ArrowUpRightIcon } from '@heroicons/react/24/solid'
import Logo from '../../assets/logo2.jpg' 
import { useContext } from 'react'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

function Navbar(){

    const {setCurrency} = useContext(CoinContext);

    function currencyChange(event){
        switch (event.target.value){
            case "usd" : {
                setCurrency({name: "usd",symbol: "$"});
                break;
            }
            case "inr" : {
                setCurrency({name: "inr",symbol: "₹"});
                break;
            }
            case "eur" : {
                setCurrency({name: "eur",symbol: "€"});
                break;
            }
            default : {
                setCurrency({name: "usd",symbol: "$"});
                break;
            }
        }


    }
    return (
        <>
          <div className='navbar'>
            <Link to={`/`}>
            <img src={Logo} alt="logo" className='logo' />
            </Link>
            <ul>
                <li>Cryptocurrencies</li>
                <li>Exchanges</li>
                <li>NFT</li>
                <li>Learn</li>
                <li>Products</li>
            </ul>
            <div className='nav-right'>
                <select onChange={currencyChange}>
                    <option value="usd">USD</option>
                    <option value="inr">INR</option>
                    <option value="eur">EURO</option>
                </select>
                <button className='nav-btn'>Sign Up <ArrowUpRightIcon className='size-4'/></button>
            </div>

          </div>
        
        </>

    )
}

export default Navbar;