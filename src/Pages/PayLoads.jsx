import React, {useState, useEffect} from 'react'

import Loader from '../components/Loader'

const PayLoads = () => {
  const [PayLoadsData, setPayLoadsData] = useState('')

  useEffect(() => {
    const fetchPayLoadsData = async () => {
      const url = 'https://api.spacexdata.com/v4/payloads'
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setPayLoadsData(data)
    }
    fetchPayLoadsData()
  }, [])

  return (
    <>
      {!PayLoadsData ? (
        <Loader />
      ) : (
        <article className='py-32 max-width'>
          <h1 className='heading text-center mb-10'>PayLoads</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {PayLoadsData.map(({id, name, type, orbit, manufacturers, customers, reference_system, nationalities}) => (
              <article className="bg-stone-900 p-5 text-white" key={id}>
                <h2 className='font-bold mb-3'>{name}, <span className="opacity-75">{type}</span></h2>

                <ul className='opacity-75 mb-3'>
                  <li className='text-sm'>Orbit: {orbit}</li>
                  <li className='text-sm'>Reference System: {reference_system}</li>
                </ul>

                <ul className='mb-3'>
                  <h3 className='font-bold mb-1'>Manufacturers</h3>
                  {manufacturers.map((item, index) => (
                    <li key={index} className='opacity-75 text-sm'>{item}</li>
                  ))}
                </ul>

                <ul className='mb-3'>
                  <h3 className='font-bold mb-1'>Customers</h3>
                  {customers.map((item, index) => (
                    <li key={index} className='opacity-75 text-sm'>{item}</li>
                  ))}
                </ul>

                <ul>
                  <h3 className='font-bold mb-1'>Countries</h3>
                  {nationalities.map((item, index) => (
                    <li key={index} className='opacity-75 text-sm'>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </article>
      )}
    </>
  )
}

export default PayLoads