export interface IPokemonData {
    abilities:IPokeAbilities[]
    id:number
    name:string
    types:IPokeType[]
    moves:IPokeMoves[]
    sprites:{
        other:{
            "official-artwork":{
                front_default:string
                front_shiny:string
            }
        }
    }
}


export interface IPokeSpecies {
    id:number
    name:string
    evolution_chain:{
        url:string
    }
}



export interface IPokeType {
    slot:number
    type:IType
}


export interface ILocationData {
    location_area:{
        name:string
        url:string
    }
}


export interface IPokeMoves {
    move:IMove
    version_group_details:[]
}

export interface IPokeAbilities {
    ability:IAbilities
}

export interface IEvolutionData {
    chain:Chain;
}

export interface Chain {
    evolves_to:Evolution[];
    species:Species;
}

export interface Evolution{
    evolves_to:Evolution[]
    species:Species
}

interface IType {
    name:string
    url:string
}

interface IMove {
    name:string
    url:string
}

interface IAbilities {
    name:string
    url:string
}

interface Species {
    name:string
    url:string
}