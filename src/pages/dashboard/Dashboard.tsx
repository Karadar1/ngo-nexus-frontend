import React, { useState } from 'react'
import { useUser } from '../../context/UserContext';
import DashboardNgo from './dashbboardNgo/DashboardNgo';
import DashboardVolunteer from './dashboardVolunteer/DashboardVolunteer';

function Dashboard() {
  
  const {user,logout} = useUser()
  const isNgo = user?.role !== "volunteer"
  
  
  if (!user) {
    return <p>You are not logged in.</p>;
  }


  return (<>
     
    {isNgo? 
     <DashboardNgo />
    
    :<DashboardVolunteer />} 

  </>
  )
}

export default Dashboard