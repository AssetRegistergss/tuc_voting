"use client";
import Nav from '@/components/Nav'
import Vote_card from '@/components/Vote_card'
import React, { useEffect, useState } from 'react'
import ProgressBar from 'funuicss/component/ProgressBar'
import Button from 'funuicss/component/Button';
import { AddData, EndPoint, GetToken, isOnline, logOut } from '@/Functions/Functions';
import Loader from '@/components/Loader';
import Admin from '../pages/admin';
// import { TiFlashOutline } from "react-icons/ti";
import Axios from 'axios';
import InfoModal from '@/components/Modals/InfoModal';
export default function Voting() {
    const [error, seterror] = useState("")
    const [candidate_state, setcandidate_state] = useState('Chairperson')
    const [candidates_voted_for, setcandidates_voted_for] = useState([])
    const [total_candidates, settotal_candidates] = useState(8)
    const [percentage_voted, setpercentage_voted] = useState(0)
    const [positions, setpositions] = useState(
       [ 'Chairperson',
       'Vice Chairperson',
       'Vice Chairwoman',
       'Secretary',
       'Assistant Secretary',
       'First Trustee',
       'Second Trustee',
       'Youth Representatives']
    )
    const [votedState, setvotedState] = useState(0)
    const [done_with_everything, setdone_with_everything] = useState(false)
    const [loading, setloading] = useState(false)
    const [me, setme] = useState("")

    useEffect(() => {
      if(!me){
        isOnline()
        .then(doc=>setme(doc))
  
      }
    })

    

    const candidates = [
        {
            "name": 'Ernest Enyan',
            'img': '/candidates/john.jpg' ,
            "position": 'Chairperson',
        }
        ,
        {
            "name": 'Dr. Emmanuel Dwamena Sasu',
            'img': '/candidates/jane.jpg',
            "position": 'Vice Chairperson',
        },
        {
            "name": 'Felix Kofi Debrah',
            'img': '/candidates/olivia.jpg' ,
            "position": 'Vice Chairperson',
        },
        {
            "name": 'Marian Grace Tagoe',
            'img': '/candidates/sophia.jpg' ,
            "position": 'Vice Chairwoman',
        },
        {
            "name": 'Paul Seneadza',
            'img': 'https://picsum.photos/200' ,
            "position": 'Secretary',
        }
      ,
      {
        "name": 'Albert Frimpong-Ampofo',
        'img': 'https://picsum.photos/200' ,
        "position": 'Secretary',
    }
    ,
    {
        "name": 'Samuel R. Quarcoo',
        'img': 'https://picsum.photos/200' ,
        "position": 'Assistant Secretary',

    },
    {
        "name": 'Abraham Bosu',
        'img': 'https://picsum.photos/200' ,
        "position": 'First Trustee',
    },
    {
        "name": 'Francis Siripi',
        'img': 'https://picsum.photos/200' ,
        "position": 'First Trustee',
    },
    {
        "name": 'Charles K. Agbenu',
        'img': 'https://picsum.photos/200',
        "position": 'Second Trustee',
    }
    ,

    {
        "name": 'Abdallah Mohammed',
        'img': 'https://picsum.photos/200' ,
        "position": 'Second Trustee',

    }
    ,
    {
        "name": 'Ahmed Salim Adam',
        'img': '/candidates/ava.jpg' ,
        "position": 'Youth Representatives',
    }
    ,
    {
        "name": 'Alberta Eshun',
        'img': '/candidates/ava.jpg' ,
        "position": 'Youth Representatives',
    }
    ]

    const HandleVote = (doc)=>{
        const token = GetToken()
        console.log(token)
        new Promise((resolve, reject) => {
            candidates_voted_for.push(doc)
            setvotedState(votedState + 1)
            const get_total = (100 * candidates_voted_for.length) / total_candidates
            setpercentage_voted(get_total)
            resolve()
        }).then(()=>{
            var locale = "en-us";
            var today = new Date();
            var day = today.getDate();
            var fullDay = ("0" + day).slice(-2);
            var longMonth = today.toLocaleString(locale, { month: "long" });
            var year = today.getFullYear();
            const fullDate = longMonth + " " + fullDay + ", " + year

            if(candidates_voted_for.length == total_candidates){ 
                setloading(true)
                // done voting 
                const data = {
                    chairman:candidates_voted_for[0],
                    vice_chairman:candidates_voted_for[1],
                    vice_chairwoman:candidates_voted_for[2],
                    secretary:candidates_voted_for[3],
                    asst_secretary:candidates_voted_for[4],
                    first_trustee:candidates_voted_for[5],
                    second_trustee:candidates_voted_for[6],
                    youth_rep:candidates_voted_for[7],
                    // date:fullDate
                }
                Axios.post(EndPoint + '/api/tuc' , data , {
                    headers:{
                        authorization:`Bearer ${token}`
                    }
                })
                .then(res => {
                    setdone_with_everything(true)
                    setloading(false)
                } ).catch(err=>{
                    console.log(err)
                    seterror({
                        header:"Invalid Request" ,
                        message: err.response.data.message
                      })
                      setTimeout(() => {
                        seterror(false)
                        window.location.reload()
                      }, 4000);
                    setloading(false)
                })

            }else{
            
            }
        })

       
    }
  if(me){
    return (
        <div>
            {
             loading &&  <Loader />
            }
          <Nav  />
          {
      error &&   <InfoModal header={error.header} message={error.message} />
    }
          
          <div className="padding-top-100">
           {
            me.role == "super admin" ?
            <Admin />
            :
            <div className="container">
            <div className="h2">Ghana Statistical Service TUC Voting</div>
            <div>Select the candidates you wish to vote for.</div>

            <div className="section">
                <div className="vote_progress_container">
                    <div className="vote_progress gradient" style={{width:`${percentage_voted}%` , padding:`${parseInt(percentage_voted) > 0 ? '0 2rem' : ''}`}}>
                    {
                        parseInt(percentage_voted) > 0 && <> <span>{`${Math.floor(percentage_voted)}`}</span>%  </>
                    }
                    </div>
                </div>
            </div>

            {
                parseInt(percentage_voted) < 100 ?
                <div className="margin-top-50">
        
                <div>
                     <div className=" padding margin-bottom-20">
                    <div className="h2">{positions[votedState]}</div>
                    <div>You can only choose one candidate here</div>
                </div>
                <div className="row">
                    { 
                        candidates?.filter((doc)=> {
                            if(doc.position == `${positions[votedState]}`){
                                return doc
                            }
                        } ).map((item, index) => (
                    <div className="col sm-12 md-6 lg-4 padding" key={item.name} onClick={()=>{
                        if( candidates?.filter((doc)=> {
                            if(doc.position == `${positions[votedState]}`){
                                return doc
                            }
                        } ).length > 1){
                            HandleVote(item.name)
                        }
                    }}>
                   <Vote_card data={item}/>
                    </div>
                        ))
                    }
                </div>
                </div>
                <div className='text-center margin-bottom-30'>
                { 
                        candidates?.filter((doc)=> {
                            if(doc.position == `${positions[votedState]}`){
                                return doc
                            }
                        } ).length == 1 &&
                        <div>
                            <button className='button padding-20 success circle' onClick={
                                ()=>HandleVote(candidates?.filter((doc)=> {
                                            if(doc.position == `${positions[votedState]}`){
                                                return doc
                                            }
                                        } )[0].name)}>
                               Yes
                            </button>
                            &nbsp;
                            &nbsp;
                            &nbsp;
                            <button className='button padding-20 danger circle' onClick={()=>HandleVote("no vote")}>
                               No
                            </button>
                        </div>

                    }
                </div>
           
            </div>
            : done_with_everything && <div className='thank_you_card'>
                <div className="row central">
                    <div className="col sm-12 md-4 lg-4 paddding">
                        <img src="/thank_you.svg" className='fit' alt="" />
                    </div>
                    <div className="col sm-12 md-8 lg-8 paddding">
                       <div className="h4"> Thank you for casting your vote!</div>
                       <div className="section">
                       Please wait for the voting to conclude in order to see the results.
                       </div>
                       <div className="section">
                        <Button 
                        text="Click to LogOut"
                        bg="primary"
                        rounded
                        funcss='padding-20'
                        startIcon={<i className='fas fa-bars' />}
                        fullWidth
                        onClick={() => (logOut()) }
                        />
                       </div>
                    </div>
                </div>
            </div>
            }

        </div>
           }
          </div>
        </div>
      )
  }else{
    return <Loader />
  }
}
