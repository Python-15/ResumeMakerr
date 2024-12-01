
import './style.css'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'
import {useUser , UserButton} from '@clerk/clerk-react'


function Header() {
    const {isSignedIn}= useUser();
  return (
    <>
   <div className='resumeLogo'>
   <img src="public/resumemaker.svg"  className="fixed-image" />
   <Link to={'/auth/signpage'}>
   {!isSignedIn?
   <Button>Build Your's</Button> :null
   }
   
   </Link>
   {
    isSignedIn? 
    <div className='user_section'>
        <Link to={'/dashboard'}>
        <Button>DahsBoard </Button>
        </Link>
        <UserButton/>
    </div>
    : <Link to={'/auth/signpage'}></Link>
   }
   </div>
        
    </>
  )
}

export default Header