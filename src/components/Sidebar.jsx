import React from 'react'
import { Link } from 'react-router-dom'

function Sidebar() {
  return <>
  <div className='p-0 min-vh-100 bg-dark position-relative'>
    <ul className='text-light list-unstyled'>
      
      <li className='p-3 pe-lg-2 d-lg-flex d-none'>
      <p className='ps-3 fs-4'>Django</p>
      </li>
      
      <li className="p-3 pe-lg-5 sidebar-element">
        <Link to="/" className="nav-link px-0 px-lg-2 text-white"> <i className="fa-solid fa-house fa-lg" style={{color: "#ffffff"}}></i><span className="px-lg-2 ms-1 d-none d-lg-inline">Home</span> </Link>
      </li>

    <li className="p-3 pe-lg-5 sidebar-element">
    <Link to="" className="nav-link px-0 px-lg-2 text-white"> <i className="fa-solid fa-right-from-bracket fa-lg" style={{color: "#ffffff"}}></i><span className="px-lg-2 ms-1 d-none d-lg-inline">Logout</span> </Link>
    </li>

    <li className="px-3 py-4 pe-lg-5 sidebar-element  position-absolute w-100 bottom-0 mb-2">
    <Link to="Profile" className="nav-link px-0 px-lg-2 text-white"> <i className="fa-solid fa-user fa-lg" style={{color: "#ffffff"}}></i><span className="px-lg-2 ms-1 d-none d-lg-inline">Profile</span> </Link>
    </li>

    </ul>
  </div>
  </>
}

export default Sidebar