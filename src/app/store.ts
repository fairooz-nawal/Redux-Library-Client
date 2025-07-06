import { booksApi } from '@/features/booksApi'
import { borrowApi } from '@/features/borrowApi'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    [booksApi.reducerPath]: booksApi.reducer,
    [borrowApi.reducerPath]: borrowApi.reducer,

  },



  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(booksApi.middleware, borrowApi.middleware),

})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch