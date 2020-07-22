import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import LeftNav from '../../components/left-nav/left-nav.components'

import './styles.scss'
import { FiStar } from 'react-icons/fi'

interface FormatAnime {
  id: string
  attributes: {
    titles: {
      en_jp: string
    }
    averageRating: string
    posterImage: {
      medium: string
    }
  }
}
interface FormatGenreTitle {
  attributes: {
    title: string
  }
}

const AnimeGenreList = () => {
  let { id } = useParams()
  const [animeList, setAnimeList] = useState<FormatAnime[]>([])
  const [genreTitle, setGenreTitle] = useState<FormatGenreTitle>()

  useEffect(() => {
    api.get(`categories/${id}`).then(response => {
      setGenreTitle(response.data.data)
    })
  }, [id])

  useEffect(() => {
    api.get(`categories/${id}/anime?page%5Blimit%5D=20`).then(response => {
      setAnimeList(response.data.data)
    })
  }, [id])
  return (
    <div className='main-container'>
      <LeftNav />
      <div className='content-container-genre-list'>
        <section className='genre-list'>
          <div className='container'>
            <div className='genreTitle'>{<h1>{genreTitle?.attributes.title}</h1>}</div>
            <div className='list-container--genres'>
              {animeList.map(anime => (
                <Link to={`/show-anime/${anime.id}`}>
                  <div className='card' key={anime.id}>
                    <div className='card-image'>
                      <img src={anime.attributes.posterImage.medium} alt='Anime Cover' />
                    </div>
                    <div className='card-info'>
                      <div className='card-info__title'>
                        <h3>{anime.attributes.titles.en_jp.length  > 20 ? anime.attributes.titles.en_jp.substring(0, 20) + '...' :  anime.attributes.titles.en_jp}</h3>
                      </div>
                      <div className='card-info__role' >
                        <FiStar style={{ color: 'yellow', marginRight: 5}} size={14} />
                        <h3>{Math.round(Number(anime.attributes.averageRating)) / 10}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AnimeGenreList
