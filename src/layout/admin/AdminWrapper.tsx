import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import { Box } from '@mui/material'

const AdminWrapper = () => {
  return (
   <>
  <Box sx={{display:"flex"  }}>
     <Sidebar/>
   <Outlet/>
  </Box>
   </>
  )
}

export default AdminWrapper