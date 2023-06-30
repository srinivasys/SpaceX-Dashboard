import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'

import Loader from '../components/Loader'

const LandPadsCard = () => {
  const [singleLandPadsData, setSingleLandPadsData] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleLandPadsData = async () => {
      const url = `https://api.spacexdata.com/v4/landpads/${id}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setSingleLandPadsData(data)
    }

    fetchSingleLandPadsData()
  }, [id])

  return (
    <>
      {!singleLandPadsData ? (
        <Loader />
      ) : (
        <section className="py-32 max-width flex flex-col-reverse gap-10 md:grid md:grid-cols-2">
          <article>
            <h1 className="heading">{singleLandPadsData.full_name}</h1>
            <h2 className="font-bold opacity-80 text-lg lg:text-2xl mb-10 text-white mt-2">{singleLandPadsData.name}</h2>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 mt-10">
              <ul className="flex flex-col items-start justify-start gap-3 text-white opacity-75 text-sm">
                <li>{singleLandPadsData.launches.length} launches</li>
                <li>{singleLandPadsData.landing_successes} landing successful</li>
                {singleLandPadsData.status === 'active' ? (
                  <li className="text-emerald-500 capitalize">{singleLandPadsData.status}</li>
                ) : (
                  <li className="text-rose-500 capitalize">{singleLandPadsData.status}</li>
                )}
              </ul>

              <ul className='text-sm text-white'>
                <h3 className="font-bold text-lg mb-2">Location</h3>
                <li className="opacity-75 mb-3">Locality: {singleLandPadsData.locality}</li>
                <li className="opacity-75">Region: {singleLandPadsData.region}</li>
              </ul>
            </div>

            <p className="text-white opacity-75 mt-10">{singleLandPadsData.details}</p>

            <ul className="flex items-center justify-start gap-3 mt-10">
                <li>
                  <a href={singleLandPadsData.wikipedia} target='_blank' className='btn' rel='noreferrer'
                  >
                    Wikipedia
                  </a>
                </li>
                <li className="text-white opacity-75 text-sm hover:opacity-100">
                  <Link to='/landpads'>&larr; Back</Link>
                </li>
              </ul>
          </article>

          <article>
            <img src={singleLandPadsData.images.large[0]} alt={singleLandPadsData.full_name} className='h-full' />
          </article>
        </section>
      )}
    </>
  )
}

export default LandPadsCard