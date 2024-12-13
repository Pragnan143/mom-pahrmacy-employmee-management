
import React from 'react'
import Navbar from '../Components/UserPortal/Navbar'
import Teammates from '../Components/Adminportal/Teammates'


const AdminPage = () => {
  return (
    <div className='h-full'>
        <Navbar />
        <Teammates />
    </div>
  )
}

export default AdminPage