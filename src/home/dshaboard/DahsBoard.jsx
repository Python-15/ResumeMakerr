import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Addresmue from './component/Addresmue';
import { useUser } from '@clerk/clerk-react';
import apiServices from '../../../apiServices/apiServices'
import ResumeList from './component/ResumeList';

function DahsBoard() {
  // now we will get resumeDetails of user based on userEmail,
  const user = useUser();
  const userEmail = user.user.primaryEmailAddress.emailAddress;
  // will store resume list in array
  const [resumeList, setResumeList] = useState([]); 
  const GetresumeDetails = async () => {
    try {
      const response = await apiServices.getResumeDetails(userEmail);
      setResumeList(response.data.data);
     
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    GetresumeDetails();
  }, [])
  return (
    <div className="DashBoard_container">
      <h2 className="font-bold text-3xl">My Resume</h2>
      <p>Start your journey with AI resume maker</p>
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mt-10"
      >
        <Addresmue />
        {
  resumeList && resumeList.map((item, index) => (
    <ResumeList resumesItems={item} key={index} />
  ))
}
      </div>
    </div>
  );
}

export default DahsBoard;