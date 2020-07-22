import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import LeftNav from '../../components/left-nav/left-nav.components'
import Wp from '../../assets/bnh_wp.jpg'
import { FiArrowRight } from 'react-icons/fi'
import './styles.scss'

interface recieveAnime {
  id: string
  type: string
  attributes: {
    posterImage: {
      medium: string
    }
  }
}

const Home = () => {
  const [animeTrendingCovers, setAnimeTrendingCovers] = useState<recieveAnime[]>([])
  const [animeCovers, setAnimeCovers] = useState<recieveAnime[]>([])

  useEffect(() => {
    api.get('trending/anime').then(response => {
      const trendingAnimes = response.data.data
      console.log(trendingAnimes);

      const slicedAnimes = trendingAnimes.slice(0, 8)

      setAnimeTrendingCovers(slicedAnimes)
    })
  }, [])
  //?page%5Blimit%5D=9
  useEffect(() => {
    api.get('/anime').then(response => {
      const filteredAnimes = response.data.data

      const slicedAnimes = filteredAnimes.slice(0, 8)

      setAnimeCovers(slicedAnimes)
    })
  }, [])

  return (
    <>
    <div className='main'>
      <LeftNav />
      <div className='wrapper'>
        <div className='carrousel'>
          <div className='carrousel-img'>
            <img src={Wp} alt='Anime Cover' />
          </div>
          <div className='carrousel-content'>
            <h1>BOKU NO HERO ACADEMIA</h1>

            <h2>
              Since he was a child, the ambitious middle schooler has wanted nothing more than to be
              a hero. Izuku's unfair fate leaves him admiring heroes and taking notes on them
              whenever he can. But it seems that his persistence has borne some fruit: Izuku meets
              the number one hero and his personal idol, All Might. All Might's quirk is a unique
              ability that can be inherited, and he has chosen Izuku to be his successor!
            </h2>
            <Link to='/show-anime/11469'>
              <span>
                <FiArrowRight />
              </span>
              <strong>CONTINUE READING</strong>
            </Link>
          </div>
        </div>
        <div className='title'>
          <h1>TRENDING</h1>
          <button>See More</button>
        </div>
        <div className='covers'>
          {animeTrendingCovers.map(animeCover => (
            <Link to={`show-anime/${animeCover.id}`} key={animeCover.id}>
              <div className='cover-container'>
                <img src={animeCover.attributes.posterImage.medium} alt='Anime cover' />
              </div>
            </Link>
          ))}
        </div>

        <div className='title'>
          <h1>RECOMMENDED</h1>
          <button>See More</button>
        </div>
        <div className='covers'>
          {animeCovers.map(animeCover => (
            <Link to={`show-anime/${animeCover.id}`} key={animeCover.id}>
              <div className='cover-container'>
                <img src={animeCover.attributes.posterImage.medium} alt='Anime cover' />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
    </>
  )
}

export default Home
