import Link from 'next/link'
import React from 'react'

export default function Voted() {
  return (
    <div className="fit central" style={{minHeight:'100vh'}}>
      <div className="width-800-max center text-center">
        <div className="text-jumbo text-gradient">Already Voted</div>
        <p />
        <div>You have already voted</div>
        <p />
        <Link href={'/'}>
            <button className="primary button roundBtn">Back to Login</button>
        </Link>
      </div>
    </div>
  )
}
