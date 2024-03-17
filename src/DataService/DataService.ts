import { IPokemonData, IPokeSpecies, IEvolutionData, ILocationData } from "../Interfaces/Interface";

export const getPokeEvolutionsFetch = async (pokemon:string) => {
    const promise = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    const data: IPokeSpecies = await promise.json();

    const promiseOne = await fetch(data.evolution_chain.url);
    
    const dataOne:IEvolutionData = await promiseOne.json();

    return dataOne;
}

export const getPokeFetch = async (pokemon:string) => {
    
    const promiseOne = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    const promiseOneData: IPokeSpecies = await promiseOne.json();

    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${promiseOneData.id}`);

    const data: IPokemonData = await  promise.json();

    return data;

}

export const getPokeName = async (pokemon:string) => {
    const promiseOne = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    const promiseOneData: IPokeSpecies = await promiseOne.json();

    return promiseOneData;
}


export const pokeLocationFetch = async (pokemon:string) => {
    const promiseOne = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);

    const promiseOneData: IPokeSpecies = await promiseOne.json();

    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${promiseOneData.id}/encounters`);

    const data:ILocationData[] = await promise.json();

    return data;
    
}


