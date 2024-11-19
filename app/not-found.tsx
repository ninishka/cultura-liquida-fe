import React, { FC } from 'react'
import Link from 'next/link'
import { headers } from 'next/headers'

const NotFound: FC = async () => {
  const headersList = await headers()
  const domain = headersList.get('host')

  return (
    <div>
      <h2>Not Found: {domain}</h2>
      <p>Could not find requested resource</p>
      <p>
        View <Link href="/">all posts</Link>
      </p>
    </div>
  )
}

export default NotFound