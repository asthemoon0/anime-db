import React, { useEffect, useState } from 'react'

import LeftNav from '../../components/left-nav/left-nav.components'

import './styles.scss'
import crunchyrollIcon from '../../assets/crunchyroll-icon.svg'
import netflixIcon from '../../assets/netflix-icon.svg'
import funimationIcon from '../../assets/funimation-icon.svg'
import huluIcon from '../../assets/hulu-icon.svg'
import amazonIcon from '../../assets/amazon-icon.svg'
import tubiIcon from '../../assets/tubitv-icon.svg'
import AfraidImg from '../../assets/afraidface.jpg'
import { useParams } from 'react-router-dom'
import api from '../../services/api'
import axios from 'axios'

interface recieveAnime {
  id: string
  attributes: {
    synopsis: string
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
  attributes: {
    role: string
  }
  relationships: {
    character: {
      links: {
        related: string
      }
    }
  }
}

interface characterInfo {
  id: string
  attributes: {
    image: {
      original: string
    }
    names: {
      en: string
      ja_jp: string
    }
  }
}

interface StreamLinks {

  id: string
  attributes: {
    url: string
  }
}

interface test {
  attributes: {
    role: string
  }
  relationships: {
    character: {
      links: {
        related: string
      }
    }
  }
}

const ShowAnime = () => {
  let { id } = useParams()

  const [animeInfo, setAnimeInfo] = useState<recieveAnime[]>([])
  const [charsLink, setCharsLink] = useState<test[]>([])
  const [charInfo, setCharInfo] = useState<characterInfo[]>([])

  const [streamLinks, setStreamLinks] = useState<StreamLinks[]>([])
  const [offSet, setOffSet] = useState(0)

  useEffect(() => {
    api.get(`anime/?filter%5Bid%5D=${id}`).then(response => {
      const filteredAnime = response.data.data
      setAnimeInfo(filteredAnime)
    })
  }, [id])

  useEffect(() => {
    api.get(`anime/${id}/streaming-links`).then(response => {
      setStreamLinks(response.data.data)
    })
  }, [id])

  useEffect(() => {
    axios
      .get(
        `https://kitsu.io/api/edge/anime-characters?filter%5BanimeId%5D=${id}&page%5Blimit%5D=10&page%5Boffset%5D=${offSet}`
      )
      .then(response => {
        const characters = response.data.data
        setCharsLink(characters)
      })
  }, [id, offSet])
  console.log(charsLink)
  useEffect(() => {
    const links = charsLink.map(item => item.relationships.character.links.related)
    const promisesArray = links.map(link =>
      axios.get(link).then(response => {
        return response.data.data
      })
    )
    Promise.all(promisesArray).then(result => {
      setCharInfo(result)
    })
  }, [charsLink])

  function handleNextButton() {
    charsLink.length > 0 ? setOffSet(offSet + 10) :
    setOffSet(offSet)
  }
  function handleBackButton() {
    offSet === 0 ? setOffSet(offSet) :
    setOffSet(offSet - 10)
  }
  return (
    <div className='main-container'>
      <LeftNav />
      <div className='content-container'>
        <section className='hero'>
          <div className='container'>
            <div className='hero-img'>
              {animeInfo.map(anime => (
                <img key={anime.id} src={anime.attributes.posterImage.medium} alt='Anime Cover' />
              ))}
            </div>
            <div className='hero-description'>
              <div className='hero-description--title'>
                {
                animeInfo.map(anime => (
                  <h1 key={anime.id}>{anime.attributes.titles.en_jp}</h1>
                  ))
                }
              </div>
              <div className='hero-description--text'>
                { animeInfo.map(anime => (
                  <p key={anime.id}>
                    {anime.attributes.synopsis.length > 370 ? anime.attributes.synopsis.substring(0, 370) + '...': anime.attributes.synopsis}
                  </p>
                ))
                }
              </div>
              <div className='hero-description--watch'>
                <h3>WATCH NOW:</h3>
                {streamLinks.map(link => (
                      <a key={link.id} href={link.attributes.url} target="_blank" rel="noopener noreferrer">
                        <img src={
                          link.attributes.url.includes('crunchyroll') ? crunchyrollIcon : 
                          link.attributes.url.includes('netflix') ? netflixIcon : 
                          link.attributes.url.includes('hulu') ? huluIcon :
                          link.attributes.url.includes('amazon') ? amazonIcon :
                          link.attributes.url.includes('funimation') ? funimationIcon :  
                          link.attributes.url.includes('tubitv') ? tubiIcon : netflixIcon} alt='Stream link' />
                      </a>      
                ))}
              </div>
            </div>
          </div>
        </section>
        <main>
          <section className='trailer'>
            <h1>TRAILER</h1>
            <div className='container'>
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
          </section>
          <section className='characters'>
            <div className='container'>
              <h1>CHARACTERS</h1>
              <div className='list-container--chars'>
                {charInfo.length > 0 ?
                charInfo.map(char => (
                  <div className='card' key={char.id}>
                    <div className='card-image'>
                      <img
                        src={
                          char.attributes.image === null
                            ? 'https://media.kitsu.io/characters/images/5983/original.jpg?1483096805'
                            : char.attributes.image.original
                        }
                        alt='Anime Cover'
                      />
                    </div>
                    <div className='card-info'>
                      <div className='card-info__title'>
                        <h3>{char.attributes.names.en.length  > 15 ? char.attributes.names.en.substring(0, 15) + '...' :  char.attributes.names.en}</h3>
                      </div>
                      <div className='card-info__role'>
                        <h3>{char.attributes.names.ja_jp === null ? 'なし' : char.attributes.names.ja_jp.length > 12 ? char.attributes.names.ja_jp.substring(0, 12) + '...' : char.attributes.names.ja_jp }</h3>
                      </div>
                    </div>
                  </div>
                ))
              : <div className="characters-outOfChars">
                  <h1>Oh no, seems like you ran out of characters <span role="img" aria-label="Sad Face">😢</span></h1>
                  <img src={AfraidImg} alt="Afraid face"/>
                </div> 
              }
              </div>

              <div className="characters-buttons">
                <button onClick={handleBackButton}>Back</button>
                <button onClick={handleNextButton}>Next</button>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default ShowAnime
