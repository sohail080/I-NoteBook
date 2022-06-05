import React from 'react'
import { useContext , useEffect } from 'react'
import noteContext from '../context/notes/noteContext'

const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update()
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
      <h1>about {a.state.name} and {a.state.age}</h1>
    </div>
  )
}

export default About
