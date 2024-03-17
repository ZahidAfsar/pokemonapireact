const getPokeFetch = async (pokemon:string) => {
    
    const promiseOne = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const promiseOneData: any = await promiseOne.json();


    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${promiseOneData.id}`);
    const data:any = promise.json();


    return data;

}

const pokeLocationFetch = async (pokemon:string) => {
    const promiseOne = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const promiseOneData = await promiseOne.json();

    const promise = await fetch(`https://pokeapi.co/api/v2/pokemon/${promiseOneData.id}/encounters`);
    const data:any = await promise.json();
    return data;
    
}

const getPokeName = async (pokemon:string) => {
    const promiseOne = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const promiseOneData = await promiseOne.json();
    return promiseOneData;
}

const getPokeEvolutionsFetch = async (pokemon:string) => {
    const promise = await fetch (`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    const data = await promise.json();

    const promise2 = await fetch(data.evolution_chain.url);
    const data2 = await promise2.json();

    return data2;
}

export {getPokeFetch, pokeLocationFetch, getPokeName, getPokeEvolutionsFetch}