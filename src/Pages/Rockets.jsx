import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'

const Rockets = () => {
  const [rocketsData, setRocketsData] = useState('')

  useEffect(() => {
    const fetchRocketsData = async () => {
      const url = 'https://api.spacexdata.com/v4/rockets'
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setRocketsData(data)
    }
    fetchRocketsData()
  }, [])

  return (
    <>
      {!rocketsData ? (
        <Loader />
      ) : (
        <section className='py-32 max-width'>
          <h1 className="heading text-center mb-10">Rockets</h1>

          <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5'>
            {rocketsData.map(({id, name, flickr_images, description}) => (
              <Link to={`/rockets/${id}`} key={id}>
                <article className="bg-zinc-900">
                  <img src={flickr_images[0]} alt={name} className='h-96 object-cover' />
                  <div className="p-5">
                    <h2 className="text-white text-lg mb-3 font-bold">
                      {name}
                    </h2>
                    <p className="text-white opacity-75 mb-10">{`${description.substring(0, 100)}...`}</p>
                    <Link to={`/rockets/${id}`} className='btn'>Read More &rarr;</Link>
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

export default Rockets