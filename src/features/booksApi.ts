import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type BookMock from "@/type-interfaces";


const baseUrl = import.meta.env.VITE_API_BASE_URL; 
export const booksApi = createApi({
    reducerPath: "booksApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["Books"],
    endpoints: (builder) => ({


      getBooks: builder.query<BookMock[], void>({
        query: () => "books",
        providesTags: ["Books"],
      }),



      addBooks: builder.mutation<BookMock, BookMock>({
        query: (book) => ({
          url: "books",
          method: "POST",
          body: book,
        }),
        invalidatesTags: ["Books"],
      }),


      editBooks: builder.mutation<BookMock, { id: number; data: Partial<BookMock> }>({
        query: ({ id, data }) => ({
          url: `edit-books/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["Books"],
      }),


      deleteBooks: builder.mutation<{ message: string }, { id: number }>({
        query: ({ id }) => ({
          url: `books/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Books"],
      }),
      

    }),
});


export const { useGetBooksQuery, useAddBooksMutation, useEditBooksMutation, useDeleteBooksMutation } = booksApi;

