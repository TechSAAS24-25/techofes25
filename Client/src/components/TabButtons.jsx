
import React from 'react'

export default function TabButtons({ petData, activeTab, setActiveTab }) {
  return (
    <ul className='tab__header'>
      {petData.map((item, index) => (
        <div>
          
          <li
            className={`tab__button ${index === activeTab ? 'active' : ''}`}
            key={item.animal}
            onClick={() => setActiveTab(index)} // Update active tab on click
          >
            <span className='iconacc'>

            {item.icon}
            </span>
            {item.animal}
          </li>
        </div>
      ))}
    </ul>
  )
}
