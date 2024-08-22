import React from 'react'
import Home from './components/Home'
import Sidebar from './components/Sidebar'
import Layout from './components/Layout'
import ProjectDetails from './components/ProjectDetails'
import {createBrowserRouter , createHashRouter, RouterProvider} from "react-router-dom";
import Profile from './components/Profile'
 

function App() {
  const routes = createBrowserRouter([
    {path : "" , element : <Layout/> , children:[
      {path : "/" , element:<Home/>},
      {path : "ProjectDetails/:id" , element: <ProjectDetails/>},
      {path : "Profile" , element: <Profile/>}
    ]}
  ])
  return <>
    <RouterProvider router={routes}></RouterProvider>
    </>
}

export default App