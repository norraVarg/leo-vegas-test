import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies, fetchMoviesPageOne } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import TrailerModal from './components/TrailerModal'
import './app.scss'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import { usePrevious } from './hooks/usePrevious'

const App = () => {
  const state = useSelector((state) => state)
  const { movies } = state
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const [videoKey, setVideoKey] = useState(null)
  const [isOpen, setOpen] = useState(false)
  const closeModal = () => setOpen(false)
  const { anchorRef, fetchMore } = useInfiniteScroll(movies.fetchStatus)
  const noMoreMovies = movies.movies.page >= movies.movies.total_pages
  const prevSearch = usePrevious(search)

  const searchMovies = (query) => {
    if (query !== '') {
      setSearchParams(createSearchParams({ search: query }))
    } else {
      setSearchParams()
    }
  }

  const viewTrailer = (movie) => {
    getMovie(movie.id)
    setOpen(true)
  }

  const getMovie = async (id) => {
    const URL = `${ENDPOINT}/movie/${id}?api_key=${API_KEY}&append_to_response=videos`

    const videoData = await fetch(URL)
      .then((response) => response.json())

    if (videoData.videos && videoData.videos.results.length) {
      const trailer = videoData.videos.results.find(vid => vid.type === 'Trailer')
      setVideoKey(trailer ? trailer.key : videoData.videos.results[0].key)
    } else {
      setVideoKey(null)
    }
  }
  console.log(fetchMore, search, prevSearch, noMoreMovies)
  useEffect(() => {
    if (search !== null) {
      dispatch(fetchMoviesPageOne(`${ENDPOINT_SEARCH}&query=${search}&page=1`))
      return
    }

    if (search === null) {
      dispatch(fetchMoviesPageOne(`${ENDPOINT_DISCOVER}&page=1`))
      return
    }
  }, [search, dispatch])

  useEffect(() => {
    if (noMoreMovies) {
      return
    }

    if (fetchMore) {
      if (search === null) {
        dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${movies.movies.page + 1}`))
        return
      }

      if (search !== null) {
        dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${search}&page=${movies.movies.page + 1}`))
        return
      }
    }
  }, [fetchMore, dispatch, search, noMoreMovies])

  return (
    <div className="App">
      <Header searchMovies={searchMovies} />

      <div className="container">
        {isOpen && (<TrailerModal videoKey={videoKey} closeModal={closeModal} />)}
        <Routes>
          <Route path="/" element={
            <Movies
              movies={movies}
              viewTrailer={viewTrailer}
              anchorRef={anchorRef}
              fetchMore={fetchMore}
              noMoreMovies={noMoreMovies}
            />
          } />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<h1 className="not-found">Page Not Found</h1>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
