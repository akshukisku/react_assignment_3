// import React from 'react'
// import Login from './layout/Login'
// import Register from './layout/Register'
import { RouterProvider } from 'react-router-dom'
import Routes from './routes/Routes'
import { Toaster } from 'sonner'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Theme } from './theme/Theme';

const App = () => {
  return (
    <>
    <ThemeProvider theme={Theme}>
    <CssBaseline/>
    <RouterProvider router={Routes}/>
    <Toaster position='top-right' richColors />
    </ThemeProvider>
    </>
   )
}

export default App