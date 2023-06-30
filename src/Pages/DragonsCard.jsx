import React, {useState, useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'

import Loader from '../components/Loader'

const DragonsCard = () => {
  const [singleDragonData, setSingleDragonData] = useState('')
  const [toggle, setToggle] = useState(false)
  const [value, setValue] = useState(0)
  const { id } = useParams()

  useEffect(() => {
    const fetchSingleDragonData = async () => {
      const url = `https://api.spacexdata.com/v4/dragons/${id}`
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setSingleDragonData(data)
    }

    fetchSingleDragonData()
  }, [id])

  return (
    <>
      {!singleDragonData ? (
        <Loader />
      ) : (
        <section className="py-32 max-width flex flex-col-reverse md:grid md:grid-cols-2 md:gap-10">
          <article className='mt-8 md:mt-0'>
            <h1 className='heading mb-8'>{singleDragonData.name}</h1>
            <h2 className='font-bold opacity-80 text-lg lg:text-2xl mb-10 text-white'>
              First Flight Date: {singleDragonData.first_flight}
            </h2>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <ul className="text-sm text-white opacity-75 capitalize flex flex-col items-start justify-start gap-3">
                <li>Type: {singleDragonData.type}</li>
                <li>Crew: {singleDragonData.crew_capacity}</li>
                {!toggle && <li>Dry Mass: {singleDragonData.dry_mass_kg}kg</li>}
                {toggle && <li>Dry Mass: {singleDragonData.dry_mass_lb}lb</li>}
                {singleDragonData === 'active' ? (
                  <li className="text-emerald-500">Active</li>
                ) : (
                  <li className="text-rose-500">In Active</li>
                )}
                <li>
                  <a href={singleDragonData.wikipedia} target='_blank' className='btn' rel='noreferrer'
                  >
                    Wikipedia
                  </a>
                </li>
              </ul>

              <ul className="bg-neutral-900 text-white text-sm opacity-75 p-3 rounded">
                <h3 className="font-bold opacity-100 text-lg uppercase mb-3">Heat Shield Details</h3>
                <li className='mb-3'>Material: {singleDragonData.heat_shield.material}</li>
                <li className='mb-3'>Size: {singleDragonData.heat_shield.size_meters}m</li>
                <li className='mb-3'>Temperature: {singleDragonData.heat_shield.temp_degrees} degrees</li>
                <li className='mb-3'>Dev Partner: {singleDragonData.heat_shield.dev_partner}</li>
              </ul>
            </div>

            <p className="opacity-75 text-white mt-5 mb-8">{singleDragonData.description}</p>

            <div className="text-white opacity-75 text-sm">
              {!toggle && (
                <ul className="grid grid-cols-2 gap-3">
                  <li>Launch Payload Mass: {singleDragonData.launch_payload_mass.kg}kg</li>
                  <li>Return Payload Mass: {singleDragonData.return_payload_mass.kg}kg</li>
                  <li>Pressurized Capsule Payload Volume:{" "}
                    {singleDragonData.pressurized_capsule.payload_volume.cubic_meters}m<sup>3</sup>
                  </li>
                  <li>Height With Trunk: {singleDragonData.height_w_trunk.meters}m</li>
                  <li>Return Payload Volume:{" "}
                  {singleDragonData.return_payload_vol.cubic_meters}m<sup>3</sup>
                  </li>
                  <li>
                  Trunk Volume: {singleDragonData.trunk.trunk_volume.cubic_meters}m<sup>3</sup>
                  </li>
                  <li>Diameter: {singleDragonData.diameter.meters}m</li>
                </ul>
              )}

              {toggle && (
                <ul className="grid grid-cols-2 gap-3">
                  <li>Launch Payload Mass: {singleDragonData.launch_payload_mass.kg}lb</li>
                  <li>Return Payload Mass: {singleDragonData.return_payload_mass.kg}lb</li>
                  <li>Pressurized Capsule Payload Volume:{" "}
                    {singleDragonData.pressurized_capsule.payload_volume.cubic_meters}ft<sup>3</sup>
                  </li>
                  <li>Height With Trunk: {singleDragonData.height_w_trunk.meters}ft</li>
                  <li>Return Payload Volume:{" "}
                  {singleDragonData.return_payload_vol.cubic_meters}ft<sup>3</sup>
                  </li>
                  <li>
                  Trunk Volume: {singleDragonData.trunk.trunk_volume.cubic_meters}ft<sup>3</sup>
                  </li>
                  <li>Diameter: {singleDragonData.diameter.meters}ft</li>
                </ul>
              )}

              <ul className="mt-8 flex items-center justify-start gap-4">
                <li>
                  <button className='btn' onClick={() => setToggle(!toggle)}>
                    {toggle ? "Show Metric Units" : "Show Imperial Units"}
                  </button>
                </li>
                <li>
                  <Link to='/dragons' className="text-white opacity-75 text-sm hover:opacity-100">
                    &larr; Back
                  </Link>
                </li>
              </ul>
            </div>
          </article>

          <article>
            <img src={singleDragonData.flickr_images[value]} alt={singleDragonData.name} className="h-96 object-cover" />
            <ul className="flex flex-wrap items-center justify-start gap-3 mt-5">
              {singleDragonData.flickr_images.map((image, index) => (
                <li key={index} className={`${index === value && "p-1 bg-white"}`} onClick={() => setValue(index)}>
                  <img src={image} alt={singleDragonData.name} className="w-28 h-20 object-cover cursor-pointer" />
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </>
  )
}

export default DragonsCard