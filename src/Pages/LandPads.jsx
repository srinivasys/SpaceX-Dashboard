import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

import Loader from '../components/Loader'

const LandPads = () => {
  const [landPadsData, setLandPadsData] = useState('')

  useEffect(() => {
    const fetchLandPadsData = async () => {
      const url = 'https://api.spacexdata.com/v4/landpads'
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setLandPadsData(data)
    }
    fetchLandPadsData()
  }, [])

  return (
    <>
      {!landPadsData ? (
        <Loader />
      ) : (
        <section className='py-32 max-width'>
          <h1 className="heading text-center mb-10">LandPads</h1>

          <div className='max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5'>
            {landPadsData.map(({id, images, full_name, type, details}) => (
              <Link to={`/landpads/${id}`} key={id}>
                <article>
                  <img src={images.large[0]} alt={full_name} className='h-96 object-cover' />
                  <div className="bg-zinc-900 p-5">
                    <h2 className="text-white font-bold text-xl mb-5">
                      <span className="opacity-75">{type}</span>, {full_name}
                    </h2>
                    <p className="text-white opacity-75 mb-10">{`${details.substring(0, 200)}...`}</p>
                    <Link to={`/landpads/${id}`} className='btn'>Read More &rarr;</Link>
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

export default LandPads