import React from 'react'
import UserLearning from '../Components/Adminportal/Userlearning.js'
import Navbar from '../Components/Navbar/Navbar.js'
import { useNavigate } from 'react-router-dom'

const EmployeeDetailsPage = () => {
  const Navigate=useNavigate()
  const handleClick=()=>{
    Navigate('/admin')
  }
   
  return (
    <div>
        <Navbar/>
        <div className='bg-gray-600 p-2 m-4 w-16 flex items-center justify-center rounded-lg text-gray-200 cursor-pointer' onClick={handleClick}><p>Back</p></div>
        <UserLearning/>
    </div>
    
  )
}

export default EmployeeDetailsPage