import Movie from './Movie'

const Movies = ({ movies, viewTrailer, anchorRef, fetchMore, noMoreMovies }) => {
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
            <div ref={anchorRef}>{fetchMore && !noMoreMovies && (<span>fetching more...</span>)}</div>
            {noMoreMovies && (<div>No more movies to display</div>)}
        </section>
    )
}

export default Movies
