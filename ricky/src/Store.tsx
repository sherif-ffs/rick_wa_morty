import React from 'react'
import { act } from 'react-dom/test-utils';

interface IState {
    episodes: Array<''>,
    favorites: Array<''>
}

interface IAction {
    type: string,
    payload: any
}
const initialState:IState = {
    episodes: [],
    favorites: []
}

export const Store = React.createContext<IState | any>(initialState)

function reducer(state:IState, action:IAction) {
    switch (action.type) {
        case 'FETCH_DATA':
            return {...state, episodes: action.payload}
        default: 
            return state
    }
}

export function StoreProvider(props:any):JSX.Element {
    const [state, dispatch] = React.useReducer(reducer, initialState)
    return <Store.Provider value={{state, dispatch}}>{props.children}</Store.Provider>
}

