import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import './EventDetail.css'
import Img from '../assets/dance.png'

// Event details data
const eventDetails = {
  Dance: {
    name: 'Dance',
    subTabs: {
      Centrifuge: {
        icon: '../assets/dance.png',
        description: 'description about the event',
        content:
          'Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Centrifuge 1.',
          'Rule for Centrifuge 2.',
          'Rule for Centrifuge 3.',
        ],
      },
      Shuffle: {
        icon: '/assets/test.jpeg',
        description: 'description about the shuffle event',
        content:
          'Judging criteria and process... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Shuffle 1.',
          'Rule for Shuffle 2.',
          'Rule for Shuffle 3.',
        ],
      },
      'Shake a leg': {
        icon: '../assets/dance.png',
        description: 'description about the  shake  event',
        content:
          'Steps and process for registering... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Shake a Leg 1.',
          'Rule for Shake a Leg 2.',
          'Rule for Shake a Leg 3.',
        ],
      },
      'Two For A Tango': {
        icon: '/assets/dance.png',
        description: 'description about the two for a tango event',
        content:
          'Details about the dance performance... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: ['Rule for Two for a Tango 1.', 'Rule for Two for a Tango 2.'],
      },
      Nrityakala: {
        icon: '/assets/dance.png',
        description: 'description about the Nrityakala event',
        content:
          'Judging criteria and process... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Nrityakala 1.',
          'Rule for Nrityakala 2.',
          'Rule for Nrityakala 3.',
        ],
      },
    },
  },

  // music
  Music: {
    name: 'Music',
    subTabs: {
      sf_idol: {
        icon: '/assets/dance.png',
        description: 'description about the sf_idol event',
        content:
          'Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Centrifuge 1.',
          'Rule for Centrifuge 2.',
          'Rule for Centrifuge 3.',
        ],
      },
      Shuffle: {
        icon: '/assets/dance.png',
        description: 'description about the shuffle event',
        content:
          'Judging criteria and process... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          '1. The time limit for the overall performance is 5 minutes exceeding which by 1 minute will lead to disqualification.',
          'Rule for Shuffle 2.',
          'Rule for Shuffle 3.',
        ],
      },
      'Shake a leg': {
        icon: '/assets/dance.png',
        description: 'description about the event',
        content:
          'Steps and process for registering... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Shake a Leg 1.',
          'Rule for Shake a Leg 2.',
          'Rule for Shake a Leg 3.',
        ],
      },
      'Two For A Tango': {
        icon: '/assets/dance.png',
        description: 'description about the event',
        content:
          'Details about the dance performance... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: ['Rule for Two for a Tango 1.', 'Rule for Two for a Tango 2.'],
      },
      Nrityakala: {
        icon: '/assets/dance.png',
        description: 'description about the event',
        content:
          'Judging criteria and process... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Nrityakala 1.',
          'Rule for Nrityakala 2.',
          'Rule for Nrityakala 3.',
        ],
      },
    },
  },

  // dramatic
  Dramatics: {
    name: 'Dramatics',
    subTabs: {
      sf_idol: {
        icon: '/assets/dance.png',
        description: 'description about the event',
        content:
          'Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Centrifuge 1.',
          'Rule for Centrifuge 2.',
          'Rule for Centrifuge 3.',
        ],
      },
      Shuffle: {
        icon: '/assets/dance.png',
        description: 'description about the event',
        content:
          'Judging criteria and process... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Shuffle 1.',
          'Rule for Shuffle 2.',
          'Rule for Shuffle 3.',
        ],
      },
      'Shake a leg': {
        icon: '/assets/dance.png',
        description: 'description about the event',
        content:
          'Steps and process for registering... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Shake a Leg 1.',
          'Rule for Shake a Leg 2.',
          'Rule for Shake a Leg 3.',
        ],
      },
      'Two For A Tango': {
        icon: '/assets/dance.png',
        description: 'description about the event',
        content:
          'Details about the dance performance... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: ['Rule for Two for a Tango 1.', 'Rule for Two for a Tango 2.'],
      },
      Nrityakala: {
        icon: '/assets/dance.png',
        description: 'description about the event',
        content:
          'Judging criteria and process... Details about the dance performance... Embrace the beauty of tradition as you take the stage. Join our solo classical dance competition, nrityakala to showcase your finesse, portraying stories through the mesmerizing language of classical dance.',
        rules: [
          'Rule for Nrityakala 1.',
          'Rule for Nrityakala 2.',
          'Rule for Nrityakala 3.',
        ],
      },
    },
  },
}

const EventDetail = () => {
  const { eventName } = useParams()
  const [selectedEvent, setSelectedEvent] = useState(eventName || 'Dance')
  const [selectedSubTab, setSelectedSubTab] = useState(
    Object.keys(eventDetails[selectedEvent]?.subTabs || {})[0] 
  )

  const handleTabChange = (eventName) => {
    setSelectedEvent(eventName)
    setSelectedSubTab(Object.keys(eventDetails[eventName]?.subTabs || {})[0]) 
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
          <img
            // src={Img}
            src={event.subTabs[selectedSubTab]?.icon || Img}
            className='e-icon'
            alt={`${event.name} Icon`}
          />
          <div className='event-title-wrapper'>
            <h1 className='event-title'>{event.name}</h1>
            <p className='e-desc'>
              {event.subTabs[selectedSubTab]?.description}
            </p>
            <button className='register-btn'>Register</button>
          </div>
        </div>

        <h2>About</h2>
        <p>{event.subTabs[selectedSubTab]?.content}</p>

        <h2>Rules</h2>
        <ul className='event-rules'>
          {event.subTabs[selectedSubTab]?.rules?.map((rule, index) => (
            <li key={index}>{rule}</li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default EventDetail
