import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
      <section className="flex flex-col items-center justify-center text-center h-screen">
        <h1 className='heading mb-10'>Error | The request resource could not be found.</h1>
        <Link to='/' className='btn'>&larr; Back to Homepage</Link>
      </section>
    </>
  )
}

export default PageNotFound