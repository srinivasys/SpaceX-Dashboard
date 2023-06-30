import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'

import Loader from '../components/Loader'

const LaunchPadsCard = () => {
  const [singleLaunchPadsData, setSingleLaunchPadsData] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleLaunchPadsData = async () => {
      const url = `https://api.spacexdata.com/v4/launchpads/${id}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setSingleLaunchPadsData(data)
    }

    fetchSingleLaunchPadsData()
  }, [id])

  return (
    <>
      {!singleLaunchPadsData ? (
        <Loader />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2">
          <article>
            <h1 className="heading">{singleLaunchPadsData.full_name}</h1>
            <h2 className="text-white text-2xl opacity-75 font-bold mt-2">{singleLaunchPadsData.name}</h2>

            <div className="my-8 grid grid-cols-1 gap-8 md:grid-cols-2">
              <ul className="text-white opacity-75 text-sm flex flex-col items-start justify-start gap-3">
                <li>{singleLaunchPadsData.launches.length} launches</li>
                <li>{singleLaunchPadsData.landing_successes} landing successful</li>
                {singleLaunchPadsData.status === 'active' ? (
                  <li className="text-emerald-500 capitalize">{singleLaunchPadsData.status}</li>
                ) : (
                  <li className="text-rose-500 capitalize">{singleLaunchPadsData.status}</li>
                )}
              </ul>

              <ul className='text-white'>
                <h3 className="font-bold text-lg mb-1">Region</h3>
                <li className="opacity-75 mb-2 text-sm">Locality: {singleLaunchPadsData.locality}</li>
                <li className="opacity-75 text-sm">Region: {singleLaunchPadsData.region}</li>
              </ul>
            </div>

            <p className="text-white opacity-75 mb-10">{singleLaunchPadsData.details}</p>

            <ul className="flex items-center justify-start gap-3 mt-10">
                <li className="text-white opacity-75 text-sm hover:opacity-100">
                  <Link to='/landpads'>&larr; Back</Link>
                </li>
              </ul>
          </article>

          <article>
            <img src={singleLaunchPadsData.images.large[0]} alt={singleLaunchPadsData.full_name} className='h-full object-cover' />
          </article>
        </section>
      )}
    </>
  )
}

export default LaunchPadsCard