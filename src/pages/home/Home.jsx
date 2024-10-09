import './Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { useContext, useState , useEffect} from 'react';
import { CoinContext } from '../../context/CoinContext';
import { Link } from 'react-router-dom';


function Home(){

    const {allCoin, currency} = useContext(CoinContext);
    const [displayCoin, setDisplayCoin] = useState([]);
    const [input,setInput] = useState('');

    function inputHandler(event){
        setInput(event.target.value);
        if(event.target.value === ''){
            setDisplayCoin(allCoin);

        }
    }
    async function searchHandler(event){
        event.preventDefault();
       const coins =  await allCoin.filter((item)=>{
          return  item.name.toLowerCase().includes(input.toLowerCase())
        })
        setDisplayCoin(coins);
    }

    useEffect(()=>{
        setDisplayCoin(allCoin);
        console.log("setDisplayCoin changed");
    },[allCoin])


    return(
        <>
        <div className='home'>
            <div className='hero'>
                <h1>Cryptocurrency Prices by Market Cap</h1>
                <p>
                    The global cryptocurrency market cap today is $2.27 Trillion,a <FontAwesomeIcon icon={faCaretDown} className='caretDown' /><span style={{color:"red"}}>2.0%</span> change in the last 24 hours.
                </p>
                <form onSubmit={searchHandler}>
                    <input type="text" placeholder='Search' onChange={inputHandler} value={input} required />
                    <button type='submit' className='formBtn'>Search</button>
                </form>
            </div>
            <div className="cryptoTable">
                <div className="table-layout">
                    <p>#</p>
                    <p>Coins</p>
                    <p>Price</p>
                    <p>24h</p>
                    <p>24h Volume</p>
                    <p className='marketCap'>Market Cap</p>
                </div>
                {
                    displayCoin.slice(0,20).map((item,index)=>(
                        <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
                            <p>{item.market_cap_rank}</p>
                            <div>
                                <img src={item.image} alt="coinLogo" />
                                <p>{item.name+" "+item.symbol}</p>
                            </div>
                            <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
                            <p className={item.price_change_percentage_24h>0?"green":"red"}>
                                {Math.floor(item.price_change_percentage_24h*100)/100}
                            </p>
                            <p>{currency.symbol}{item.total_volume.toLocaleString()}</p>
                            <p className='marketCap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
                        </Link>
                    ))
                }
            </div>
        </div>
        </>
    )
}

export default Home;