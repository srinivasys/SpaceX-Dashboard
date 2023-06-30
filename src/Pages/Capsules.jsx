import React, {useState, useEffect} from 'react'

import Loader from '../components/Loader'

const Capsules = () => {
  const [capsuleData, setCapsuleData] = useState('')

  useEffect(() => {
    const fetchCapsuleData = async () => {
      const url = 'https://api.spacexdata.com/v4/capsules'
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setCapsuleData(data)
    }
    fetchCapsuleData()
  }, [])

  return (
    <>
      {!capsuleData ? (
        <Loader />
      ) : (
        <section className='py-32'>
          <h1 className='heading text-center mb-10'>Capsules</h1>

          <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5'>
            {capsuleData.map(({id, type, status, serial, launches, land_landings, water_landings, last_update, reuse_count,}) => (
              <article key={id} className='articles'>
                <h2 className='text-xl font-bold mb-5'>
                  {type},{" "}
                  <span className="text-base opacity-75 font-light">{serial}</span>
                </h2>
                <ul>
                  <li className='mb-1'>{launches.length} launches</li>
                  <li className='mb-1'>{land_landings} land landings</li>
                  <li className='mb-1'>{water_landings} water landings</li>
                  <li className='mb-1'>Reused {reuse_count} times</li>
                  {status === 'active' ? (
                    <li className="text-emerald-500">Active</li>
                  ) : (
                    <li className="text-rose-500">Retired</li>
                  )}
                </ul>
                <p className='opacity-75 mt-5'>{last_update}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default Capsules