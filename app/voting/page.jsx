"use client";
import Nav from '@/components/Nav'
import Vote_card from '@/components/Vote_card'
import React, { useEffect, useState } from 'react'
import ProgressBar from 'funuicss/component/ProgressBar'
import Button from 'funuicss/component/Button';
import { AddData } from '@/Functions/Functions';
import Loader from '@/components/Loader';
// import { TiFlashOutline } from "react-icons/ti";
export default function Voting() {
    const [candidate_state, setcandidate_state] = useState('Chairman')
    const [candidates_voted_for, setcandidates_voted_for] = useState([])
    const [total_candidates, settotal_candidates] = useState(8)
    const [percentage_voted, setpercentage_voted] = useState(0)
    const [positions, setpositions] = useState(
       [ 'Chairman',
       'Vice Chairman',
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

    useEffect(() => {

    }, [candidates_voted_for])
    

    const candidates = [
        {
            "name": 'Iddris Abdul Wahab',
            'img': '/candidates/john.jpg' ,
            "position": 'Chairman',
        },
        {
            "name": 'Michael Smith',
            'img': '/candidates/michael.jpg' ,
            "position": 'Chairman',
        },
        {
            "name": 'Sarah Johnson',
            'img': '/candidates/sarah.jpg' ,
            "position": 'Chairman',
        }
        
        ,
        {
            "name": 'Jeniffer Jane',
            'img': '/candidates/jane.jpg',
            "position": 'Vice Chairman',
        },
        {
            "name": 'Olivia Williams',
            'img': '/candidates/olivia.jpg' ,
            "position": 'Vice Chairman',
        },
        {
            "name": 'Sophia Lee',
            'img': '/candidates/sophia.jpg' ,
            "position": 'Vice Chairman',
        },
        {
            "name": 'Emily Davis',
            'img': '/candidates/emily.jpg' ,
            "position": 'Vice Chairwoman',
        },
        {
            "name": 'Thomas Brown',
            'img': '/candidates/thomas.jpg' ,
            "position": 'Secretary',
        }
      ,
      {
        "name": 'Daniel Martinez',
        'img': '/candidates/daniel.jpg' ,
        "position": 'Secretary',
    },
    {
        "name": 'Liam Thompson',
        'img': '/candidates/liam.jpg' ,
        "position": 'Secretary',
    },
    {
        "name": 'Aria Clark',
        'img': '/candidates/aria.jpg' ,
        "position": 'Assistant Secretary',
    }

    ,
    {
        "name": 'Oliver Smith',
        'img': '/candidates/oliver.jpg' ,
        "position": 'Assistant Secretary',

    },
    {
        "name": 'Sophie Johnson',
        'img': '/candidates/sophie.jpg' ,
        "position": 'First Trustee',
    },
    {
        "name": 'Lucas Williams',
        'img': '/candidates/lucas.jpg',
        "position": 'Second Trustee',
    }
    ,
    {
        "name": 'Emily Davis',
        'img': '/candidates/emily.jpg' ,
        "position": 'First Trustee',
    },
    {
        "name": 'Ethan Wilson',
        'img': '/candidates/ethan.jpg' ,
        "position": 'First Trustee',

    },
    {
        "name": 'Ava Jackson',
        'img': '/candidates/ava.jpg' ,
        "position": 'Youth Representatives',
    }
    ]

    const HandleVote = (doc)=>{

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
                console.log(candidates_voted_for)
                const data = {
                    chairman:candidates_voted_for[0] ,
                    vice_chairman:candidates_voted_for[1] ,
                    vice_chairwoman:candidates_voted_for[2] ,
                    secretary:candidates_voted_for[3] ,
                    asst_secretary:candidates_voted_for[4] ,
                    first_trustee:candidates_voted_for[5] ,
                    second_trustee:candidates_voted_for[6] ,
                    youth_rep:candidates_voted_for[7] ,
                    date:fullDate
                }
                AddData("/tuc" , data)
                .then(res => {
                    setdone_with_everything(true)
                    setloading(false)
                } ).catch(err=>{
                    console.error("Error in adding to db" +  JSON.stringify(err))
                })

            }else{
            
            }
        })

       
    }
  return (
    <div>
        {
         loading &&  <Loader />
        }
      <Nav />
      
      <div className="padding-top-100">
        <div className="container">
            <div className="h2">Ghana Statistical Service TUC Voting</div>
            <div>Select the candidates you wish to vote for.</div>

            <div className="section">
                <div className="vote_progress_container">
                    <div className="vote_progress gradient" style={{width:`${percentage_voted}%` , padding:`${parseInt(percentage_voted) > 0 ? '0 2rem' : ''}`}}>
                    {
                        parseInt(percentage_voted) > 0 && <> <span>{`${percentage_voted}`}</span>%  </>
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
                    <div className="col sm-12 md-6 lg-4 padding" key={item.name} onClick={()=>HandleVote(item)}>
                   <Vote_card data={item}/>
                    </div>
                        ))
                    }
                </div>
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
                        />
                       </div>
                    </div>
                </div>
            </div>
            }

        </div>
      </div>
    </div>
  )
}
