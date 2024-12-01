import { Notebook } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'


function ResumeList(resumesItems) {
   
  return (
  <div>
      <Link to={'/dashboard/resume/' + resumesItems.resumesItems.documentId +"/edit"}>
    <div  className='p-14 py-24 border 
    items-center flex 
    justify-center bg-secondary
    rounded-lg h-[250px]
    hover:scale-105 transition-all hover:shadow-md
    cursor-pointer border-dashed'>
      
        <Notebook>

        </Notebook>
       
      
    </div>
    </Link>
    <h2 className='p-2'>{resumesItems.resumesItems.title}</h2>
     </div>
  )
}

export default ResumeList