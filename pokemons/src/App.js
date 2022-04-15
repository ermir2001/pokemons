import React,{useState,useEffect} from "react";
import Pokemons from "./Pokemons";




const App = () => {
    const [pokemonSearch, setPokemonSearch] = useState("");
    const [submit, setSubmit] = useState(false);
    const [pokemonTableID, setPoakemonTableID] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    const [pokemonsListID, setPokemonsListID] = useState(20);
    const [pokemonList, setPokemonList] = useState();
    const [pokeApi, setPokeApi] = useState("https://pokeApi.co/api/v2/pokemon/");
    //const [typeTable, setTableType] = useState();
    const [theme, setTheme] = useState("lightTable")


    const handleMore = (e) => {
        e.preventDefault();
        if(pokemonsListID===20)
        {
            setPokemonsListID(prev=>prev-20+20)
        }
        setPokemonsListID(prev=>prev+20);
        for (let i = pokemonTableID.length + 1; i < pokemonsListID + 21; i++) {
            setPoakemonTableID(prev => [...prev, i]);
        }
    }
    const handleTheme = (e, state) => {
        e.preventDefault();
        if(theme==="lightTable"){
            setTheme("darkTable");
        }
        else{
            setTheme("lightTable");
        }
    };


    const handleSubmit = (e, state) => {
        e.preventDefault();
        setSubmit(state);
        setPokeApi(`https://pokeApi.co/api/v2/pokemon/${pokemonSearch}`)
    };

    const handleChange = (event) => {
        let pokemonName = event.target.value;
        setPokemonSearch(pokemonName.toLowerCase());
        setSubmit(false);
    }

    useEffect(() => {

        if (pokeApi === "https://pokeApi.co/api/v2/pokemon/") {
            Promise.all(pokemonTableID.map(id => fetch(pokeApi + id)))
                .then(results => Promise.all(results.map(r => r.json())))
                .then(pokemons => {
                    setPokemonList(pokemons)
                })

            // fetch('https://pokeapi.co/api/v2/type')
            //     .then(response => response.json())
            //     .then(data => {
            //         setTableType(data.results.map(element => element.name));
            //     })
            //     .catch(error => console.log("ERROR", error))
        } else {
            //let type = typeTable.map((element=>(element===pokemonSearch)?true:false));
            //let count = 0;
            // type.forEach((element=>(element===true)?count=1:null));
            // if(count===1){
            //      fetch(`https://pokeapi.co/api/v2/type/${pokemonSearch}`)
            //          .then(response => response.json())
            //             .then(pokemons => {
            //                 console.log(pokemons.pokemon)
            //             console.log(pokemons.pokemon.pokemon.name)
            //             setPokemnList(pokemons.pokemon)
            //         }).catch(error => error);
            // }
            //else{
            let tab = [1];
            Promise.all(tab.map(() => fetch(pokeApi)))
                .then(results => Promise.all(results.map(r => r.json())))
                .then(pokemons => {
                    setPokemonList(pokemons)
                }).catch(() => alert("Can't find Pokemon with this id/name "));
            //}
        }
    }, [pokeApi, pokemonTableID]);


    return (
        <>
            <form onSubmit={(e) => handleSubmit(e, true)}>
                <label>
                    Find Pokemon:
                    <input type="text" onChange={handleChange} value={pokemonSearch} name="pokemonName"/>
                </label>
                <input className="button" type="submit" value="Send"/>
            </form>

            <button className="button" onClick={handleTheme}>Theme</button>
            {
                (!pokemonList?.length) ? (
                    <span>czekaj...</span>
                ) : (


                    <div className={"app "+ theme}>
                        {
                            pokemonList.map((pokemon) => (
                                    <Pokemons key={pokemon.id} {...pokemon}/>
                                )
                            )
                        }
                    </div>
                )
            }
            {
                (pokemonList?.length===1) ?
                     null : <button className="button" onClick={(e) => handleMore(e)}>More</button>
            }
        </>
    )

}

export default App;

