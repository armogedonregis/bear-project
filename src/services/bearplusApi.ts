import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store/store'

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_KEY,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
});


export const bearplusApi = createApi({
  reducerPath: 'bearplus',
  baseQuery: baseQuery,
  tagTypes: ["Admin", "Users", "Requests"],
  endpoints: (build) => ({

  }),
})