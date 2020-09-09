import React from 'react';
import {Store} from './Store'
import './App.css'

import {IEpisode, IAction} from './interfaces'

export default function App():JSX.Element {
  const {state, dispatch} = React.useContext(Store)

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction()
  })

  const fetchDataAction = async () => {
    const data = await fetch('https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes')
    const dataJSON = await data.json()
    console.log('dataJSON: ', dataJSON)
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    })
  }

  const toggleFavAction = (episode:IEpisode): IAction => {
    const episodeInFav = state.favorites.includes(episode)
    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    }
    if (episodeInFav) {
      const favWithoutEpisode = state.favorites.filter((fav:IEpisode) => fav.id !== episode.id)
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode
      }
    }

    return dispatch(dispatchObj)
  }

  console.log('state: ', state)
  return (
    <React.Fragment>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favorite episode</p>
        <p>Favorited Episodes: {state.favorites.length}</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode:IEpisode) => {
          return (
            <section key={episode.id} className="episode-wrapper" style={{
              borderTop: state.favorites.find((fav: IEpisode) => fav.id === episode.id) ? '5px solid green' : '5px solid #333'
            }}>
              <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`}></img>
              <h1>{episode.name}</h1>
              <section className="episode-content">
                <p>Season: {episode.season}</p>
                <p className="episode-number">Number: {episode.number}</p>
              </section>
              <button type="button" onClick={() => toggleFavAction(episode)}>
                {state.favorites.find((fav: IEpisode) => fav.id === episode.id) ? 'Unfav' : 'Fav'}
              </button>
            </section>
          )
        })}
      </section>
    </React.Fragment>
  )
}