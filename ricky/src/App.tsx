import React from 'react';
import {Store} from './Store'

interface IEpsiode {
  externals: {tvrage: number, thetvdb: number, imdb: string}
  genres: string[]
  id: 216
  image: {medium: string, original: string}
  language: string
  name: string
  network: {id: 10, name: "Adult Swim"}
  officialSite: string
  premiered: string
  rating: {average: 9.1}
  runtime: number
  schedule: {time: "23:30", days: string[]}
  status: string
  summary: string
  type: string
  updated: number
  url: string
  webChannel: any
  weight: number
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
      <h1>Rick and Morty</h1>
      <p>Pick your favorite episode</p>
      <section>
        {state.episodes.map((episode:any) => {
          return (
            <section key={episode.id}>
              <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`}></img>
              <div>{episode.name}</div>
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