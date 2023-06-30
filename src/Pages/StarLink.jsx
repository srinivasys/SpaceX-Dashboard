import React, {useState, useEffect} from 'react'

import Loader from '../components/Loader'

const StarLink = () => {
  const [starLinkData, setStarLinkData] = useState('')

  useEffect(() => {
    const fetchStarLinkData = async () => {
      const url = 'https://api.spacexdata.com/v4/starlink'
      const response = await fetch(url)
      const data = await response.json()
    //   console.log(data)
      setStarLinkData(data)
    }
    fetchStarLinkData()
  }, [])

  return (
    <>
      {!starLinkData ? (
        <Loader />
      ) : (
        <section className='py-32 max-width'>
          <h1 className='heading text-center mb-10'>StarLink</h1>

          <div className="max-width grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 px-5">
            {starLinkData.map(({id, version, spaceTrack}) => (
              <article key={id} className="bg-zinc-900 p-5 text-white">
                <h2 className='font-bold text-lg'>{spaceTrack.OBJECT_NAME},{" "}
                <span className="opacity-75 text-base">{version}</span>
                </h2>
                <p className='opacity-75 mt-5'>Launch Date: {spaceTrack.LAUNCH_DATE}</p>
                <p className='opacity-75'>Launch Site: {spaceTrack.LAUNCH_SITE}</p>
                <p className='opacity-75 mt-5'>{spaceTrack.COMMENT}</p>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default StarLink