import React from 'react'
import Login from './layout/Login'
import Register from './layout/Register'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <>
    <RouterProvider router={Routes}/>
    <Toaster position='top-right' richColors />
    </>
  )
}

export default App