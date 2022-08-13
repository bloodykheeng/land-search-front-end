import HomeSection from "./components/userpages/home-section";
import SearchSection from "./components/userpages/search-section";
import AdminHome from "./components/adminpages/adminhome";
import MyForm from "./components/adminpages/Login";
import {Routes,Route} from "react-router-dom";
import SignUp from "./components/adminpages/signup";
import FileUpload from "./components/adminpages/fileupload";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<HomeSection/> }/>
        <Route exact path="/search" element={<SearchSection/> }/>
        <Route exact path="/adminlogin" element={<MyForm/> }/>
        <Route exact path="/adminhome" element={<AdminHome/> }/>
        <Route exact path="/adminsignup" element={<SignUp/> }/>
        <Route exact path="/adminupload" element={<FileUpload/> }/>
       </Routes>
    </>
  );
}


export default App;
