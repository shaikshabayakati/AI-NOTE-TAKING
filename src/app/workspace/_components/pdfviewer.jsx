import React from 'react'

const Pdfviewer = ({fileinfo}) => {
    
  return (
    <div>
        <iframe src={fileinfo+"#toolbar=0"} height="100vh" width="100%" className='h-[100vh]'/>
    </div>
  )
}

export default Pdfviewer