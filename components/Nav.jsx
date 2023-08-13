// use client
import React from 'react'
import {isOnline, logOut} from '../Functions/Functions'
import Link from 'next/link'


export default function Nav() {

// useEffect(() => {
// isOnline()
// .then(data=>{
//   setme(data)
// })
// }, [])

// useEffect(() => {
//   const drop = document.querySelector(".myBtn")
//   window.addEventListener("click" ,(e)=>{
//     if(e.target != drop){
//       setdrop1(false)
//     }else{
//         setdrop1(!drop1)
//     }
//   })
// },[])

// useEffect(() => {
//   window.addEventListener('resize' , ()=>{
//     if(screen.width > 800){
//       setsidebar("")
//     }
//   })
// }, [])



  return (
    <div>
      <div className="navBar">
        <div>GSS TUC Voting</div>
        <div>
        <div className="row-flex gap">
        <div className="width-40 height-40 circle lighter central ">
            IA
          </div>
          <div>
            <div>Iddris Abdul Wahab</div>
            {/* <div className='text-small'>IT</div> */}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}
