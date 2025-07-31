import React from 'react'
import Sidebar from '../components/Sidebar'
import RegisterForm from '../components/RegisterForm'
import ViewTransation from '../components/ViewTransation'
import Account from '../components/Account'

function MainApp() {
  return (
    <div>

        <Account/>
        <RegisterForm/>
        <ViewTransation/>
    </div>
  )
}

export default MainApp
