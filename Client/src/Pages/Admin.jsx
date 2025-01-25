import React, { useState, useEffect } from 'react'

const Admin = () => {
  // Set data
  const [data, setData] = useState({
    totalVisitors: 0,
    ticketsPurchased: 0,
    registeredUsers: 0,
    users: [],
  })

  // Fetching data in useEffect
  useEffect(() => {
    const fetchData = async () => {
      const dummyData = {
        totalVisitors: 1500,
        ticketsPurchased: 400,
        registeredUsers: 1000,
        users: [
          {
            Tid: 1,
            name: 'Alice',
            college: 'Inside',
            feedback: 'Great experience!',
          },
          {
            Tid: 2,
            name: 'Bob',
            college: 'Outside',
            feedback: 'Good organization.',
          },
          {
            Tid: 3,
            name: 'Charlie',
            college: 'Inside',
            feedback: 'Loved the event!',
          },
          {
            Tid: 4,
            name: 'Diana',
            college: 'Outside',
            feedback: 'Could improve logistics.',
          },
          {
            Tid: 5,
            name: 'Eve',
            college: 'Inside',
            feedback: 'Had a wonderful time.',
          },
        ],
      }

      setTimeout(() => {
        setData(dummyData)
      }, 1000)
    }

    fetchData()
  }, [])

  return (
    <div className='p-6 bg-gray-100 min-h-screen'>
      <h1 className='text-3xl font-bold mb-6 text-gray-800'>Admin Dashboard</h1>

      {/* Summary Cards */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='bg-white p-4 shadow rounded-lg'>
          <h2 className='text-xl font-semibold text-gray-700'>
            Total Visitors
          </h2>
          <p className='text-4xl font-bold text-blue-600 mt-2'>
            {data.totalVisitors}
          </p>
        </div>
        <div className='bg-white p-4 shadow rounded-lg'>
          <h2 className='text-xl font-semibold text-gray-700'>
            Tickets Purchased
          </h2>
          <p className='text-4xl font-bold text-green-600 mt-2'>
            {data.ticketsPurchased}
          </p>
        </div>
        <div className='bg-white p-4 shadow rounded-lg '>
          <h2 className='text-xl font-semibold text-gray-700'>
            Registered Users
          </h2>
          <p className='text-4xl font-bold text-purple-600 mt-2'>
            {data.registeredUsers}
          </p>
        </div>
      </div>

      {/* User Table */}
      <div className='mt-8 bg-white p-6 shadow rounded-lg '>
        <h2 className='text-2xl font-semibold text-gray-800 mb-4'>
          User Details
        </h2>
        {data.users.length > 0 ? (
          <table className='w-full text-left border-collapse ' > 
            <thead>
              <tr>
                <th className='border-b-2 p-4'>TID</th>
                <th className='border-b-2 p-4'>Name</th>
                <th className='border-b-2 p-4'>College</th>
                <th className='border-b-2 p-4'>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user) => (
                <tr key={user.Tid}>
                  <td className='border-b p-4'>{user.Tid}</td>
                  <td className='border-b p-4'>{user.name}</td>
                  <td className='border-b p-4'>{user.college}</td>
                  <td className='border-b p-4'>{user.feedback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-gray-500'>Loading user data...</p>
        )}
      </div>
    </div>
  )
}

export default Admin
