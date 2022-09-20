import React from 'react'
import {Detector} from "react-detect-offline";
import NoInternet from "../../lottiefiles/adminlotties/113265-no-internet-connection.json";
import Lottie from "lottie-react";
export default function CheckConnection({children}) {
  return ( 
  <>
     <Detector render={({online})=>(
         online ? children : 
         <div style={{height : "100%",width:"100%",alignItems:"center",justifyContent:"center"}}>
            <div style={{height:"75%"}}><Lottie animationData={NoInternet}/></div>
            <div><h2>No Internet Connection</h2></div>
         </div>
     )}/>
    
  </>
   
  )
}
