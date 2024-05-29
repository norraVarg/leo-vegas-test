import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import starredSlice from '../data/starredSlice'
import Movie from './Movie'
import { useEffect } from 'react'

const Starred = ({ viewTrailer }) => {

  const state = useSelector((state) => state)
  const { starred } = state
  const { clearAllStarred } = starredSlice.actions
  const dispatch = useDispatch()

  useEffect(() => {
    if (starred.starredMovies.length === 0) {
      window.scrollTo(0, 0)
    }
  }, [starred])

  return (
    <div className="starred" data-testid="starred">
      {starred.starredMovies.length > 0 ? (
        <div data-testid="starred-movies" className="starred-movies">
          <h6 className="header">Starred movies</h6>
          <div className="responsive-grid">
            {starred.starredMovies.map((movie) => (
              <Movie
                movie={movie}
                key={movie.id}
                viewTrailer={viewTrailer}
              />
            ))}
          </div>

          <button className="btn btn-primary clear" onClick={() => dispatch(clearAllStarred())}>Remove all starred</button>
        </div>) : (
        <div className="text-center empty-cart">
          <i className="bi bi-star" />
          <p>There are no starred movies.</p>
          <p>Go to <Link to='/'>Home</Link></p>
        </div>
      )}
    </div>
  )
}

export default Starred
