import Link from 'next/link'
import React from 'react'

function Default() {
  return (
    <div>
      <h1 className="text-center"><b>This is a default page</b></h1>
      <div className="text-center">
        <Link href="/">Go Back</Link>
      </div>
    </div>
  )
}

export default Default
