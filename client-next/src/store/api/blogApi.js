import { baseApi } from './baseApi'

// Blog endpoints — public read (SSR pages use plain fetch; this powers any
// client-side interaction, e.g. category filtering) + admin write (Phase 2).
export const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: (params = {}) => ({ url: '/blogs', params }),
      providesTags: (result) =>
        result?.data?.blogs
          ? [
              ...result.data.blogs.map((blog) => ({ type: 'Blog', id: blog._id })),
              { type: 'Blog', id: 'LIST' },
            ]
          : [{ type: 'Blog', id: 'LIST' }],
    }),

    getBlog: builder.query({
      query: (slug) => `/blogs/${slug}`,
      providesTags: (result, error, slug) => [{ type: 'Blog', id: slug }],
    }),

    createBlog: builder.mutation({
      query: (data) => ({ url: '/blogs', method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Blog', id: 'LIST' }],
    }),

    updateBlog: builder.mutation({
      query: ({ id, ...data }) => ({ url: `/blogs/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Blog', id },
        { type: 'Blog', id: 'LIST' },
      ],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({ url: `/blogs/${id}`, method: 'DELETE' }),
      invalidatesTags: (result, error, id) => [
        { type: 'Blog', id },
        { type: 'Blog', id: 'LIST' },
      ],
    }),
  }),
})

export const {
  useGetBlogsQuery,
  useGetBlogQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi
