import { baseApi } from './baseApi'

// Booking endpoints — public create (the /elaqe reservation form) + admin
// list/update (Phase 2).
export const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({ url: '/bookings', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Booking', id: 'LIST' }],
    }),

    getBookings: builder.query({
      query: (params = {}) => ({ url: '/bookings', params }),
      providesTags: (result) =>
        result?.data?.bookings
          ? [
              ...result.data.bookings.map((booking) => ({ type: 'Booking', id: booking._id })),
              { type: 'Booking', id: 'LIST' },
            ]
          : [{ type: 'Booking', id: 'LIST' }],
    }),

    updateBooking: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/bookings/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Booking', id },
        { type: 'Booking', id: 'LIST' },
      ],
    }),
  }),
})

export const { useCreateBookingMutation, useGetBookingsQuery, useUpdateBookingMutation } =
  bookingApi
