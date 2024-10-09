import { useContext, useEffect, useState } from 'react';
import './Coin.css'
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import Chart from "chart.js/auto";
import { CategoryScale, LinearScale } from "chart.js";
import LineChart from "./LineChart.jsx";



function Coin(){

    const {coinId} = useParams();
    const [coinData,setCoinData] = useState();
    const {currency} = useContext(CoinContext);
    const [chartData, setChartData] = useState();

   async function fetchCoinData(){
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
    .then(response => response.json())
    .then(response =>{ 
        console.log("coin data",response);
        setCoinData(response);
    })
    .catch(err => console.error(err));
   }

   async function fetchCoinChart(){
    const options = {method: 'GET', headers: {accept: 'application/json'}};

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
    .then(response => response.json())
    .then(response =>{
         console.log(response);
         setChartData(response);
        })
    .catch(err => console.error(err));
   }


   useEffect(()=>{
    fetchCoinData();
    fetchCoinChart();
   },[currency]);

   if(coinData && chartData){
    return (
        <>
        <div className='coin'>
            <div className="coinName">
                <img src={coinData.image.large} alt="coinImage" />
                <p><b>{coinData.name} ({coinData.symbol.toUpperCase()})</b></p>
            </div>
            <div className='coinChart'>
            <LineChart chartData={chartData} />
            <div className='coin-info'>
            <p><b>Market Data Cap Change: {currency.symbol}{coinData.market_data.market_cap_change_24h.toLocaleString()}</b></p>
            <p><b>Price Change 24h: {currency.symbol}{coinData.market_data.price_change_24h}</b></p>
            </div>
           
            </div>   
        </div>
        
        </>
    )
   }
   else{
    return (
        <>
        <div className='spinner'>
            <div className="spin">

            </div>
           
            
        </div>  
        </>
    )

   }


}

export default Coin;