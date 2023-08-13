"use client";
import React, { useState , useEffect } from 'react'
import {isOnline, logOut} from '../Functions/Functions'
import Link from 'next/link'


export default function Nav() {
const [me, setme] = useState('')
useEffect(() => {
if(!me){
  isOnline()
.then(data=>{
  setme(data)
  console.log(data)
})
}
})


if(me){
  
  return (
    <div>
      <div className="navBar">
        <div>GSS TUC Voting</div>
        <div>
        <div className="row-flex gap">
        <div className="width-40 height-40 circle border text-small lighter central ">
           {me.full_name.slice(0 ,1)} {me.full_name.slice(me.full_name.indexOf(" ") , me.full_name.indexOf(" ") + 2)}
          </div>
          <div>
            <div>{me.full_name }</div>
            {/* <div className='text-small'>IT</div> */}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}else{

}
}
