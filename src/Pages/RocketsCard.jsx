import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'

import Loader from '../components/Loader'

const RocketsCard = () => {
  const [singleRocketCard, setSingleRocketCard] = useState('')
  const [imperial, setImperial] = useState(false)
  const [value, setValue] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleRocketData = async () => {
      const url = `https://api.spacexdata.com/v4/rockets/${id}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setSingleRocketCard(data)
    }

    fetchSingleRocketData()
  }, [id])

  return (
    <>
      {!singleRocketCard ? (
        <Loader />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2">
          <article>
            <h1 className='heading'>{singleRocketCard.name}</h1>
            <h2 className='capitalize text-3xl opacity-75 mt-2 text-white font-bold'>
              Type: {singleRocketCard.type}
            </h2>
            <h2 className='text-3xl opacity-75 mt-2 text-white font-bold mb-8'>
              First Flight Date: {singleRocketCard.first_flight}
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 text-white opacity-75">
              <ul>
                <li>Cost per launch:{' '}
                  {singleRocketCard.cost_per_launch.toLocaleString()} USD
                </li>
                <li>Company: {singleRocketCard.company}</li>
                <li>Success Rate: {singleRocketCard.success_rate_pct}%</li>
                {singleRocketCard === 'active' ? (
                  <li className="text-emerald-500">Active</li>
                ) : (
                  <li className="text-rose-500">In Active</li>
                )}
              </ul>

              <ul>
                <li>Country: {singleRocketCard.country}</li>
                <li>Stages: {singleRocketCard.stages}</li>
                {!imperial && (
                  <>
                    <li>Height: {singleRocketCard.height.meters}m</li>
                    <li>Diameter: {singleRocketCard.diameter.meters}m</li>
                    <li>Mass: {singleRocketCard.mass.kg.toLocaleString()}kg</li>
                  </>
                )}

                {imperial && (
                  <>
                    <li>Height: {singleRocketCard.height.feet}ft</li>
                    <li>Diameter: {singleRocketCard.diameter.feet}ft</li>
                    <li>Mass: {singleRocketCard.mass.lb.toLocaleString()}lb</li>
                  </>
                )}
              </ul>
            </div>

            <p className="opacity-75 text-white mt-5">{singleRocketCard.description}</p>

            <ul className="flex items-center justify-start gap-3 mt-5">
              <li>
                <a
                  href={singleRocketCard.wikipedia} className='btn' rel='noreferrer' target='_blank'
                >
                  Wikipedia
                </a>
              </li>
              <li>
                <button className='btn' onClick={() => setImperial(!imperial)}>
                  {imperial ? "Toggle Metric Units" : 'Toggle Imperial Units'}
                </button>
              </li>
              <li>
                <Link to='/rockets' className='text-white opacity-75 text-sm hover:opacity-100'>
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>

          <article>
            <img src={singleRocketCard.flickr_images[value]} alt={singleRocketCard.name} className="h-full object-cover" />
            <ul className="flex flex-wrap items-center justify-start gap-3 mt-5">
              {singleRocketCard.flickr_images.map((image, index) => (
                <li key={index} className={`cursor-pointer bg-white ${index === value && "p-1"}`} onClick={() => setValue(index)}>
                  <img src={image} alt={singleRocketCard.name} className="w-20" />
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </>
  )
}

export default RocketsCard