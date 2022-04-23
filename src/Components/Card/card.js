import React from 'react'
import './card.scss'
const Card = (props) => {
  const handler = () => {
    console.log('fsfksfslkfda')
  }

  return (
    <div className="card" onClick={props.onClick}>
      {props.children}
    </div>
  )
}

export default Card
