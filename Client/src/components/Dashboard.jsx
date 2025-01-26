import React from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {

  const { state } = useLocation()
  const { formData } = state || {}

  return (
    <div className='flex justify-center items-center min-h-screen  py-8 px-4'>
      <div className=' bg-black bg-opacity-20 backdrop-blur-lg text-black rounded-lg w-full max-w-3xl p-8'>
        <div className='text-center mb-6'>
          <h1 className='text-2xl font-bold '>Registration Details</h1>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm'>
            <label className='font-semibold text-white'>Username</label>
            <p className='text-white mt-2'>{formData?.username}</p>
          </div>

          <div className='text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm'>
            <label className='font-semibold text-white'>Full Name</label>
            <p className='text-white mt-2'>
              {formData?.firstName} {formData?.lastName}
            </p>
          </div>

          <div className='text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm'>
            <label className='font-semibold text-white'>Email</label>
            <p className='text-white mt-2'>{formData?.email}</p>
          </div>

          <div className='text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm'>
            <label className='font-semibold text-white'>Mobile</label>
            <p className='text-white mt-2'>{formData?.mobile}</p>
          </div>

          <div className='text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm'>
            <label className='font-semibold text-white'>Roll Number</label>
            <p className='text-white mt-2'>{formData?.rollno}</p>
          </div>

          <div className='text-base bg-[#371426] text-white p-4 rounded-lg shadow-sm'>
            <label className='font-semibold text-white'>User Type</label>
            <p className='text-white mt-2'>{formData?.usertype}</p>
          </div>

          
        </div>
      </div>
    </div>
  )
}

export default Dashboard
