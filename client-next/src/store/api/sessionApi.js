import { baseApi } from './baseApi'

// Session-type endpoints — public read (SSR home page uses plain fetch) +
// admin write (Phase 2).
export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSessions: builder.query({
      query: () => '/sessions',
      providesTags: (result) =>
        result?.data?.sessions
          ? [
              ...result.data.sessions.map((session) => ({ type: 'Session', id: session._id })),
              { type: 'Session', id: 'LIST' },
            ]
          : [{ type: 'Session', id: 'LIST' }],
    }),

    createSession: builder.mutation({
      query: (data) => ({ url: '/sessions', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Session', id: 'LIST' }],
    }),

    updateSession: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/sessions/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Session', id },
        { type: 'Session', id: 'LIST' },
      ],
    }),

    deleteSession: builder.mutation({
      query: (id) => ({ url: `/sessions/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Session', id },
        { type: 'Session', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetSessionsQuery,
  useCreateSessionMutation,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = sessionApi
