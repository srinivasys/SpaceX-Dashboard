import React, {useState, useEffect} from 'react'

import Loader from '../components/Loader'

const Cores = () => {
  const [coresData, setCoresData] = useState('')

  useEffect(() => {
    const fetchCoresData = async () => {
      const url = 'https://api.spacexdata.com/v4/cores'
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setCoresData(data)
    }
    fetchCoresData()
  }, []) 

  return (
    <>
      {!coresData ? (
        <Loader />
      ) : (
        <article className='py-32'>
          <h1 className='heading text-center mb-10'>Cores</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {coresData.map(({id, status, serial, launches, last_update, asds_landings, rtls_landings, reuse_count}) => (
              <article key={id} className='articles'>
                <h2 className='text-xl font-bold mb-5'>{serial}</h2>

                <ul>
                  <li className='mb-1'>Reused {reuse_count} times</li>
                  <li className='mb-1'>{launches.length} launches</li>
                  <li className='mb-1'>{asds_landings} ASDS Landings</li>
                  <li className='mb-1'>{rtls_landings} RTLS Landings</li>
                  {status === 'active' ? (
                    <li className="text-emerald-500">Active</li>
                  ) : (
                    <li className="text-rose-500 capitalize">{status}</li>
                  )}
                </ul>

                <p className='opacity-75 mt-5'>{last_update}</p>
              </article>
            ))}
          </div>
        </article>
      )}
    </>
  )
}

export default Cores