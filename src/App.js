import { useState , useEffect} from "react";
import HomeSection from "./pages/userpages/HomeSection";
import SearchSection from "./pages/userpages/SearchSection";
import AdminHome from "./pages/adminpages/AdminHome";
import LoginForm from "./pages/adminpages/Login";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import {Routes,Route, useLocation,useNavigate , useParams} from "react-router-dom";
import SignUp from "./pages/adminpages/SignUp";
import FileUpload from "./pages/adminpages/FileUpload";
import AdminSearch from "./pages/adminpages/AdminSearch";
import ForgotPassword from "./pages/adminpages/forgotpassword";
import ResetPassword from "./pages/adminpages/resetpassword";

import 'bootstrap/dist/css/bootstrap.min.css';

import AboutLand from "./pages/userpages/AboutLand";

import {isAdminAuth , isAdminData, isAdminSession} from "./pages/adminpages/AdminAuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import axios from "axios";

function App() {
  
  const [adminAuth , setAdminAuth] = useState(false);
  const [adminData , setAdminData] = useState([]);
  const [adminSession , setAdminSession] = useState(false);
  const {pathname} = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log("refresh");
    console.log(pathname);
    axios.post("/refresh").then(
      (response)=>{
        if(response.data.auth){
        setAdminData(response.data.data);
        console.log(response.data.data);
        console.log("admindata after : ",adminData);
        setAdminAuth(response.data.auth);
        setAdminSession(true)
        navigate(pathname);
        }else{
          setAdminData(null);
          setAdminSession(false)
          setAdminAuth(response.data.auth);
          if(pathname.includes("admindashboard") || pathname.includes("adminupload") ){
            navigate("/adminlogin");
          }else{
            navigate(pathname);
          } 
         
        }
      }
    );
    
  },[adminAuth]);
  
  return (
    <>
        <Routes>
                  <Route exact path="/" element={<HomeSection/> }/>
              
                  <Route exact path="/search" element={<SearchSection/> }/>

                  <Route exact path="/aboutland" element={<AboutLand/> }/>

                  <Route exact path="/forgotpassword" element={<ForgotPassword/> }/>

                  <Route  path="resetpassword/:adminid" element={<ResetPassword /> }/>
                  
                  
                  <Route exact path="/adminportal" element={<AdminHome/> }/>

                  <Route exact path="/adminlogin" element={
                  <isAdminAuth.Provider value={{adminAuth , setAdminAuth}}>
                    <isAdminData.Provider value={{adminData , setAdminData}}>
                    <isAdminSession.Provider value={{adminSession , setAdminSession}}>
                    <LoginForm/>
                    </isAdminSession.Provider>
                    </isAdminData.Provider> 
                    </isAdminAuth.Provider>}/>

                    
                    
                    {/* The component bellow  helps us to make our admin routes secure thus we pass our routes through a protected routes component then we wrap our protected component with providers to pass in our use context variables */}
                    {/* protected route start */}
            <Route element ={
            <isAdminSession.Provider value={{adminSession , setAdminSession}}>
            <isAdminAuth.Provider value={{adminAuth , setAdminAuth}}>
            <isAdminData.Provider value={{adminData , setAdminData}}>
            <ProtectedRoutes />
            </isAdminData.Provider>
            </isAdminAuth.Provider>
            </isAdminSession.Provider>
            }>
            <Route exact path="/admindashboard" element={<AdminDashboard />}/>
            <Route exact path="/adminupload" element={<FileUpload /> }/>
            <Route exact path="/adminsearch" element={<AdminSearch /> }/>
            <Route exact path="/adminsignup" element={<SignUp/> }/>
              </Route>
              {/* protected route end */}
         </Routes>
       
    </>
  );
}


export default App;
