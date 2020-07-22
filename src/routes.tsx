import React from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

import Home from './pages/Home'
import ShowAnime from './pages/ShowAnime'
import AnimeGenreList from './pages/AnimeGenreList'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route component={Home} path='/' exact />
      <Route component={ShowAnime} path='/show-anime/:id' />
      <Route component={AnimeGenreList} path='/genres/:id' />
    </BrowserRouter>
  )
}

export default Routes
