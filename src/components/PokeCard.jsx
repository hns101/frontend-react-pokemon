import './PokeCard.css'

function PokeCard({data}) {
    return (
        <>

            <div className="poke-card">
                <p className="card-name">{data.name}</p>
                <img className="poke-image" src={data.sprites.front_default} alt="Poke Image"/>
                <p className="poke-text"><b>Moves:</b> {data.moves.length}</p>
                <p className="poke-text"><b>Weigth:</b> {data.weight}</p>
                <b className="poke-text">Abilities:</b>
                {data.abilities.map(data => (<p className="ability" key={data.ability.name}>{data.ability.name}</p>))}
            </div>

        </>
    );
}

export default PokeCard;