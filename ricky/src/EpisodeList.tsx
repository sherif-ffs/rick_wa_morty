import React from 'react'
import {IEpisode} from './interfaces'

export default function EpisodesList(props: any):any {
    const {episodes, toggleFavAction, favorites} = props;

    return episodes.map((episode:IEpisode) => {
        return (
          <section key={episode.id} className="episode-wrapper" style={{borderTop: favorites.find((fav: IEpisode) => fav.id === episode.id) ? '5px solid green' : '5px solid #333'}}>
            <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`} />
            <h1>{episode.name}</h1>
            <section className="episode-content">
              <p>Season: {episode.season}</p>
              <p className="episode-number">Number: {episode.number}</p>
            </section>
            <button type="button" onClick={() => toggleFavAction(episode)}>
              {favorites.find((fav: IEpisode) => fav.id === episode.id) ? 'Unfav' : 'Fav'}
            </button>
          </section>
        )
      })

    }