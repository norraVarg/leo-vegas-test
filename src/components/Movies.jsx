import Movie from './Movie'

const Movies = ({ movies, viewTrailer, anchorRef, hasMoreMovies }) => {
    return (
        <section>
            <div data-testid="movies" className='responsive-grid'>
                {movies.movies.results.map((movie) => {
                    return (
                        <Movie
                            movie={movie}
                            key={movie.id}
                            viewTrailer={viewTrailer}
                        />
                    )
                })}
            </div>
            <div ref={anchorRef}>{hasMoreMovies && (<span>Fetching more movies...</span>)}</div>
            {!hasMoreMovies && (<div className='no-more-movies'>No more movies to display</div>)}
        </section>
    )
}

export default Movies
