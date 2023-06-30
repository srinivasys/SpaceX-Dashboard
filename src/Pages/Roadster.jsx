import React, {useState, useEffect} from 'react'

import Loader from '../components/Loader'
import { format } from 'date-fns' 

const Roadster = () => {
  const [roadsterData, setRoadsterData] = useState('')
  const [value, setValue] = useState(0)

  useEffect(() => {
    const fetchRoadsterData = async () => {
      const url = 'https://api.spacexdata.com/v4/roadster'
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
    setRoadsterData(data)
    }
    fetchRoadsterData()
  }, [])

  return (
    <>
      {!roadsterData ? (
        <Loader />
      ) : (
        <section className='py-32 max-width'>
          <h1 className='heading text-center mb-10'>Elon Musk's Tesla Roadster</h1>

          <div>
            <article>
              <div className="flex flex-col">
                <img src={roadsterData.flickr_images[value]} alt={roadsterData.name} />

                <ul className="flex items-center justify-start gap-3 flex-wrap my-5">
                  {roadsterData.flickr_images.map((image, index) => (
                    <li key={index} onClick={() => setValue(index)} className={`cursor-pointer bg-white ${value === index && 'p-1'}`}>
                      <img src={image} className='w-20' alt={roadsterData.name} />
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className='text-white opacity-75'>{roadsterData.details}</p>

                <ul className="text-white opacity-75 text-sm mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 md:mt-10">
                  <li>
                    Launch Date:{' '} {format(new Date(roadsterData.launch_date_utc), "dd MMMM yyyy")}
                  </li>
                  <li>Launch Mass: {roadsterData.launch_mass_kg} kg</li>
                  <li>Days Since Launch: {Math.floor(roadsterData.period_days)} days</li>
                  <li>Speed: {Math.floor(roadsterData.speed_kph)} kph</li>
                  <li>Distance From Earth:{' '} {roadsterData.earth_distance_km.toLocaleString()} km</li>
                  <li>
                    <a
                    href={roadsterData.wikipedia} target='_blank' rel='noreferrer' className='underline'
                    >
                      Wikipedia
                    </a>
                  </li>
                  <li>
                    <a
                    href={roadsterData.video} target='_blank' rel='noreferrer' className='underline'
                    >
                      Youtube Video
                    </a>
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </section>
      )}
    </>
  )
}

export default Roadster