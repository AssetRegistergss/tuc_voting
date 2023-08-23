'use client';
import React, { useEffect } from 'react'
import CanvasJSReact from '@canvasjs/charts'; 
export default function Chart({container , data , title}) {
    useEffect(() => {
        const chart = new CanvasJSReact.Chart(container, {
          animationEnabled: true,
          title: {
            text: title,
            horizontalAlign: "left"
          },
          data: [{
            type: "doughnut",
            startAngle: 60,
            //innerRadius: 60,
            indexLabelFontSize: 17,
            indexLabel: "{label} - #percent%",
            toolTipContent: "<b>{label}:</b> {y} (#percent%)",
            dataPoints: data
          }]
        });
        chart.render();
      }, []);
  return (
    <div>
      <div className="row">
        {
          data &&
          data.map( doc => (
            <div className="col sm-6 lg-4 md-4 padding">
              <div className="card" key={doc.label} style={{margin:'0 0 1rem 0' , padding:'0.5rem' , borderRadius:'2rem'}}>
                {doc.label}
                <div className="h2">
                  {doc.y}
                </div>
              </div>
            </div>
          ) )
        }
      </div>
              <div id={container} className='lighter' style={{ height: '250px', width: '100%' }}></div>
    </div>
  )
}
