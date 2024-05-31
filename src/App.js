import { useEffect, useState } from 'react'
import { Routes, Route, createSearchParams, useSearchParams, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import 'reactjs-popup/dist/index.css'
import { fetchMovies, fetchMoviesPageOne } from './data/moviesSlice'
import { ENDPOINT_SEARCH, ENDPOINT_DISCOVER, ENDPOINT, API_KEY } from './constants'
import Header from './components/Header'
import Movies from './components/Movies'
import Starred from './components/Starred'
import WatchLater from './components/WatchLater'
import { TrailerModal } from './components/TrailerModal'
import './app.scss'
import { useInfiniteScroll } from './hooks/useInfiniteScroll'
import { usePrevious } from './hooks/usePrevious'
import { useDebounce } from './hooks/useDebounce'

const App = () => {
  const state = useSelector((state) => state)
  const { movies } = state

  const dispatch = useDispatch()
  const [videoKey, setVideoKey] = useState(null)
  const [isOpen, setOpen] = useState(false)

  const location = useLocation()
  const infiniteScrollEnabled = location.pathname === '/'
  const { anchorRef, fetchMore } = useInfiniteScroll(movies.fetchStatus, infiniteScrollEnabled)

  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('search')
  const debouncedSearch = useDebounce(search, 500)
  const prevSearch = usePrevious(debouncedSearch)

  const hasMoreMovies = (movies.movies.page === 0 && movies.movies.total_pages === 0) || (movies.movies.page < movies.movies.total_pages)

  const closeModal = () => setOpen(false)

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

  useEffect(() => {
    // fetch movies for infinite scroll
    if (prevSearch === debouncedSearch) {
      if (hasMoreMovies && fetchMore) {
        if (debouncedSearch !== null) {
          dispatch(fetchMovies(`${ENDPOINT_SEARCH}&query=${debouncedSearch}&page=${movies.movies.page + 1}`))
        } else {
          dispatch(fetchMovies(`${ENDPOINT_DISCOVER}&page=${movies.movies.page + 1}`))
        }
      }
      return
    }

    // fetch first page when switching between search and discover
    if (prevSearch !== debouncedSearch) {
      if (debouncedSearch !== null) {
        dispatch(fetchMoviesPageOne(`${ENDPOINT_SEARCH}&query=${debouncedSearch}&page=1`))
      } else {
        dispatch(fetchMoviesPageOne(`${ENDPOINT_DISCOVER}&page=1`))
      }
      return
    }
  }, [debouncedSearch, prevSearch, fetchMore, hasMoreMovies, movies.movies.page, dispatch])

  return (
    <main className="App">
      <Header searchMovies={searchMovies} search={search} />

      <div className="container">
        {isOpen && (<TrailerModal videoKey={videoKey} closeModal={closeModal} />)}
        <Routes>
          <Route path="/" element={
            <Movies
              movies={movies}
              viewTrailer={viewTrailer}
              anchorRef={anchorRef}
              fetchMore={fetchMore}
              hasMoreMovies={hasMoreMovies}
            />
          } />
          <Route path="/starred" element={<Starred viewTrailer={viewTrailer} />} />
          <Route path="/watch-later" element={<WatchLater viewTrailer={viewTrailer} />} />
          <Route path="*" element={<figure className="not-found">Page Not Found</figure>} />
        </Routes>
      </div>
    </main>
  )
}

export default App
