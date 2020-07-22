import React, { useEffect, useState } from 'react'

import LeftNav from '../../components/left-nav/left-nav.components'

import './styles.scss'
import crunchyrollIcon from '../../assets/crunchyroll-icon.svg'
import netflixIcon from '../../assets/netflix-icon.svg'
import { useParams } from 'react-router-dom'
import api from '../../services/api'

interface recieveAnime {
  id: string
  attributes: {
    titles: {
      en_jp: string
    }
    posterImage: {
      medium: string
    }
    youtubeVideoId: string
  }
}

interface filterCharacters {
  relationships: {
    character: {
      links: {
        related: string
      }
    }
  }
}

interface characterInfo {
  attributes: {
    image: {
      original: string
    }
    names: {
      en: string
    }
  }
}

const ShowAnime = () => {
  let { id } = useParams()

  const [animeInfo, setAnime] = useState<recieveAnime[]>([])
  //const [chars, setChars] = useState<filterCharacters[]>([])

  useEffect(() => {
    api.get(`anime/?filter%5Bid%5D=${id}`).then(response => {
      const filteredAnime = response.data.data
      setAnime(filteredAnime)
    })
  }, [id])

  // useEffect(() => {
  //   api.get(`anime/${id}/characters`).then(response => {
  //     const characters = response.data.data
  //     setChars(characters)
  //   })
  // }, [id])

  // useEffect(() => {
  //   chars.map(char =>
  //     axios.get<characterInfo[]>(char.relationships.character.links.related).then(response => {
  //       const characters = response.data
  //       setCharsInfo(characters)
  //     })
  //   )
  // }, [])

  return (
    <div className='main'>
      <LeftNav />
      <div className='wrapper-show-anime'>
        <div className='container'>
          {animeInfo.map(anime => (
            <img key={anime.id} src={anime.attributes.posterImage.medium} alt='Anime Cover' />
          ))}

          <div className='description-container'>
            <div className='description-container--title'>
              {animeInfo.map(anime => (
                <h1 key={anime.id}>{anime.attributes.titles.en_jp}</h1>
              ))}
            </div>
            <div className='description-container--text'>
              <p>
                The appearance of "quirks," newly discovered super powers, has been steadily
                increasing over the years, with 80 percent of humanity possessing various abilities
                from manipulation of elements to shapeshifting. This leaves the remainder of the
                world completely powerless, and Izuku Midoriya is one such individual.
              </p>
            </div>
            <div className='description-container--watch'>
              <h3>WATCH NOW:</h3>
              <img src={crunchyrollIcon} alt='Crunchyroll Link' />
              <img src={netflixIcon} alt='Netflix Link' />
            </div>
          </div>
        </div>
        <div className='trailer-container'>
          <h1>TRAILER</h1>
          {animeInfo.map(anime => (
            <iframe
              key={anime.id}
              title='ytplayer'
              id='ytplayer'
              src={`https://www.youtube.com/embed/${anime.attributes.youtubeVideoId}?autoplay=0`}
              frameBorder='0'
            ></iframe>
          ))}
        </div>
        <div className='characters-container'>
          <h1>CHARACTERS</h1>
          <div className='characters-container--images'>
            {/* {charInfo.map(char => (
              <div className='characters-container--image'>
                <img src={char.attributes.image.original} alt='Character Profile' />
                <div className='characters-container--image__info'>
                  <h3>{char.attributes.names.en}</h3>
                  <div className='characters-container--image__info__role'>
                    <h3>MAIN</h3>
                  </div>
                </div>
              </div>
            ))} */}

            {/* dasdsa */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowAnime
