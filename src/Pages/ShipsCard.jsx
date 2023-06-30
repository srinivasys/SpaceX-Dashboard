import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'

import Loader from '../components/Loader'

const ShipsCard = () => {
  const [singleShipCard, setSingleShipCard] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleShipData = async () => {
      const url = `https://api.spacexdata.com/v4/ships/${id}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      setSingleShipCard(data)
    }

    fetchSingleShipData()
  }, [id])

  return (
    <>
      {!singleShipCard ? (
        <Loader />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-8 md:grid-cols-2">
          <article>
            <h1 className='heading'>{singleShipCard.name}</h1>
            {singleShipCard.year_built ? (
              <h2 className="text-3xl text-white font-bold opacity-75 my-5">
                Built in {singleShipCard.year_built}
              </h2>
            ) : (' ')}

            <ul className="text-white opacity-75 text-sm flex flex-col items-start justify-start gap-3 mt-8">
              {singleShipCard.mass_kg ? (
                <li>{singleShipCard.mass_kg}</li>
              ) : (
                <li>Mass in kg is not indicated</li>
              )}
              {singleShipCard.mass_lbs ? (
                <li>{singleShipCard.mass_lbs}</li>
              ) : (
                <li>Mass in lbs is not indicated</li>
              )}
              <li>{singleShipCard.launches.length} launches</li>
              <li>Type: {singleShipCard.type}</li>
              {singleShipCard.status === 'active' ? (
                <li className="text-emerald-500">Active</li>
              ) : (
                <li className="text-rose-500">InActive</li>
              )}
              <li>Home Port: {singleShipCard.home_port}</li>
            </ul>

            <ul className="mt-8 flex items-center justify-start gap-3">
              <li>
                <a
                  href={singleShipCard.link} className='btn' rel='noreferrer' target='_blank'
                >
                  Read More &rarr;
                </a>
              </li>
              <li>
                <Link to='/ships' className='text-sm opacity-75 text-white hover:opacity-100'>
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>

          <article>
            {singleShipCard.image ? (
              <img src={singleShipCard.image} alt={singleShipCard.name} className="h-full object-cover" />
            ) : (
              <img src='https://i.imgur.com/woCxpkj.jpg' alt={singleShipCard.name} className='h-full object-cover' />
            )}
          </article>
        </section>
      )}
    </>
  )
}

export default ShipsCard