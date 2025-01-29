import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Styles/Registration.css'
import icecream from '../assets/food/icecream.gif'
import authServices from '../api/auth.js'
import { Eye, EyeOff } from 'lucide-react'
import logo from '../assets/logo.png'

const foodItems = ['🍕', '🍔', '🍩', '🍣', '🌮', '🥞', '🍪', '🍿']

const Registration = () => {
  const [fallingFood, setFallingFood] = useState([])
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    rollno: '',
    college: '',
    usertype: '',
    password: '',
    confirmPassword: '',
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const interval = setInterval(() => {
      const newFood = {
        id: Date.now(),
        type: foodItems[Math.floor(Math.random() * foodItems.length)],
        left: Math.random() * 100,
      }
      setFallingFood((prev) => [...prev, newFood])

      setTimeout(() => {
        setFallingFood((prev) => prev.filter((item) => item.id !== newFood.id))
      }, 5000)
    }, 500)

    return () => clearInterval(interval)
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log('Form Data Submitted:', formData)

    if (formData.confirmPassword !== formData.password) {
      alert("Passwords don't match.")
    } else {
      try {
        let userData = {
          username: formData.username,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phn: formData.mobile,
          type: formData.usertype,
          rollno: formData.rollno,
          college: formData.college,
        }
        const response = await authServices.register(userData)

        if (response) {
          alert(`Registration Successful: ${response.message}`)
          navigate('/events')
        }
      } catch (error) {
        if (error.response) {
          console.error('Error:', error.response.data.error)
          alert(`Registration failed: ${error.response.data.error}`)
        } else {
          console.error('Error:', error.message)
          alert('An unexpected error occurred. Please try again later.')
        }
      }
    }
  }

  return (
    <div className='registration-page'>
      <div className='left-section'>
        <img
          src={logo}
          alt='Main Logo'
          className='h-auto max-h-40 w-auto max-w-xl mb-2'
        />
        <div className='background-food'>
          {fallingFood.map((food) => (
            <div
              key={food.id}
              className='food-item'
              style={{ left: `${food.left}%` }}
            >
              {food.type}
            </div>
          ))}
        </div>
        <div className='video-frame'>
          <img src={icecream} alt='Ice Cream Animation' />
        </div>
        <div className='button-group'>
          <button className='nav-btn' onClick={() => navigate('/login')}>
            Login
          </button>
          <button className='nav-btn active'>Register</button>
        </div>
      </div>

      <div className='right-form'>
        <div className='form-card'>
          <div className='header'>
            <h1>Register</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className='grouped-input'>
              <div className='input-group'>
                <label>User Name</label>
                <input
                  type='text'
                  name='username'
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='grouped-input'>
              <div className='input-group'>
                <label>First Name</label>
                <input
                  type='text'
                  name='firstName'
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='input-group'>
                <label>Last Name</label>
                <input
                  type='text'
                  name='lastName'
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='grouped-input'>
              <div className='input-group'>
                <label>Email</label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='input-group'>
                <label>Mobile</label>
                <input
                  type='text'
                  name='mobile'
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='grouped-input'>
              <div className='input-group'>
                <label>Roll Number</label>
                <input
                  type='text'
                  name='rollno'
                  value={formData.rollno}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className='input-group'>
                <label>College Name</label>
                <input
                  type='text'
                  name='college'
                  value={formData.college}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className='grouped-input'>
              <div className='input-group'>
                <label>User Type</label>
                <select
                  name='usertype'
                  value={formData.usertype}
                  onChange={handleChange}
                  required
                >
                  <option value='' disabled>
                    Select User Type
                  </option>
                  <option value='Insider'>Insider</option>
                  <option value='Outsider'>Outsider</option>
                </select>
              </div>
            </div>
            <div className='grouped-input'>
              <div className='input-group'>
                <label>Password</label>
                <div className='password-input'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type='button'
                    className='eye-icon'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
              <div className='input-group'>
                <label>Confirm Password</label>
                <div className='password-input'>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name='confirmPassword'
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type='button'
                    className='eye-icon'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button type='submit' className='submit-btn'>
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Registration
