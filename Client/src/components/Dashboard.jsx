import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Dashboard = () => {
  const { state } = useLocation()
  const { formData } = state || {}

  // Dummy data for events
  const dummyEvents = [
    { id: 1, name: 'Event 1', date: '2025-01-30' },
    { id: 2, name: 'Event 2', date: '2025-02-10' },
    { id: 3, name: 'Event 3', date: '2025-03-05' },
  ]

  const [registeredEvents, setRegisteredEvents] = useState([])

  
  useEffect(() => {
    if (formData?.userId) {
      setRegisteredEvents(dummyEvents)
    }
  }, [formData])

  return (
    <div className='flex justify-center items-center min-h-screen py-8 px-4'>
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

          {/* Display Registered Events */}
          <div className='col-span-2 mt-6'>
            <h2 className='text-xl font-bold text-white'>Registered Events</h2>
            {registeredEvents.length > 0 ? (
              <ul className='mt-4'>
                {registeredEvents.map((event) => (
                  <li key={event.id} className='text-white mb-2'>
                    <p className='font-semibold'>{event.name}</p>
                    <p>{event.date}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className='text-white'>No events registered yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
