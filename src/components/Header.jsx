import { Link, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import '../styles/header.scss'

const Header = ({ searchMovies, search }) => {
  const { starredMovies } = useSelector((state) => state.starred)
  const { watchLaterMovies } = useSelector((state) => state.watchLater)
  const [value, setValue] = useState(search || '')

  const onChangeHandler = (e) => {
    setValue(e.target.value || '')
    searchMovies(e.target.value)
  }

  return (
    <header>
      <Link to="/" data-testid="home" onClick={scrollToTop}>
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred" onClick={scrollToTop}>
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" data-testid="nav-watch-later" className="nav-fav" onClick={scrollToTop}>
          {watchLaterMovies.length > 0 ? (
            <>
              <i className="bi bi-heart-fill bi-heart-fill-white" />
              <sup className="watch-later-number">{watchLaterMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-heart" />
          )}
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" className="search-link" onClick={scrollToTop}>
          <input type="search" data-testid="search-movies"
            value={value}
            onChange={onChangeHandler}
            className="form-control rounded"
            placeholder="Search movies..."
            aria-label="Search movies"
            aria-describedby="search-addon"
          />
        </Link>
      </div>
    </header>
  )
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

export default Header
