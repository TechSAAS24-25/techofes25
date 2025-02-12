import React, { useState } from 'react'
import '../Styles/Accommodation.css'
import TabContent from '../components/TabContent'
import TabButtons from '../components/TabButtons'
import { FaBed } from "react-icons/fa";
import { FaInfoCircle } from 'react-icons/fa'
import { FaLocationDot } from 'react-icons/fa6'
import { FaQuestion } from 'react-icons/fa'
import { IoNewspaper } from 'react-icons/io5'



function Accommodation() {
  const [activeTab, setActiveTab] = useState(0)

  const petData = [
    {
      animal: 'ACCOMODATION',
      fact: 'You can check the event website for available options and book your stay in advance.',
      image: '/assets/events/concert.jpeg', // Move images to public/assets
      icon: <FaBed />,
    },
    {
      animal: 'INFO',
      fact: 'Participants need to check in at the reception with a valid ID.',
      image: '/assets/3.svg',
      icon: <FaInfoCircle />,
    },
    {
      animal: 'REACHING ANNA UNIVERSITY',
      fact: 'You can reach via metro, bus, or taxi from the airport or railway station.',
      image: '/assets/1.svg',
      icon: <FaLocationDot />,
    },
    {
      animal: 'FAQ',
      fact: 'For any queries, you can contact the event organizers.',
      image: '/assets/7.svg',
      icon: <FaQuestion />,
    },
    {
      animal: 'RULES',
      fact: ' Participants need to follow the rules and regulations of the event.',
      image: '/assets/5.svg',
      icon: <IoNewspaper />,
    },
  ]

  return (
    <div className='main__container'>
      <h1 className='acctitle'>ACCOMODATION</h1>

      <div className='maincontacc'>
        <div className='mainaccinside'>
          <TabButtons
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            petData={petData}
          />
          <TabContent activeTab={activeTab} petData={petData} />
        </div>
      </div>
    </div>
  )
}

export default Accommodation
