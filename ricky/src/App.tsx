import React from 'react';
import {Store} from './Store'
import './App.css'

interface IEpsiode {
  airdate: string
  airstamp: string
  airtime: string
  id: number
  image: {medium: string, original: string}
  name: string
  number: number
  runtime: number
  season: number
  summary: string
  url: string
}
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
  console.log('state: ', state)
  return (
    <React.Fragment>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favorite episode</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode:IEpsiode) => {
          return (
            <section key={episode.id} className="episode-wrapper">
              <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`}></img>
              <h1>{episode.name}</h1>
              <section>
                <p>Season: {episode.season}</p>
                <p>Number: {episode.number}</p>
              </section>
            </section>
          )
        })}
      </section>
    </React.Fragment>
  )
}