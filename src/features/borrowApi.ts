import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type BookMock from "@/type-interfaces";


const baseUrl = import.meta.env.VITE_API_BASE_URL; 
export const borrowApi = createApi({
    reducerPath: "borrowApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["Borrow"],
    endpoints: (builder) => ({


      getBorrowBooks: builder.query<BookMock[], void>({
        query: () => "borrowsummary",
        providesTags: ["Borrow"],
      }),



      addBorrowBooks: builder.mutation<BookMock, BookMock>({
        query: (book) => ({
          url: "borrow",
          method: "POST",
          body: book,
        }),
        invalidatesTags: ["Borrow"],
      }),


      editBorrowBooks: builder.mutation<BookMock, { id: number; data: Partial<BookMock> }>({
        query: ({ id, data }) => ({
          url: `edit-borrowsummary/${id}`,
          method: "PATCH",
          body: data,
        }),
        invalidatesTags: ["Borrow"],
      }),


      deleteBorrowBooks: builder.mutation<{ message: string }, { id: number }>({
        query: ({ id }) => ({
          url: `borrow/${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Borrow"],
      }),
      

    }),
});


export const { useGetBorrowBooksQuery, useAddBorrowBooksMutation, useEditBorrowBooksMutation, useDeleteBorrowBooksMutation } = borrowApi;

