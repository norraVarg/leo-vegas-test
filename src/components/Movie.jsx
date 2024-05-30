import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import starredSlice from '../data/starredSlice'
import watchLaterSlice from '../data/watchLaterSlice'
import placeholder from '../assets/not-found-500X750.jpeg'
import '../styles/movie.scss'

const Movie = ({ movie, viewTrailer }) => {
    const state = useSelector((state) => state)
    const { starred, watchLater } = state
    const { starMovie, unstarMovie } = starredSlice.actions
    const { addToWatchLater, removeFromWatchLater } = watchLaterSlice.actions

    const dispatch = useDispatch()
    const cardRef = useRef(null)

    const openInfoPanel = () => {
        if (cardRef.current && !cardRef.current.classList.contains('opened')) {
            cardRef.current.classList.add('opened')
        }
    }

    const closeInfoPanel = () => {
        if (cardRef.current && cardRef.current.classList.contains('opened')) {
            cardRef.current.classList.remove('opened')
        }
    }

    return (
        <article ref={cardRef} className="card" onClick={openInfoPanel} >
            <div className="card-content" onClick={(e) => e.stopPropagation()}>
                <img src={(movie.poster_path) ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholder} alt="Movie poster" />
                <div className="overlay"></div>
                <div className='info_panel' onClick={(e) => e.stopPropagation()}>
                    <button type="button" className="close" onClick={closeInfoPanel} aria-label="Close">&times;</button>
                    <h3 className="title">{movie.title}</h3>
                    <div className="year">{movie.release_date?.substring(0, 4)}</div>
                    <div className="overview">{movie.overview}</div>
                    <div className='button-group'>
                        {!starred.starredMovies.map(movie => movie.id).includes(movie.id) ? (
                            <span className="btn-star" data-testid="starred-link" onClick={() =>
                                dispatch(starMovie({
                                    id: movie.id,
                                    overview: movie.overview,
                                    release_date: movie.release_date?.substring(0, 4),
                                    poster_path: movie.poster_path,
                                    title: movie.title
                                })
                                )}>
                                <i className="bi bi-star" />
                            </span>
                        ) : (
                            <span className="btn-star" data-testid="unstar-link" onClick={() => dispatch(unstarMovie(movie))}>
                                <i className="bi bi-star-fill" data-testid="star-fill" />
                            </span>
                        )}
                        {!watchLater.watchLaterMovies.map(movie => movie.id).includes(movie.id) ? (
                            <button type="button" data-testid="watch-later" className="btn btn-light btn-watch-later" onClick={() => dispatch(addToWatchLater({
                                id: movie.id,
                                overview: movie.overview,
                                release_date: movie.release_date?.substring(0, 4),
                                poster_path: movie.poster_path,
                                title: movie.title
                            }))}>Watch Later</button>
                        ) : (
                            <button type="button" data-testid="remove-watch-later" className="btn btn-light btn-watch-later blue" onClick={() => dispatch(removeFromWatchLater(movie))}><i className="bi bi-check"></i></button>
                        )}
                        <button type="button" className="btn btn-dark btn-view-trailer" onClick={() => viewTrailer(movie)}>View Trailer</button>
                    </div>
                </div>
                <h3 className="title">{movie.title}</h3>
            </div>
        </article >
    )
}

export default Movie