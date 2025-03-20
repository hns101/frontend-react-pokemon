import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PokeCard from "./components/PokeCard.jsx";

function App() {

    const API_URI = 'https://pokeapi.co/api/v2/pokemon/charmander';
    const API_URI_ZAPDOS = 'https://pokeapi.co/api/v2/pokemon/zapdos';
    const API_URI_ALL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

    const [data, setData] = useState();
    const [dataZap, setDataZap] = useState();
    const [allData, setAllData] = useState();


    const fetchData = async () => {
        try {
            const response = await axios.get(API_URI);
            setData(response.data);
            console.log(response.data);
            const response1 = await axios.get(API_URI_ZAPDOS);
            setDataZap(response1.data);
            console.log(response1.data);
            const result = await axios.get(API_URI_ALL);
            console.log(result.data);
            setAllData(result.data);
        } catch (error) {
            console.error(error);
        }
    }


        useEffect(() => {
            fetchData();
        }, [])

        return (
            <>
                <header className="header">
                <h1>Pokedex</h1>
                </header>
                <main className="main">

                    {data && <PokeCard data={data} />}
                    {dataZap && <PokeCard data={dataZap} />}

                </main>


            </>
        )
}

export default App
