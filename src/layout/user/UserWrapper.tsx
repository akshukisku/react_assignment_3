// import React from 'react'
import { Outlet } from 'react-router-dom'
import UserSidebar from './UserSidebar'
import { Box } from '@mui/material'

const UserWrapper = () => {
  return (
    <Box sx={{width:"100%",display:"flex",}}>
    <Box sx={{width:"25%"}}>
      <UserSidebar/>
    </Box>
    <Box sx={{width:"90%",p:2}}>
      <Outlet/>
    </Box>
    </Box>
  )
}

export default UserWrapper