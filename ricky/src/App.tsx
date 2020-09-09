import React from 'react';
import {Store} from './Store'
import './App.css'

import {IEpisode, IAction} from './interfaces'

const EpisodeList = React.lazy<any>(() => import('./EpisodeList'))

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

  const props = {
    episodes: state.episodes,
    toggleFavAction: toggleFavAction,
    favorites: state.favorites
  }

  console.log('state: ', state)
  return (
    <React.Fragment>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favorite episode</p>
        <p>Favorited Episodes: {state.favorites.length}</p>
      </header>
      <React.Suspense fallback={<div>loading...</div>}>
        <section className="episode-layout">
          <EpisodeList {...props} />
        </section>
      </React.Suspense>
    </React.Fragment>
  )
}