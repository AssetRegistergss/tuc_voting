'use client';
import React from 'react'

export default function Vote_card(props) {
    const {data} = props
  return (
    <div>
    <div className="vote_card">
    <div className="card_image">
        <img src={data.img} className='card_image_inside' alt="" />
    </div>
    <div className="card_content">
    <div className="card_header">{data.position}</div>
    <div className="card_sub_header">{data.name}</div>
    </div>
    </div>
    </div>
  )
}
