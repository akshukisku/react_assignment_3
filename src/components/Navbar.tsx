import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const navigate = useNavigate()
    const navItems = [{
        label:"Form",
        path:"/form",
    },{
        label:"Student",
        path:"/login",
    },{
        label:"Timer",
        path:"/stopwatch"
    }]
  return (
    <div style={{height:"10vh",width:"100%",display:"flex",alignItems:"center",justifyContent:"end"}}>
        {navItems.map((item,index)=>(
            <Button key={index} onClick={()=>navigate(item.path)}>{item.label}</Button>
        ))}
    </div>
  )
}

export default Navbar