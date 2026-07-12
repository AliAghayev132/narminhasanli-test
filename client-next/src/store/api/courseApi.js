import { baseApi } from './baseApi'

// Course endpoints — public read (SSR pages use plain fetch) + admin write
// (Phase 2).
export const courseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: () => '/courses',
      providesTags: (result) =>
        result?.data?.courses
          ? [
              ...result.data.courses.map((course) => ({ type: 'Course', id: course._id })),
              { type: 'Course', id: 'LIST' },
            ]
          : [{ type: 'Course', id: 'LIST' }],
    }),

    getCourse: builder.query({
      query: (slug) => `/courses/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Course', id: slug }],
    }),

    createCourse: builder.mutation({
      query: (data) => ({ url: '/courses', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Course', id: 'LIST' }],
    }),

    updateCourse: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/courses/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Course', id },
        { type: 'Course', id: 'LIST' },
      ],
    }),

    deleteCourse: builder.mutation({
      query: (id) => ({ url: `/courses/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Course', id },
        { type: 'Course', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi
