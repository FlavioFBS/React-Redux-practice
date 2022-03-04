import React from 'react'
import fatal_img from '../../assets/404_error.jpg'

export const Fatal = (props) => {
  return (
    <div className="bg-warning text-center">
      <img src={fatal_img} alt="404" srcset="" />
      <h3>{props.message}</h3>
    </div>
  )
}
