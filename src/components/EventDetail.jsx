import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './EventDetail.css'

// Dummy Data (Event details)
const dummyEventDetails = {
  Dance: {
    icon: './assets/dance.png',
    name: 'Dance',
    about:
      'The inter-collegiate group dance competition is a platform for the best dancing troupes across the country to flaunt their hypnotic moves.',
    rules: [
      'The time limit for the overall performance is 5 minutes.',
      'Participants may use one or more songs in the performance.',
      'The maximum team size is 15 members.',
      'Use of props is allowed.',
    ],
    subTabs: {
      Solo: 'Solo performance details',
      Group: 'Group performance details',
      Battle: 'Battle performance details',
    },
  },
  Music: {
    icon: './assets/music.png',
    name: 'Music',
    about:
      'Showcase your musical talent in this exciting inter-collegiate music competition.',
    rules: [
      'Performance time limit is 7 minutes.',
      'Use of pre-recorded tracks is allowed.',
      'Solo or group participation is allowed.',
    ],
    subTabs: {
      Solo: 'Solo music performance details',
      Group: 'Group music performance details',
      Band: 'Band music performance details',
    },
  },
  Dramatics: {
    icon: './assets/drama.png',
    name: 'Dramatics',
    about:
      'Showcase your dramatic talent in this exciting inter-collegiate dramatics competition.',
    rules: [
      'Performance time limit is 7 minutes.',
      'Use of props is allowed.',
      'Solo or group participation is allowed.',
    ],
    subTabs: {
      Solo: 'Solo dramatic performance details',
      Group: 'Group dramatic performance details',
      Theater: 'Theater dramatic performance details',
    },
  },
}

const EventDetail = () => {
  const { eventName } = useParams() 
  const [event, setEvent] = useState(null)
  const [selectedSubTab, setSelectedSubTab] = useState('Solo')

  useEffect(() => {
    
    const fetchedEvent = dummyEventDetails[eventName]
    if (fetchedEvent) {
      setEvent(fetchedEvent)
    }
  }, [eventName])

  if (!event) {
    return <h2>Loading...</h2> 
  }

  return (
    <>
      <div className='sub-tabs'>
        {Object.keys(event.subTabs).map((subTab) => (
          <button
            key={subTab}
            onClick={() => setSelectedSubTab(subTab)}
            className={selectedSubTab === subTab ? 'active-sub-tab' : ''}
          >
            {subTab}
          </button>
        ))}
      </div>
      <div className='event-detail-container'>
        <div className='event-head'>
          <img src={event.icon} alt='Event icon' className='e-icon' />
          <div className='event-title-wrapper'>
            <h1 className='event-title'>{event.name}</h1>
            <button className='register-btn'>Register</button>
          </div>
        </div>

        <h2>About</h2>
        <p className='event-about'>{event.about}</p>

        <h2>Rules</h2>
        <ul className='event-rules'>
          {event.rules.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>

        {/* Sub Tabs */}

        <h3>{selectedSubTab}</h3>
        <p>{event.subTabs[selectedSubTab]}</p>
      </div>
    </>
  )
}

export default EventDetail
