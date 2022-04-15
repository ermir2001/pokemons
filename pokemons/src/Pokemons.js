import React,{useState,useEffect} from "react";

const Pokemons = (pokemon) =>{
    const [details, setdetails] = useState("hidden");


    const handleClass = () => {
        if(details==="hidden"){
            setdetails("")
        }
        else{
            setdetails("hidden")
        }
    }

    useEffect(() => {
    }, [details]);

    return(
        <>
            <div className="main  main-div" onClick={e=>handleClass(e)}>
                <span className="header">#{pokemon.id} {pokemon.name.charAt(0).toUpperCase()+ pokemon.name.slice(1)}</span>

                <div  className="content">
                    <img style={{width: 100, height: 100}} src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}/>
                    {(pokemon.types.length===1)?(
                        <>
                    Type: {pokemon.types[0].type.name}
                        <div className={details}>
                            Height: {pokemon.height}<br/>
                            Weight: {pokemon.weight}
                        </div>
                        </>
                ):(
                    <>
                        Types:
                        {pokemon.types.map(element=>` ${element.type.name}`)}
                        <div className={details}>
                            Height: {pokemon.height}<br/>
                            Weight: {pokemon.weight}
                        </div>
                    </>
                )
                }
                </div>
            </div>

        </>
    )
}
export default Pokemons;
