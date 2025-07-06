import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/index.tsx'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import { ToastContainer } from 'react-toastify';



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <ToastContainer
position="top-right"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>
    <Suspense fallback={<div className="text-white p-8 mt-20">Loading...</div>}>
      <RouterProvider router={router} />
    </Suspense>
    </Provider>
  </StrictMode>,
)
