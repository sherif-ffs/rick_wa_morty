import React from 'react'

interface IState {
    episodes: Array<''>,
    favorites: Array<''>
}

const initialState:IState = {
    episodes: [],
    favorites: []
}

export const Store = React.createContext<IState>(initialState)

function reducer() {

}

export function StoreProvider(props:any):JSX.Element {
    return <Store.Provider value={initialState}>{props.children}</Store.Provider>
}

