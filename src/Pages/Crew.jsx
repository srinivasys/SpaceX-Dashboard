import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'

const Crew = () => {
  const [crewData, setCrewData] = useState('')

  useEffect(() => {
    const fetchCrewData = async () => {
      const url = 'https://api.spacexdata.com/v4/crew'
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setCrewData(data)
    }
    fetchCrewData()
  }, [])

  return (
    <>
      {!crewData ? (
        <Loader />
      ) : (
        <section className='py-32'>
          <h1 className='heading text-center mb-10'>Crew</h1>

          <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5'>
            {crewData.map(({id, name, image}) => (
              <Link to={`/crew/${id}`} key={id}>
                <article className='relative'>
                  <img src={image} alt={name} className='h-96 w-full object-cover' loading='lazy' />
                  <h2 className="absolute bottom-5 left-5 font-bold text-white text-lg tracking-wide">{name}</h2>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default Crew