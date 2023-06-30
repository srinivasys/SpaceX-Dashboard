import React, {useState, useEffect} from 'react'

import Loader from '../components/Loader'

const Home = () => {
  const [companyDetails, setCompanyDetails] = useState('')

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const url = 'https://api.spacexdata.com/v4/company'
      const response = await fetch(url)
      const data = await response.json()
      // console.log(data)
      setCompanyDetails(data)
    }
    fetchCompanyDetails()
  }, [])

  return (
    <>
      {!companyDetails ? (
        <Loader />
      ) : (
        <section className='showcase'>
          <div className='overlay'>
            <article className='text-white'>
              <h1 className='heading text-center capitalize'>
                All the SpaceX Data in one place
              </h1>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3 max-w-4xl mx-auto mt-10 lg:gap-20 px-5">
                <article>
                  <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                    About
                  </h2>
                  <ul className="text-sm opacity-75">
                    <li className="mb-1">{companyDetails.name} was founded by</li>
                    <li className="mb-1">{companyDetails.founder} in the year</li>
                    <li className="mb-1">{companyDetails.founded}.</li>
                    <li className="mb-1">
                      It has {companyDetails.employees} employes,
                    </li>
                    <li className="mb-1">{companyDetails.vehicles} vehicles,</li>
                    <li className="mb-1">
                      {companyDetails.launch_sites} launch sites,
                    </li>
                    <li className="mb-1">
                      and {companyDetails.test_sites} test sites and
                    </li>
                    <li className="mb-1">
                      is valued at {companyDetails.valuation.toLocaleString()} B
                    </li>
                  </ul>
                </article>

                <article>
                  <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                    Headquarters
                  </h2>
                  <ul className="text-sm opacity-75">
                    <li className="mb-1">{companyDetails.headquarters.address}</li>
                    <li className="mb-1">{companyDetails.headquarters.city}</li>
                    <li className="mb-1">{companyDetails.headquarters.state}</li>
                  </ul>
                </article>

                <article>
                  <h2 className="font-bold border-b-2 border-white text-xl mb-3 pb-2 uppercase tracking-wider">
                    Social Media Links
                  </h2>
                  <ul className="text-sm opacity-75">
                    <li className="mb-1">
                      <a href={companyDetails.links.website}>Website</a>
                    </li>
                    <li className="mb-1">
                      <a href={companyDetails.links.flickr}>Flickr</a>
                    </li>
                    <li className="mb-1">
                      <a href={companyDetails.links.twitter}>Twitter</a>
                    </li>
                    <li className="mb-1">
                      <a href={companyDetails.links.elon_twitter}>Elon Twitter</a>
                    </li>
                  </ul>
                </article>
              </div>

              <p className="max-w-3xl mx-auto text-center mt-10">
                {companyDetails.summary}
              </p>
            </article>
          </div>
        </section>
      )}
    </>
  )
}

export default Home