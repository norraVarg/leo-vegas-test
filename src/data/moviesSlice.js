import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchMovies = createAsyncThunk('fetch-movies', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})

export const fetchMoviesPageOne = createAsyncThunk('fetch-movies-page-one', async (apiUrl) => {
    const response = await fetch(apiUrl)
    return response.json()
})

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        movies: {
            results: [],
            page: 0,
            total_pages: 0,
        },
        fetchStatus: '',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            const { page, results, total_pages } = action.payload
            state.movies = {
                results: [...state.movies.results, ...results],
                page,
                total_pages
            }
            state.fetchStatus = 'success'
        }).addCase(fetchMovies.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMovies.rejected, (state) => {
            state.fetchStatus = 'error'
        }).addCase(fetchMoviesPageOne.fulfilled, (state, action) => {
            state.movies = action.payload
            state.fetchStatus = 'success'
        }).addCase(fetchMoviesPageOne.pending, (state) => {
            state.fetchStatus = 'loading'
        }).addCase(fetchMoviesPageOne.rejected, (state) => {
            state.fetchStatus = 'error'
        })
    }
})

export default moviesSlice
