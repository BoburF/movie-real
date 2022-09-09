import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../constants/const'

const productApiHeaders = {
    'Content-Type': 'application/json'
}
const token = localStorage.getItem('token') || ''



export const moviesApi = createApi({
    reducerPath: 'moviesApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL, headers: { ...productApiHeaders } }),
    tagTypes: ['Movies'],
    endpoints: (builder) => ({
        getMovies: builder.query({
            query: () => ({
                url: `/movies`
            }),
            providesTags: ['Movies']
        }),
        getMovie: builder.query({
            query: (id) => ({
                url: '/movies/' + id
            }),
            providesTags: ['Movies']
        }),
        addMovie: builder.mutation({
            query: (movie) => ({
                url: '/admin/movies/movies/add',
                body: movie,
                headers: {
                    adminToken: token
                },
                method: 'POST'
            }),
            invalidatesTags: ['Movies']
        }),
        delMovie: builder.mutation({
            query: (id) => ({
                url: `/admin/movies/movies/del/${id}`,
                headers: {
                    adminToken: token
                },
                method: 'DELETE'
            }),
            invalidatesTags: ['Movies']
        }),
        getForAdminMovies: builder.query({
            query: () => ({
                url: `/admin/movies/movies`,
                headers: {
                    adminToken: token
                },
            }),
            providesTags: ['Movies']
        }),
    })
})

export const { useGetMoviesQuery, useGetMovieQuery, useAddMovieMutation, useGetForAdminMoviesQuery, useDelMovieMutation } = moviesApi