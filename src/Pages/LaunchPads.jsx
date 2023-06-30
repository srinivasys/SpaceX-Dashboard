import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'

const LaunchPads = () => {
  const [launchPadsData, setLaunchPadsData] = useState('')

  useEffect(() => {
    const fetchLaunchPadsData = async () => {
      const url = 'https://api.spacexdata.com/v4/launchpads'
      const response = await fetch(url)
      const data = await response.json()
    //   console.log(data)
      setLaunchPadsData(data)
    }
    fetchLaunchPadsData()
  }, [])

  return (
    <>
      {!launchPadsData ? (
        <Loader />
      ) : (
        <section className='py-32 max-width'>
          <h1 className="heading text-center mb-10">LandPads</h1>

          <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5'>
            {launchPadsData.map(({id, images, name, details}) => (
              <Link to={`/launchpads/${id}`} key={id}>
                <article>
                  <img src={images.large[0]} alt={name} className='h-96 object-cover' />
                  <div className="bg-zinc-900 p-5">
                    <h2 className="text-white text-lg mb-3 font-bold">
                      {name}
                    </h2>
                    <p className="text-white opacity-75 mb-8">{`${details.substring(0, 200)}...`}</p>
                    <Link to={`/launchpads/${id}`} className='btn'>Learn More &rarr;</Link>
                  </div>    
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default LaunchPads