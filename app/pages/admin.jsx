// import Chart from ','
import React, { useEffect } from 'react'
import dynamic from 'next/dynamic'
const Chart = dynamic(()=>import("@/components/Chart,") ,{ssr:false})
export default function Admin() {

    
  return (
    <div>
      <div className="container">
        <div className="padding-20 lighter result_card">
            <div>Election</div>
            <div className="h2">Results</div>
            <div className="margin-top-20">
              <div className="row">
                <div className="col sm-12 md-6 lg-6 padding">
                <div>
                    <Chart 
                    container={"chairman"} 
                    title={"Chairman"}
                    data={[
                        { y: 67, label: "Iddris Abdul Wahab" },
                        { y: 28, label: "Ahmed Salim" },
                        { y: 10, label: "John Deo" },
                        { y: 7, label: "Jane Doris" },
                      ]}
                    
                    />
                </div>
                </div>
                <div className="col sm-12 md-6 lg-6 padding">
                <div>
                    <Chart 
                    container={"vice_chairman"} 
                    title={"Vice Chairman"}
                    data={[
                        { y: 67, label: "Iddris Abdul Wahab" },
                        { y: 28, label: "Ahmed Salim" },
                        { y: 10, label: "John Deo" },
                        { y: 7, label: "Jane Doris" },
                      ]}
                    
                    />
                </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}
