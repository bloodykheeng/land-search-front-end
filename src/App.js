import { useState , useEffect} from "react";
import HomeSection from "./pages/userpages/HomeSection";
import SearchSection from "./pages/userpages/SearchSection";
import AdminHome from "./pages/adminpages/AdminHome";
import LoginForm from "./pages/adminpages/Login";
import AdminDashboard from "./pages/adminpages/AdminDashboard";
import {Routes,Route, useLocation,useNavigate} from "react-router-dom";
import SignUp from "./pages/adminpages/SignUp";
import FileUpload from "./pages/adminpages/FileUpload";
import 'bootstrap/dist/css/bootstrap.min.css';

import {isAdminAuth , isAdminData} from "./pages/adminpages/AdminAuthContext";
import ProtectedRoutes from "./ProtectedRoutes";
import axios from "axios";

function App() {
  
  const [adminAuth , setAdminAuth] = useState(false);
  const [adminData , setAdminData] = useState([]);
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
        navigate(pathname);
        }else{
          setAdminData(null);
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
                  
                  <Route exact path="/adminhome" element={<AdminHome/> }/>

                  <Route exact path="/adminlogin" element={
                  <isAdminAuth.Provider value={{adminAuth , setAdminAuth}}>
                    <isAdminData.Provider value={{adminData , setAdminData}}>
                    <LoginForm/>
                    </isAdminData.Provider> 
                    </isAdminAuth.Provider>}/>

                  <Route exact path="/adminsignup" element={
                  <isAdminAuth.Provider value={{adminAuth ,setAdminAuth}}>
                    <SignUp/>
                    </isAdminAuth.Provider>  }/>
                    
                    

            <Route element ={
            <isAdminAuth.Provider value={{adminAuth , setAdminAuth}}>
            <isAdminData.Provider value={{adminData , setAdminData}}>
            <ProtectedRoutes />
            </isAdminData.Provider>
            </isAdminAuth.Provider>
            }>
            <Route exact path="/admindashboard" element={<AdminDashboard />}/>
            <Route exact path="/adminupload" element={<FileUpload/> }/>
              </Route>
         </Routes>
       
    </>
  );
}


export default App;
