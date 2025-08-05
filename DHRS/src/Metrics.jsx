import React from 'react'
import './Metrics.css'

const Metrics = () => {
  return (
    <div className="metrics-container">
        <div className="metric1">
            <p className="num1">98%</p>
            <p className="txt1">Avg. Medication Adherance</p>
        </div>
        <div className="metric2">
            <p className="num1">132</p>
            <p className="txt1">Days Symptoms Tracked</p>
        </div>
        <div className="metric1">
            <p className="num1">7,500</p>
            <p className="txt1">Steps Last 7 Days</p>
        </div>
    </div>
  )
}

export default Metrics