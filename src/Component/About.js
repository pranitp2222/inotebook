import React, { useEffect } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
    const a = useContext(noteContext)

  return (
    <div>
      <h1>About Section</h1>
    </div>
  )
}

export default About
