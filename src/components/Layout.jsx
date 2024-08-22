import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'

function Layout() {
  return <>
  <div className="d-flex">
    <div className='col-2'>
    <Sidebar/>
    </div>
    <div className='col-10'>
    <Outlet></Outlet>
    </div>
    </div>
  </>
}

export default Layout