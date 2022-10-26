import {useState} from 'react';
import MySection from '../../components/main-components/Section';
import MyNav from '../../components/main-components/MyNav';
import MinistryBar from '../../components/main-components/MinistryBar';
import MyButton from '../../components/form-components/MyButton';

import TenureTypes from './minipages/TenureTypes';
import BuyingProcess from './minipages/BuyingProcess';
import Customary from './minipages/Customary';
import FreeHold from './minipages/FreeHold';
import LeaseHold from './minipages/LeaseHold';
import Mailo from './minipages/Mailo';

const AboutLand = () => {
const [tenuretypesclick , settenuretypesclick] = useState(true);
const [aboutmajorstepsclick , setaboutmajorstepsclick] = useState(false);
const [aboutcustomaryclick , setaboutcustomaryclick] = useState(false);
const [aboutfreeholdclick , setaboutfreeholdclick] = useState(false);
const [aboutMailolandclick , setaboutMailolandclick] = useState(false);
const [aboutLeaseHoldclick , setaboutLeaseHoldclick] = useState(false);
  return (
    <MySection>
        <MyNav />
        <div className='Container'>
        <MinistryBar />
            <div className="contentContainer">
                <div style={{display : "flex", flexWrap : "wrap"}}>
                <MyButton active={tenuretypesclick} placeholder="Tenure Types" style={{margin:"10px"}} onClick={()=>{
                        settenuretypesclick(true);
                        setaboutmajorstepsclick(false);
                        setaboutcustomaryclick(false);
                        setaboutfreeholdclick(false);
                        setaboutMailolandclick(false);
                        setaboutLeaseHoldclick(false); 
                        console.log("tenure types");
                    }} />
                <MyButton active={aboutmajorstepsclick} placeholder="Buying Process" style={{margin:"10px"}} onClick={()=>{
                        settenuretypesclick(false);
                        setaboutmajorstepsclick(true);
                        setaboutcustomaryclick(false);
                        setaboutfreeholdclick(false);
                        setaboutMailolandclick(false);
                        setaboutLeaseHoldclick(false); 
                        console.log("Major Steps");
                    }} />
                <MyButton active={aboutcustomaryclick} placeholder="customary" style={{margin:"10px"}} onClick={()=>{
                        settenuretypesclick(false);
                        setaboutmajorstepsclick(false);
                        setaboutcustomaryclick(true);
                        setaboutfreeholdclick(false);
                        setaboutMailolandclick(false);
                         setaboutLeaseHoldclick(false); 
                        console.log("clicked customary");
                    }} />
                    <MyButton active={aboutfreeholdclick} placeholder="free hold" style={{margin:"10px"}} onClick={()=>{
                        settenuretypesclick(false);
                        setaboutmajorstepsclick(false);
                        setaboutcustomaryclick(false);
                        setaboutfreeholdclick(true);
                        setaboutMailolandclick(false);
                         setaboutLeaseHoldclick(false); 
                        console.log("clicked free hold");
                        }}/>
                    <MyButton active={aboutMailolandclick} placeholder="Mailo land" style={{margin:"10px"}} onClick={()=>{
                        settenuretypesclick(false);
                        setaboutmajorstepsclick(false);
                        setaboutcustomaryclick(false);
                        setaboutfreeholdclick(false);
                        setaboutMailolandclick(true);
                         setaboutLeaseHoldclick(false); 
                        console.log("clicked Mailo Land");

                        }}/>
                    <MyButton active={aboutLeaseHoldclick} placeholder="Lease Hold" style={{margin:"10px"}} onClick={()=>{
                        settenuretypesclick(false);
                        setaboutmajorstepsclick(false);
                        setaboutcustomaryclick(false);
                        setaboutfreeholdclick(false);
                        setaboutMailolandclick(false);
                         setaboutLeaseHoldclick(true); 
                        console.log("clicked Lease Hold");
                        }}/>
                </div>
                <div>
                {tenuretypesclick && <TenureTypes/>}
                {aboutmajorstepsclick && <BuyingProcess />}
                {aboutcustomaryclick && <Customary />}
                {aboutfreeholdclick && <FreeHold />}
                {aboutMailolandclick && <Mailo />}
                {aboutLeaseHoldclick &&  <LeaseHold />} 
                </div>
           
            </div>
        </div>
    </MySection>
    
  )
}

export default AboutLand;