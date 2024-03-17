export interface IPokeType {
    slot:number
    type:IType
}

interface IType {
    name:string
    url:string
}

export interface IPokeMoves {
    move:IMove
    version_group_details:[]
}

interface IMove {
    name:string
    url:string
}

export interface IPokeAbilities {
    ability:IAbilities
}

interface IAbilities {
    name:string
    url:string
}