import { Link, NavLink } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useState } from 'react'
import '../styles/header.scss'

const Header = ({ searchMovies, search }) => {
  const { starredMovies } = useSelector((state) => state.starred)
  const [value, setValue] = useState(search || '')

  const onChangeHandler = (e) => {
    setValue(e.target.value || '')
    searchMovies(e.target.value)
  }

  return (
    <header>
      <Link to="/" data-testid="home">
        <i className="bi bi-film" />
      </Link>

      <nav>
        <NavLink to="/starred" data-testid="nav-starred" className="nav-starred">
          {starredMovies.length > 0 ? (
            <>
              <i className="bi bi-star-fill bi-star-fill-white" />
              <sup className="star-number">{starredMovies.length}</sup>
            </>
          ) : (
            <i className="bi bi-star" />
          )}
        </NavLink>
        <NavLink to="/watch-later" className="nav-fav">
          watch later
        </NavLink>
      </nav>

      <div className="input-group rounded">
        <Link to="/" className="search-link" onClick={() => window.scrollTo(0, 0)}>
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

export default Header
