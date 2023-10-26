import React from 'react'
import { Hearts } from 'react-loader-spinner'

const Loading = () => {
  return (
            <Hearts 
        height="80"
        width="80"
        color="#ff9900"
        ariaLabel="hearts-loading"
        wrapperStyle={{justifyContent:"center",height:"85vh",alignItems:"center"}}
        wrapperClass=""
        visible={true}
        />
  )
}

export default Loading
