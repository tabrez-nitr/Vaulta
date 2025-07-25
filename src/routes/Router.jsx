
import React from 'react'
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from '../pages/HomePage';
import MainApp from '../pages/MainApp';



const routes = createBrowserRouter([
    {
        path : '/',
        element : <HomePage/>,
    },
     {
        path:'/mainapp',
        element : <MainApp/>
    }
])

function Router() {
  return (
    <div>
      <RouterProvider router={routes} />
    </div>
  )
}

export default Router
