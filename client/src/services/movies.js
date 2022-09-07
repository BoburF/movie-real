import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants/const'

const productApiHeaders = {
    'Content-Type': 'application/json'
}



export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, headers: {...productApiHeaders} }),
    endpoints:(builder) => ({
        getMovies: builder.query({
            query: ()=>({
                url: `/movies`
            })
        }),
        getMovie: builder.query({
            query: (id)=>({
                url: '/movies/' + id
            })
        }),
        addMovie: builder.mutation({
            query: (movie)=>({
                url: '/admin/movies/movies/add',
                body: movie,
                headers: {
                    adminToken: localStorage.getItem('token') || ''
                },
                method: 'POST'
            })
        })
    })
})

export const {useGetMoviesQuery, useGetMovieQuery, useAddMovieMutation} = moviesApi