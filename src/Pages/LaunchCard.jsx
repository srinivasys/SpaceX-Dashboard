import React, {useState, useEffect} from 'react'
import { useParams, Link } from 'react-router-dom'

import Loader from '../components/Loader'
import {format} from 'date-fns'

const LaunchCard = () => {
    const [singleLaunch, setSingleLaunch] = useState('')
    const {id} = useParams()

    useEffect(() => {
    const fetchSingleLaunchData = async () => {
      const url = `https://api.spacexdata.com/v5/launches/${id}`
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setSingleLaunch(data)
    }
    fetchSingleLaunchData()
  }, [id])

  return (
    <>
      {!singleLaunch ? (
        <Loader />
      ) : (
        <section className="py-32 max-width grid grid-cols-1 gap-10 md:grid-cols-2"> 
          <article>
            {singleLaunch.links.patch.large ? (
              <img src={singleLaunch.links.patch.large} alt={singleLaunch.name} />
            ) : (
              <img src='https://images2.imgbox.com/40/e3/GypSkayF_o.png' alt='' />
            )}
          </article>

          <article>
            <h1 className="heading">{singleLaunch.name}</h1>
            <h2 className="text-white font-bold text-xl opacity-75 mt-2">
              Launch Date:{" "}
              {format(new Date(singleLaunch.date_local), "dd MMMM yyyy")},{" "}
              {singleLaunch.success ? (
                <span className="text-emerald-500">Successful</span>
              ) : (
                <span className="text-rose-500">Failed</span>
              )}
            </h2>
            <p className='text-white font-bold text-xl opacity-75'>Flight Number: {singleLaunch.flight_number}</p>

            <p className="text-white opacity-75 my-10">
              {singleLaunch.details}
            </p>

            <p className='text-white font-bold text-xl opacity-75'>Payload: {singleLaunch.payloads}</p>

            <ul className="text-white text-sm opacity-75 mb-8">
              <li className="mb-3">
                Fairings:{" "}
                {singleLaunch.fairings
                  ? `${singleLaunch.fairings.reused ? "Reused" : "Not Reused"}`
                  : "No Fairings Used"}
              </li>
              <li>
                Recovered:{" "}
                {singleLaunch.fairings
                  ? `${
                      singleLaunch.fairings.recovered
                        ? "Fairings Recovered"
                        : "Fairings Not Recovered"
                    }`
                  : "No Fairings Used"}
              </li>
            </ul>

            <ul className="flex flex-wrap items-center justify-start gap-8">
              <li>
                <a
                  href={singleLaunch.links.article}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Read Article
                </a>
              </li>
              <li>
                <a
                  href={singleLaunch.links.presskit}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Presskit
                </a>
              </li>
              <li>
                <a
                  href={singleLaunch.links.webcast}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                >
                  Watch Launch on YouTube
                </a>
              </li>
              <li>
                <Link
                  to="/launches"
                  className="text-white opacity-75 text-sm hover:opacity-100"
                >
                  &larr; Back
                </Link>
              </li>
            </ul>
          </article>
        </section>
      )}
    </>
  )
}

export default LaunchCard