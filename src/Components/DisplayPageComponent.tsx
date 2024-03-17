import React from 'react'
import pokeball from '../Components/assets/pokeball.png'
import testImg from '../Components/assets/testIMG.png'
import { useState, useEffect } from 'react'
import { Button, Modal } from 'flowbite-react';
import { pokeLocationFetch, getPokeEvolutionsFetch, getPokeFetch, getPokeName } from '../DataService/DataService'
import { IPokeAbilities, IPokeMoves, IPokeType } from '../Interfaces/Interface';



const DisplayPageComponent = () => {



        const [dataPokemon, setDataPokemon] = useState<any>([]);

        const [pokemonNameText, setpokemonNameText] = useState<string>('');
        const [pokeID, setpokeID] = useState<string>('');
        const [pokemonType, setPokemonType] = useState<IPokeType[]>([]);
        const [pokeIMG, setpokeIMG] = useState<string>('');
        const [pokeLocation, setpokeLocation] = useState<string>('');
        const [pokeMoves, setpokeMoves] = useState<IPokeMoves[]>([]);
        const [pokeAbilities, setpokeAbilities] = useState<IPokeAbilities[]>([]);

        const [pokeEvolutions, setpokeEvolutions] = useState<any>([]);
        const [searchInput, setsearchInput] = useState<string>('1');
        const [savedInput, setSavedInput] = useState<string>('1');

        const [localStorageItems, setLocalStorageItems] = useState<string>('1');
        const [addToFavs, setaddToFavs] = useState<string>('hidden');
        const [favoriteDisplay, setFavoriteDisplay] = useState<any>([]);
    
        const [onLoad, setOnLoad] = useState<boolean>(true);
        
        useEffect(() => {

            getLocalStorage();

            const getPokeFetchData = async () => {
                const pokemonData = await getPokeFetch(savedInput);
                console.log(pokemonData);
                const callName = await getPokeName(savedInput);
                const pokeLocation = await pokeLocationFetch(savedInput);
                setLocalStorageItems(`${pokemonData.id}`);
                setDataPokemon(pokemonData);
                setPokemonType(pokemonData.types);
                setpokemonNameText(callName.name[0].toUpperCase()+callName.name.substring(1));
                setpokeID(pokemonData.id);
                setpokeIMG(pokemonData.sprites.other["official-artwork"].front_default);
                setpokeMoves(pokemonData.moves);
                setpokeAbilities(pokemonData.abilities);
                if(pokeLocation.length === 0){
                    setpokeLocation('N/A');
                }else{
                    setpokeLocation(pokeLocation[0].location_area.name.split("-").join(" "));
                }
    
            }
        
            // if (pokemonData.id > 649) {
            //     alert("Gen 1 to 5");
            // }

    
            const pokemonEvolution = async () => {
                let evoArray:any = [];
                let pokeEvolution:string[] = [];
                const data2 = await getPokeEvolutionsFetch(savedInput);
                let evolutionPush = data2.chain.species.url;
                let evolutionPush2 = evolutionPush.substring(42, 50);
    
                pokeEvolution.push(evolutionPush2.slice(0, -1));
                if(data2.chain.evolves_to !== null){
                    data2.chain.evolves_to.map((evolution:any) => {
                        pokeEvolution.push(evolution.species.url.substring(42, 50).slice(0, -1));
                        return pokeEvolution;
                    });
                    if(data2.chain.evolves_to.length !== 0 && data2.chain.evolves_to.length !== 0){
                        data2.chain.evolves_to[0].evolves_to.map((evolution:any) => {
                            pokeEvolution.push(evolution.species.url.substring(42, 50).slice(0, -1));
                            return pokeEvolution;
                        });
                    }
                }
    
                for(let i = 0; i<pokeEvolution.length; i++){
                    const promise:any = await getPokeFetch(pokeEvolution[i]);
                    evoArray.push(promise);
                }
                setpokeEvolutions(evoArray);
                return pokeEvolutions;
    
            }
    
            const pokemonFavorites = async() => {
                let favorites:string[] = getLocalStorage();
                let favArray:any = [];
    
                for(let i = 0; i<favorites.length; i++){
                    const promise:any = await getPokeFetch(favorites[i]);
                    favArray.push(promise);
                }
                setFavoriteDisplay(favArray);
                return favoriteDisplay;
    
            }
            
            getPokeFetchData();
            pokemonEvolution();
            pokemonFavorites();
            setsearchInput('');
    
        }, [onLoad])
    
    
        const shinyPokemon = async() => {
            const pokemonData:any = await getPokeFetch(savedInput);
            if(pokeIMG === pokemonData.sprites.other["official-artwork"].front_default){
                setpokeIMG(pokemonData.sprites.other["official-artwork"].front_shiny);
            }else{
                setpokeIMG(pokemonData.sprites.other["official-artwork"].front_default);
            }
        }
    
        const randomPokemon = () => {
            let random:number = Math.floor(Math.random() * 649) + 1;
            setSavedInput(`${random}`);
        }
    
        const openFavorites = () => {
            if(addToFavs === 'hidden'){
                setaddToFavs('');
            }else {
                setaddToFavs('hidden');
            }
        }
    
        const handleFavorites = () => {
            if(!getLocalStorage().includes(`${dataPokemon.id}`)){
                saveToLocalStorage(localStorageItems);
                alert("added to favorite pokemon")
            }else{
                removeFromLocalStorage(localStorageItems);
                alert("Removed from favorite pokemon");
            }
        }
    
        const onLoadPage = () => {
            setOnLoad(!onLoad);
        }
    
        const saveToLocalStorage = (pokemon:string) => {
            let favorites:string[] = getLocalStorage();
        
            if(!favorites.includes(pokemon)){
                favorites.push(pokemon);
            }
        
            localStorage.setItem("Favorite Pokemon", JSON.stringify(favorites));
        }
        
        const getLocalStorage = () => {
            let localStorageData = localStorage.getItem("Favorite Pokemon");
        
            if(localStorageData == null){
                return [];
            }
        
            return JSON.parse(localStorageData);
        
        }
        
        const removeFromLocalStorage = (pokemon:string) => {
            let favorites:string[] = getLocalStorage();
        
            let namedIndex:number = favorites.indexOf(pokemon);
        
            favorites.splice(namedIndex, 1);
        
            localStorage.setItem("Favorite Pokemon", JSON.stringify(favorites));
        
        }

    


  return (
    <>
  {/*Top Logo  */}
  <div className="container-fluid bg-custom-red h-16 border-black border-b-4 flex justify-center">
    <div className="flex-3">
      <img className="h-16  pb-1" src={pokeball} alt="pokeball" />
    </div>
    <div className="flex-3">
      <h1 className="font-PottaOne text-4xl pt-2 text-white text-center">
        PokéInfo
      </h1>
    </div>
  </div>
  {/* Search and Buttons Desktop*/}
  <div className="container-fluid hidden lg:block p-16">
    <div className="div flex">
      <div className="mb-6 flex mr-2">
        <input onChange={(e)=> setsearchInput(e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {if((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){
                setsearchInput((e as React.ChangeEvent<HTMLInputElement>).target.value)
                if(searchInput !== ''){
                    setSavedInput(searchInput);
                }
                onLoadPage();
            }
            }} value={searchInput} 
          type="text"
          placeholder="Pokemon Name or Num"
          className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-w-96 "
        />
      </div>
      <div className="div flex-">
        <button onClick={() => {
            if(searchInput !== ''){
                setSavedInput(searchInput);
            }
            onLoadPage();
        }}
          type="button" 
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Search
        </button>
      </div>
      <div className="flex-">
        <button
          type="button" onClick={() => { randomPokemon(); onLoadPage(); }} 
          className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
        >
          Random
        </button>
      </div>
      <div className="text-center flex-">
        <button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900" onClick={openFavorites}>Favorites</button>
      </div>
    </div>
  </div>
  {/* Search and Buttons Tablet */}
  <div className="container-fluid hidden lg:hidden sm:block  p-16 ">
    <div className="div flex justify-center">
      <div className="mb-6 flex mr-2">
        <input onChange={(e)=> setsearchInput(e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {if((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){
                setsearchInput((e as React.ChangeEvent<HTMLInputElement>).target.value)
                if(searchInput !== ''){
                    setSavedInput(searchInput);
                }
                onLoadPage();
            }
            }} value={searchInput} 
          type="text"
          placeholder="Pokemon Name or Num"
          className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-w-96"
        />
      </div>
      <div className="div flex-">
        <button onClick={() => {
            if(searchInput !== ''){
                setSavedInput(searchInput);
            }
            onLoadPage();
        }}
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Search
        </button>
      </div>
    </div>
    <div className="div pl-16 ml-2 flex justify-center">
      <div className="flex justify-start">
        <button onClick={() => { randomPokemon(); onLoadPage(); }}
          type="button"
          className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
        >
          Random
        </button>
      </div>
      <div className="text-center pl-52 flex-1">
      <button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"  onClick={openFavorites} >Favorites</button>
      </div>
    </div>
  </div>
  {/* Search and Buttons Mobile */}
  <div className="container-fluid block sm:hidden p-16">
    <div className="div flex justify-center">
      <div className="mb-6 flex mr-2">
        <input onChange={(e)=> setsearchInput(e.target.value)} onKeyDown={(e: React.KeyboardEvent<HTMLInputElement> | React.ChangeEvent<HTMLInputElement>) => {if((e as React.KeyboardEvent<HTMLInputElement>).key === "Enter"){
                setsearchInput((e as React.ChangeEvent<HTMLInputElement>).target.value)
                if(searchInput !== ''){
                    setSavedInput(searchInput);
                }
                onLoadPage();
            }
            }} value={searchInput} 
          type="text"
          placeholder="Pokemon Name or Num"
          className="bg-gray-50 border border-gray-700 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 min-w-96"
        />
      </div>
    </div>
    <div className="div flex justify-center">
      <div className="div flex">
        <button onClick={() => {
            if(searchInput !== ''){
                setSavedInput(searchInput);
            }
            onLoadPage();
        }}
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          Search
        </button>
      </div>
      <div className="flex justify-center pl-10 pr-10">
        <button onClick={() => { randomPokemon(); onLoadPage(); }}
          type="button"
          className="text-yellow-400 hover:text-white border border-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-yellow-300 dark:text-yellow-300 dark:hover:text-white dark:hover:bg-yellow-400 dark:focus:ring-yellow-900"
        >
          Random
        </button>
      </div>
      <div className="text-center flex">
      <button className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"  onClick={openFavorites} >Favorites</button>
      </div>
    </div>
  </div>
  <div className="container-fluid hidden lg:block">
    <div className="div flex">
      <div className="div flex-1 p-12">
        {/* Img  */}
        <img onClick={()=> { shinyPokemon(); }} className="h-96" src={pokeIMG} alt="testIMG" />
        {/* Name and Number */}
        <div className="flex pt-2 pl-12">
          <div className="flex">
            <h1 className="font-PottaOne text-black text-3xl pr-5">{pokemonNameText}</h1>
          </div>
          <div className="flex">
            <h1 className="font-PottaOne text-black text-3xl pl-5">{pokeID}</h1>
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="div flex-1 p-12">
        <div className="div flex">
          <div className="div flex-">
            <h1 className="font-PottaOne text-custom-red text-3xl">Info</h1>
            <h1 className="font-PottaOne text-black text-2xl pt-16">Type:</h1>
            <h1 className="font-PottaOne text-black text-2xl pt-8">
              Location:
            </h1>
            <h1 className="font-PottaOne text-black text-2xl pt-8">
              Ablities:
            </h1>
            <h1 className="font-PottaOne text-black text-2xl pt-8">Moves:</h1>
            <h1 className="font-PottaOne text-black text-2xl pt-20">
              Evolutions:
            </h1>
          </div>
          <div className="overflow-hidden flex-1 pl-28 pt-24">
            <p className="h-12 font-PottaOne text-black text-2xl  mb-4 overflow-y-auto">
            {pokemonType.map((type:IPokeType, idx:number) => {
                    return (
                        <>
                           {<span key={idx}>{`${type.type.name[0].toUpperCase()+type.type.name.substring(1)}`}
                           {idx !== pokemonType.length - 1 && ', '}
                           </span>}
                        </>
                    )
                })}</p>
            <p className="h-12 font-PottaOne text-black text-2xl  mb-4 overflow-y-auto">
            {pokeLocation}
            </p>
            <p className="h-12 font-PottaOne text-black text-2xl  mb-4 overflow-y-auto">
            {pokeAbilities.map((ability:IPokeAbilities, idx:number) => {
                            return(
                                <>
                                {<span key={idx}>{`${ability.ability.name}`}
                                {idx !== pokeAbilities.length - 1 && ', '}</span>}
                                </>
                            )
                        })}</p>
            <p className="h-24 font-PottaOne text-black text-2xl  overflow-y-auto">
            {pokeMoves.map((move:IPokeMoves, idx:number) => {
                                return (
                                    <>
                                    {<span key={idx}>{`${move.move.name}`}
                                    {idx !== pokeMoves.length - 1 && ', '}</span>}
                                    </>
                                )
                        })}</p>
          </div>
        </div>
        <div className="pt-10 w-full">
          <div className="h-56 overflow-x-auto">
            <div className="w-1/3 text-center">
              <p className="font-PottaOne">{pokeEvolutions.map((pokemon:any, idx:number)=> {
                return(
                    <>
                        <div key={idx}>
                            <div>
                                <img src={pokemon.sprites.other["official-artwork"].front_default} style={{height: '200px', width: '200px', cursor: 'pointer'}} alt='pokemon evolutions'/>
                            </div>
                            <div className='text-center'>
                                {`${pokemon.name[0].toUpperCase()}${pokemon.name.substring(1)}`}
                            </div>
                        </div>
                    </>
                )
            })}</p>
            </div>
            <div className="w-1/3 flex justify-center"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Tablet IMG */}
  <div className="container-fluid hidden lg:hidden sm:block  p-16 ">
    <div className="flex">
      <div className="div flex-2">
        <img onClick={()=> { shinyPokemon(); }} className="h-96" src={pokeIMG} alt="testIMG" />
      </div>
      <div className="div flex pl-20">
        <div className="flex-1">
          <h1 className="font-PottaOne text-black text-3xl pb-5">{pokemonNameText}</h1>
          <h1 className="font-PottaOne text-black text-3xl pb-36">{pokeID}</h1>
          <button>
            <img onClick={()=> {
                        handleFavorites();
                        onLoadPage();
                        }}
              className="h-32 hover:scale-110 w-32"
              src={pokeball}
              alt="AddtoFavBtn"
            />
          </button>
          <button></button>
        </div>
      </div>
    </div>
  </div>
  {/* Mobile Img */}
  <div className="container-fluid block sm:hidden p-12">
    <div className="div flex-1 justify-center">
      <h1 className="font-PottaOne text-black text-3xl text-center pb-3">
      {pokemonNameText}
      </h1>
      <h1 className="font-PottaOne text-black text-3xl text-center pb-5">
      {pokeID}
      </h1>
      <img onClick={()=> { shinyPokemon(); }} 
        className="h-96 justify-center pb-10"
        src={pokeIMG}
        alt="testIMG"
      />
      <div className="flex justify-center">
        <button className="flex justify-center">
          <img onClick={()=> {
                        handleFavorites();
                        onLoadPage();
                        }}
            className="h-32 w-32 hover:scale-110 flex justify-center"
            src={pokeball}
            alt="AddtoFavBtn"
          />
        </button>
        <button></button>
      </div>
    </div>
  </div>
  <div className="container-fluid hidden lg:block">
    <div className="div pb-2 flex justify-center">
      <button>
        <img onClick={()=> {
                        handleFavorites();
                        onLoadPage();
                        }}
          className="h-32 hover:scale-110 w-32"
          src={pokeball}
          alt="AddtoFavBtn"
        />
      </button>
      <button></button>
    </div>
  </div>

  
  <div className="container-fluid hidden lg:hidden sm:block p-4">
    {/* Info Tablet*/}
    <div className="div flex-1 p-12">
      <div className="div flex">
        <div className="div flex-">
          <h1 className="font-PottaOne text-custom-red text-3xl">Info</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-16">Type:</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-8">Location:</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-8">Ablities:</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-8">Moves:</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-20">
            Evolutions:
          </h1>
        </div>
        <div className="overflow-hidden flex-1 pl-28 pt-24">
          <p className="h-12 font-PottaOne text-black text-2xl mb-4 overflow-y-auto">
          {pokemonType.map((type:IPokeType, idx:number) => {
                    return (
                        <>
                           {<span key={idx}>{`${type.type.name[0].toUpperCase()+type.type.name.substring(1)}`}
                           {idx !== pokemonType.length - 1 && ', '}
                           </span>}
                        </>
                    )
                })}
          </p>
          <p className="h-12 font-PottaOne text-black text-2xl mb-4 overflow-y-auto">
          {pokeLocation}
          </p>
          <p className="h-12 font-PottaOne text-black text-2xl mb-4 overflow-y-auto">
          {pokeAbilities.map((ability:IPokeAbilities, idx:number) => {
                            return(
                                <>
                                {<span key={idx}>{`${ability.ability.name}`}
                                {idx !== pokeAbilities.length - 1 && ', '}</span>}
                                </>
                            )
                        })}
          </p>
          <p className="h-24 font-PottaOne text-black text-2xl overflow-y-auto">
          {pokeMoves.map((move:IPokeMoves, idx:number) => {
                                return (
                                    <>
                                    {<span key={idx}>{`${move.move.name}`}
                                    {idx !== pokeMoves.length - 1 && ', '}</span>}
                                    </>
                                )
                        })}
          </p>
        </div>
      </div>
      <div className="pt-10 overflow-x-auto overflow-auto">
        <div className="h-56 w-full flex text-base sm:text-lg md:text-xl lg:text-lg xl:text-2xl">
          <div className="w-1/3 text-center">
            <p className="font-PottaOne">{pokeEvolutions.map((pokemon:any, idx:number)=> {
                return(
                    <>
                        <div key={idx}>
                            <div>
                                <img src={pokemon.sprites.other["official-artwork"].front_default} style={{height: '200px', width: '200px', cursor: 'pointer'}} alt='pokemon evolutions'/>
                            </div>
                            <div className='text-center'>
                                {`${pokemon.name[0].toUpperCase()}${pokemon.name.substring(1)}`}
                            </div>
                        </div>
                    </>
                )
            })}</p>
          </div>
          <div className="w-1/3 flex justify-center" />
        </div>
      </div>
    </div>
  </div>
  {/* Mobile Info */}
  <div className="container-fluid block sm:hidden">
    <div className="div flex-1 p-4">
      <div className="div flex">
        <div className="div flex-">
          <h1 className="font-PottaOne text-custom-red text-3xl">Info</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-16">Type:</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-8">Location:</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-8">Ablities:</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-8">Moves:</h1>
          <h1 className="font-PottaOne text-black text-2xl pt-20">
            Evolutions:
          </h1>
        </div>
        <div className="overflow-hidden flex-1 pl-28 pt-24">
          <p className="h-12 font-PottaOne text-black text-2xl mb-4 overflow-y-auto">
          {pokemonType.map((type:IPokeType, idx:number) => {
                    return (
                        <>
                           {<span key={idx}>{`${type.type.name[0].toUpperCase()+type.type.name.substring(1)}`}
                           {idx !== pokemonType.length - 1 && ', '}
                           </span>}
                        </>
                    )
                })}
          </p>
          <p className="h-12 font-PottaOne text-black text-2xl mb-4 overflow-y-auto">
          {pokeLocation}
          </p>
          <p className="h-12 font-PottaOne text-black text-2xl mb-4 overflow-y-auto">
          {pokeAbilities.map((ability:IPokeAbilities, idx:number) => {
                            return(
                                <>
                                {<span key={idx}>{`${ability.ability.name}`}
                                {idx !== pokeAbilities.length - 1 && ', '}</span>}
                                </>
                            )
                        })}
          </p>
          <p className="h-24 font-PottaOne text-black text-2xl overflow-y-auto">
          {pokeMoves.map((move:IPokeMoves, idx:number) => {
                                return (
                                    <>
                                    {<span key={idx}>{`${move.move.name}`}
                                    {idx !== pokeMoves.length - 1 && ', '}</span>}
                                    </>
                                )
                        })}
          </p>
        </div>
      </div>
      <div className="pt-10 w-full">
        <div className="h-56 overflow-x-auto">
          <div className="w-1/3 text-center">
            <p className="font-PottaOne">{pokeEvolutions.map((pokemon:any, idx:number)=> {
                return(
                    <>
                        <div key={idx}>
                            <div>
                                <img src={pokemon.sprites.other["official-artwork"].front_default} style={{height: '200px', width: '200px', cursor: 'pointer'}} alt='pokemon evolutions'/>
                            </div>
                            <div className='text-center font-PottaOne'>
                                {`${pokemon.name[0].toUpperCase()}${pokemon.name.substring(1)}`}
                            </div>
                        </div>
                    </>
                )
            })}</p>
          </div>
          <div className="w-1/3 flex justify-center" />
        </div>
      </div>
    </div>
  </div>



<div className={`${addToFavs} transition-transform fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800`}>
        <p className="text-[30px] mb-7 font-PottaOne">Favorites</p>
        <button onClick={openFavorites} type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-6 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white" >
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span className="sr-only">Close menu</span>
        </button>
        {favoriteDisplay.map((favorite:any, idx:number) => {
        return(
            <>
                <div key={idx} onClick={()=> {
                    setSavedInput(favorite.id);
                    onLoadPage();
                }} className='rounded-2xl flex items-center justify-between text-[20px] mb-5 font-PottaOne bg-yellow-300 ' style={{height: '58px', paddingLeft: '10px', paddingRight: '10px'}}>
                    {`${favorite.name[0].toUpperCase()}${favorite.name.substring(1)} #${favorite.id}`}
                    <p className='text-red-600' onClick={()=> {
                        removeFromLocalStorage(`${favorite.id}`);
                        onLoadPage();
                    }}>X</p>
                </div>
            </>
        )
    })
    

}
    </div>

</>

  )
}

export default DisplayPageComponent



