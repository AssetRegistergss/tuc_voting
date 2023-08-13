"use client";
import Image from 'next/image'
import styles from './page.module.css'
import  Typography  from 'funuicss/component/Typography'
import IconicInput from 'funuicss/component/IconicInput'
import Icon from 'funuicss/component/Icon'
import Button from "funuicss/component/Button"
import {FunGet} from 'funuicss/js/Fun'
import { useState } from 'react'
import InfoModal from '@/components/Modals/InfoModal'
import { AddData, GetUser } from '@/Functions/Functions';
import Loader from '@/components/Loader';
export default function Home() {
  const [error, seterror] = useState("")
  const [loader, setloader] = useState(false)
  const HandleLogin = ()=>{
    let email, password , data 
    email = FunGet.val('#email')
    password = FunGet.val('#password')
    if(email && password){
      setloader(true)
      AddData('/tuc/login' , {email:email , password:password})
      .then(doc=>{
        if(doc){
          // navigate("/admin/index")
          if(doc.error){
            seterror({
              header:"Error" ,
              body:`${doc?.error}`
            })
            setTimeout(() => {
              seterror(false)
            }, 3000);
          }else{
            GetUser(doc.user)
            .then(getDoc=>{
              console.log(getDoc)
            if(getDoc.email){
              new Promise((resolve, reject) => {
                sessionStorage.setItem(
                  'user' , 
                  JSON.stringify(getDoc)
                )
                resolve()
               })
               .then(()=>window.location.assign('/voting'))
            }
            })
         
          }
      
        }
        setloader(false)
      })
      .catch(err=>{
        seterror({
          message:err.message,
          header:'Error',
        })
        setTimeout(() => {
          seterror(false)
        }, 3000);
        setloader(false)
      })
    }else{
      seterror({
        header:"Invalid Fields" ,
        message: `Please fill all the fields`
      })
      setTimeout(() => {
        seterror(false)
      }, 3000);
    }
  }
  return (
    <main className='login_bg'>

      {
        loader &&
        <Loader />
      }
    {
      error &&   <InfoModal header={error.header} message={error.message} />
    }
   
    <div className="form">
      <Typography
      text='Welcome Back!'
      heading='h2'
      lighter
      />
      <div>Enter your email and password to login</div>
      <div className="margin-top-30">
      <input id='email' className='input full-width lighter standard' type="Email" placeholder='Email'/>
      <p>
        <input id='password' className='input full-width lighter standard' type="password" placeholder='Password' />
      </p>
     <div className="margin-top-40">
      <Button
      text="Login Accoun"
      bg='gradient'
      fullWidth
      onClick={()=>HandleLogin()}
      />
     </div>
      </div>
    </div>
    </main>
  )
}
