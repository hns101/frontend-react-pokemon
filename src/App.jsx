import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import pokeApiLogo from "./assets/pokeapi_256.png";

function App() {

    const API_URI = 'https://pokeapi.co/api/v2/pokemon/charmander';
    const [data, setData] = useState([]);


    const fetchData = async () => {
        try {
            const response = await axios.get(API_URI);
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    }


        useEffect(() => {
            fetchData();
        }, [])

        return (
            <>
                <h1>Pokedex</h1>
                <img src={pokeApiLogo} className="poke-api-logo" alt="Poke API Logo"/>
                <main className="main">

                    <div className="poke-card">
                        <p>{data.name}</p>
                        <p>Weigth {data.weight}</p>
                        <p>{data.moves?.length || 0}</p>
                    </div>

                </main>


            </>
        )
}

export default App
