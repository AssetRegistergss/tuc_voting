// import Chart from ','
import React, { useEffect , useState } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(()=>import("@/components/Chart,") ,{ssr:false})
import { AddData, EndPoint, GetToken, isOnline } from '@/Functions/Functions';
import { FunRequest } from 'funuicss/js/Fun';
import Axios  from 'axios';
import Loader from '@/components/Loader';
export default function Admin() {
  const [data, setdata] = useState("")
  useEffect( () => {
  if(!data){
    const token =  GetToken()
    Axios.get(EndPoint + '/api/tuc' , {
      headers:{
        authorization:`Bearer ${token}`
      }
    }).then(res => {
      setdata(res.data)
    } )
    .catch( (err) => (console.log(err)) )
  }
  } )
  const [filter, setfilter] = useState('all')
    
  if(data){
    return (
      <div>
        <div className="container">
          <div className="padding">
            <select name="" id="" className='card input full-width borderedInput ' 
            onChange={(e) => setfilter(e.target.value) }
            >
              <option value="all"> All </option>
              <option value="chairman"> Chairman </option>
              <option value="secretary"> Secretary </option>
              <option value="trustee"> Trustee </option>
              <option value="youth_representative"> Youth Representative </option>
            </select>
          </div>
         {
          filter == 'all' || filter == "chairman" ?
          <div className=" lighter result_card">
          <div>Election</div>
          <div className="h4">Results for Chairperson , Vice Chairperson | Chairwoman</div>
          <div className="margin-top-20">
            <div className="row">
              <div className="col sm-12 md-6 lg-6 padding">
              <div>
                  <Chart 
                  container={"Chairperson"} 
                  title={"Chairperson"}
                  data={data.chairman}
                  
                  />
              </div>
              </div>
              <div className="col sm-12 md-6 lg-6 padding">
              <div>
                  <Chart 
                  container={"vice_chairman"} 
                  title={"Vice Chairperson"}
                  data={data.vice_chairman}
                  
                  />
              </div>
              </div>
              <div className="col sm-12 md-12 lg-12 padding">
              <div>
                  <Chart 
                  container={"vice_chairwoman"} 
                  title={"Vice Chairwoman"}
                  data={data.vice_chairwoman}
                  
                  />
              </div>
              </div>
         
            </div>
          </div>
      </div>
      :''
         }
       {
        filter == 'all' || filter == 'secretary' ?
        <div className=" lighter result_card">
        <div>Election</div>
        <div className="h4">Results For Secretary & Assistant Secretary</div>
        <div className="margin-top-20">
          <div className="row">
          <div className="col sm-12 md-6 lg-6 padding">
            <div>
                <Chart 
                container={"Secretary"} 
                title={"Secretary"}
                data={data.secretary}
                
                />
            </div>
            </div>
            <div className="col sm-12 md-6 lg-6 padding">
            <div>
                <Chart 
                container={"Assistant Secretary"} 
                title={"Assistant Secretary"}
                data={data.asst_secretary}
                
                />
            </div>
            </div>
          </div>
        </div>
    </div>
           :''}
         {
          filter == 'all' || filter == 'trustee' ?
          <div className=" lighter result_card">
          <div>Election</div>
          <div className="h4">Results For First & Second Trustee</div>
          <div className="margin-top-20">
            <div className="row">
            <div className="col sm-12 md-6 lg-6 padding">
              <div>
                  <Chart 
                  container={"First_Trustee"} 
                  title={"First Trustee"}
                  data={data.first_trustee}
                  
                  />
              </div>
              </div>
              <div className="col sm-12 md-6 lg-6 padding">
              <div>
                  <Chart 
                  container={"Second_Trustee"} 
                  title={"Second Trustee"}
                  data={data.second_trustee}
                  
                  />
              </div>
              </div>
            </div>
          </div>
      </div>
            :'' }
  {
    filter == 'all' || filter == 'youth_representative' ?
    <div className=" lighter result_card">
    <div>Election</div>
    <div className="h4">Results For Youth Representative</div>
    <div className="margin-top-20">
      <div className="row">
      <div className="col sm-12 md-12 lg-12 padding">
        <div>
            <Chart 
            container={"Youth Representative"} 
            title={"Youth Representative"}
            data={data.youth_rep}
            
            />
        </div>
        </div>

      </div>
    </div>
</div>
     :'' }

        </div>
      </div>
    )
  }else{
    <Loader />
  }
}
