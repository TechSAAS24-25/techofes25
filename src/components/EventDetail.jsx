import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './EventDetail.css'

// Event details data
const eventDetails = {
  Dance: {
    icon: '/assets/dance.png',
    name: 'Dance',
    subTabs: {
      Centrifuge: 'Details about the dance performance...',
      Shuffle: 'Judging criteria and process...',
      'Shake a leg': 'Steps and process for registering...',
      'Two For A Tango': 'Details about the dance performance...',
      Nrityakala: 'Judging criteria and process...',
    },
    about:
      'The inter-collegiate group dance competition is a platform for the best dancing troupes across the country to flaunt their hypnotic moves. Step onto our stage where synchronized moves and collective energy create a mesmerizing spectacle.',
    rules: [
      
      'Teams are STRICTLY prohibited from mentioning college names during the performance by any medium. Any team doing so will be awarded a penalty.',
      'All dance forms, including hip-hop, Punjabi, Jazz, Kathakali, Contemporary, etc., are allowed.',
      'Judging criteria includes: (A) Synchronisation and coordination (40 points), (B) Choreography and creativity (30 points), (C) Artistic Presentation (30 points).',
      // 'Winners get a chance to grab a direct spot in Centrifuge during the main fest.',
    ],
  },
  Music: {
    icon: '/assets/music.png',
    name: 'Music',
    subTabs: {
      'Beat it': 'Details about the music performance...',
      'Sf idol': 'Judging criteria and process...',
      Sargam: 'Steps and process for registering...',
    },
    about:
      'Showcase your musical talent in this exciting inter-collegiate music competition.',
    rules: [
      'Performance time limit is 7 minutes.',
      'Use of pre-recorded tracks is allowed.',
      'Solo or group participation is allowed.',
    ],
  },
  Dramatics: {
    icon: '/assets/dramatics.png',
    name: 'Dramatics',
    subTabs: {
      'I Me Myself': 'Details about the dramatics performance...',
      Mine: 'Judging criteria and process...',
      Nukkad: 'Steps and process for registering...',
    },
    about:
      'Show your acting and storytelling skills in this inter-collegiate dramatics competition.',
    rules: [
      'Performance time limit is 10 minutes.',
      'Props and costumes are allowed.',
      'Solo or group participation is allowed.',
      'Any form of drama, including comedy, tragedy, and improvisation, is welcome.',
    ],
  },
}

const EventDetail = () => {
  const { eventName } = useParams()
  const [selectedEvent, setSelectedEvent] = useState(eventName || 'Dance')
  const [selectedSubTab, setSelectedSubTab] = useState('Performance')

  const handleTabChange = (eventName) => {
    setSelectedEvent(eventName)
    setSelectedSubTab('Performan') // Reset to default sub-tab when event changes
  }

  const handleSubTabChange = (subTab) => {
    setSelectedSubTab(subTab)
  }

  const event = eventDetails[selectedEvent]

  return (
    <>
      <h2 className='e-heading'>{selectedEvent}</h2>
      {/* Sub-Tabs for the Selected Event */}
      <div className='sub-tabs'>
        {Object.keys(event.subTabs).map((subTab) => (
          <div
            key={subTab}
            onClick={() => handleSubTabChange(subTab)}
            className={`e-subtab ${
              selectedSubTab === subTab ? 'active-sub-tab' : ''
            }`}
          >
            <div
              className={`e-top ${
                selectedSubTab === subTab ? 'active-line' : ''
              }`}
            ></div>
            <p className='e-sub-title'>{subTab}</p>

            <div
              className={`e-bottom ${
                selectedSubTab === subTab ? 'active-line' : ''
              }`}
            ></div>
          </div>
        ))}
      </div>

      {/* Event Details Container */}
      <div className='event-detail-container'>
        {/* Event Details */}
        <div className='event-head'>
          <img src={event.icon} className='e-icon' alt={`${event.name} Icon`} />
          <div className='event-title-wrapper'>
            <h1 className='event-title'>{event.name}</h1>
            <button className='register-btn'>Register</button>
          </div>
        </div>

        {/* Display Content Based on Selected Sub-Tab */}
        {/* <h2>{selectedSubTab}</h2> */}

        <h2>About</h2>
        {/* <p className='event-about'>{event.about}</p> */}
        <p className='event-about'>{event.subTabs[selectedSubTab]}</p>

        <h2>Rules</h2>
        <ul className='event-rules'>
          {event.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default EventDetail
