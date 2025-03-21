import './App.css'
import {useEffect, useState} from "react";
import axios from "axios";
import PokeCard from "./components/PokeCard.jsx";
import pokelogo from "./assets/pokeapi_256.png"

function App() {

    const API_URI_ALL = 'https://pokeapi.co/api/v2/pokemon/?limit=20';

    const [allData, setAllData] = useState();
    const [allPokemon, setAllPokemon] = useState();
    const [disabledPrev, setDisabledPrev] = useState(false);
    const [disabledNext, setDisabledNext] = useState(false);


    // Fetch Pokémon list
    const fetchData = async () => {
        try {
            const result = await axios.get(API_URI_ALL);
            setAllData(result.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Fetch Pokémon details
    const hatchAllPokemons = async () => {
        if (!allData?.results) return;

        try {
            const pokemonData = await Promise.all(
                allData.results.map(async (data) => {
                    const response = await axios.get(data.url);
                    return response.data;
                })
            );
            setAllPokemon(pokemonData);
        } catch (error) {
            console.error("Error fetching Pokémon:", error);
        }
    };

    // Fetch Next Page
    const fetchNextData = async () => {
        if (allData?.next) {
            try {
                const result = await axios.get(allData.next);
                setAllData(result.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Fetch Previous Page
    const fetchPrevData = async () => {
        if (allData?.previous) {
            try {
                const result = await axios.get(allData.previous);
                setAllData(result.data);
            } catch (error) {
                console.error(error);
            }
        }
    };

    // Fetch data on mount
    useEffect(() => {
        fetchData();
    }, []);

    // Update Pokémon list and button states when `allData` changes
    useEffect(() => {
        if (allData) {
            hatchAllPokemons(); // Run `allData` is ready

            // enable/disable buttons
            setDisabledPrev(!allData.previous);
            setDisabledNext(!allData.next);
        }
    }, [allData]);


    return (
        <>
            <header className="header">
                <img src={pokelogo} className="poke-logo"/>
                <div className="poke-nav">
                    <button type="button"
                            disabled={disabledPrev}
                            onClick={fetchPrevData}
                    >◀
                    </button>
                    <h2 className="pokedex">Pokédex</h2>
                    <button type="button"
                            disabled={disabledNext}
                            onClick={fetchNextData}
                    >▶
                    </button>
                </div>


            </header>
            <main className="main">

                {allPokemon && allPokemon.length > 0 ? (<div className="poke-outer-container">
                        {allPokemon.map(allpokemon => (
                            <PokeCard data={allpokemon} key={allpokemon.name}/>))
                        }</div>
                ) : (
                    <p>Loading...</p>
                )}
            </main>

        </>
    )
}

export default App
