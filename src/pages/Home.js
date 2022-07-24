import React from 'react'
import './Home.css'

function Home(props) {
  return (
    <>
    <div className='home__msg'>
        Welcome {props.uid}
    </div>
    </>
  )
}

export default Home