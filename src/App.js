import { useState } from "react";
import HomeSection from "./components/userpages/home-section";
import SearchSection from "./components/userpages/search-section";
import AdminHome from "./components/adminpages/adminhome";
import MyForm from "./components/adminpages/Login";
import {Routes,Route} from "react-router-dom";
import SignUp from "./components/adminpages/signup";
import FileUpload from "./components/adminpages/fileupload";
import 'bootstrap/dist/css/bootstrap.min.css';

import {isAdminAuth} from "./components/adminpages/adminAuthContext";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const [adminAuth , setAdminAuth] = useState(true);
  return (
    <>
      
        <Routes>
                  <Route exact path="/" element={<HomeSection/> }/>

                  <Route exact path="/search" element={<SearchSection/> }/>
                  
                  <Route exact path="/adminhome" element={<AdminHome/> }/>

                  <Route exact path="/adminlogin" element={
                  <isAdminAuth.Provider value={{adminAuth , setAdminAuth}}>
                    <MyForm/> </isAdminAuth.Provider>}/>

                  <Route exact path="/adminsignup" element={
                  <isAdminAuth.Provider value={{adminAuth ,setAdminAuth}}>
                    <SignUp/></isAdminAuth.Provider>  }/>

            <Route element ={
            <isAdminAuth.Provider value={{adminAuth , setAdminAuth}}>
            <ProtectedRoutes />
            </isAdminAuth.Provider>
            }>

            <Route exact path="/adminupload" element={<FileUpload/> }/>
              </Route>
         </Routes>
       
    </>
  );
}


export default App;
