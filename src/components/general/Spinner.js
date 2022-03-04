import React from 'react'
import '../../css/spinner.css'
import '../../css/index.css'
export const Spinner = (props) => {
  return (
    <div className="center">
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  )
}
