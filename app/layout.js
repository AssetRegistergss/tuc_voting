"use client";
import './globals.css'
import { Montserrat_Alternates } from 'next/font/google'
import 'funuicss/css/fun.css'
import Head from 'next/head'
Metadata
import { useEffect } from 'react';
const mont_serrat = Montserrat_Alternates({
   subsets: ["latin"] ,
  weight: ['400', '700' , '100', '200' , '500' , '900' , '800'],
style: ['normal', 'italic'], })

 const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}


export default function RootLayout({ children }) {
  useEffect(() => {
    var root = document.querySelector(':root');
    root.style.setProperty('--primaryColor', "#4338ca"); 
    root.style.setProperty('--secondaryColor', "#be185d"); 
    
  }, [])
  
  return (
    <html lang="en">
      <body className={mont_serrat.className}>{children}</body>
    </html>
  )
}



