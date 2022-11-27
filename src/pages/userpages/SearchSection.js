import { useState } from "react";
import MySection from "../../components/main-components/Section";
import Ministrybar from "../../components/main-components/MinistryBar";
import styled from "styled-components";
import MyButton from "../../components/form-components/MyButton";
import MyNav from "../../components/main-components/MyNav";
import Lottie from "lottie-react";
import NoData from "../../lottiefiles/userlotties/nodata.json";
import FileLost from "../../lottiefiles/userlotties/filelost.json";
import Loading from "../../lottiefiles/userlotties/loading.json";
import { ToastContainer, toast } from "react-toastify";
import { URL } from "../../config";
import Axios from "axios";
import UserTable from "./UserTable";
import {
  cldcolumn,
  ownercolumn,
  neighbourcolumn,
  witnesscolumn,
} from "./UserColumns";
import { motion } from "framer-motion";

function SearchSection() {
  const [clinnumber, setclinnumber] = useState("");
  const [isempty, setisempty] = useState(false);
  const [showtable, setshowtable] = useState(false);
  const [cld, setcld] = useState("");
  const [owner, setowner] = useState("");
  const [neighbour, setneighbour] = useState("");
  const [witness, setwitness] = useState("");
  const [nouser, setnouser] = useState(false);
  const [showhometext, setshowhometext] = useState(true);

  const [customaryclick, setcustomaryclick] = useState(false);
  const [freeholdclick, setfreeholdclick] = useState(false);
  const [Mailolandclick, setMailolandclick] = useState(false);
  const [LeaseHoldclick, setLeaseHoldclick] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const search = async () => {
    if (!clinnumber) {
      setisempty("please first enter a value");
    } else {
      setisempty(false);
      setshowhometext(false);
      setIsLoading(true);

      const data = {
        clinnumber,
      };

      console.log("The search clin number is : ", clinnumber);
      console.log("the data is ", data);
      console.log("user search url is : ", URL);
      try {
        let response = await Axios.post(
          "https://land-search-backend-production.up.railway.app/usersearch",
          data,
          {
            withCredentials: true,
          }
        );
        console.log(response.data);
        setIsLoading(false);
        if (response.data.status === "successfull") {
          setshowhometext(false);
          setshowtable(true);
          setcld(response.data.cld);
          setneighbour(response.data.neighbour);
          setowner(response.data.owner);
          setwitness(response.data.witness);
        } else if (response.data.status === "user not found") {
          setshowhometext(false);
          setnouser(true);
        } else if (response.data.status === "failed") {
          setIsLoading(false);
          setisempty(false);
          setshowhometext(true);
          toast.error("Server problem");
          setclinnumber(null);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setisempty(false);
        setshowhometext(true);
        toast.error("Server Down");
      }
    }

    console.log("search button pressed");
  };

  const handleback = () => {
    setshowtable(false);
    setshowhometext(true);
    setnouser(false);
    setshowtable(false);
    setcld(null);
    setisempty("please try another clin number");
    setneighbour(null);
    setowner(null);
    setwitness(null);
    setclinnumber(null);
  };
  return (
    <MySection>
      <MyNav />
      <SearchSectionDiv>
        <Ministrybar />

        {showtable && (
          <div>
            <div style={{ marginBottom: "20px", marginTop: "20px" }}>
              <MyButton placeholder="Back" onClick={handleback} />
            </div>
            <div style={{ height: "200px", marginBottom: "20px" }}>
              <h2>Land Demarcation Table</h2>
              <UserTable columns={cldcolumn} rows={cld} />
            </div>
            <br />
            <div style={{ height: "400px", marginBottom: "20px" }}>
              <h2>Land Owner Table</h2>
              <UserTable columns={ownercolumn} rows={owner} />
            </div>
            <br />
            <div style={{ height: "400px", marginBottom: "20px" }}>
              <h2>Neighbours Table</h2>
              <UserTable columns={neighbourcolumn} rows={neighbour} />
            </div>
            <br />
            <div style={{ height: "400px", marginBottom: "20px" }}>
              <h2>witness Table</h2>
              <UserTable columns={witnesscolumn} rows={witness} />
            </div>
            <br />
          </div>
        )}

        {nouser && (
          <div style={{ height: "100%" }}>
            <div style={{ height: "30%" }}>
              <h1>
                No record found attached to this clin number :{" "}
                <span>{clinnumber}</span>
              </h1>
              <MyButton placeholder="Back" onClick={handleback} />
            </div>
            <div style={{ height: "70%" }}>
              <Lottie
                style={{ height: "200px" }}
                animationData={FileLost}
                loop={true}
              />
            </div>
          </div>
        )}

        {isLoading && (
          <div style={{ height: "100%" }}>
            <div style={{ height: "70%" }}>
              <Lottie
                style={{ height: "300px" }}
                animationData={Loading}
                loop={true}
              />
            </div>
          </div>
        )}

        {showhometext && (
          <div className="hometextcontainer">
            <div className="home-text">
              <strong>Hello ! You are Welcome</strong>
              <h2>
                <b>Land Search Information System</b>
              </h2>
              <p>
                {" "}
                You can easily perfom a search on your land by :<br /> first
                choosing your prefered tenure system ,<br /> Then entering in
                your clin number or <br /> entering in plot and block number
                where necessary{" "}
              </p>
            </div>
            <div className="row align-items-center search">
              <div className="contact-form" style={{ display: "flex" }}>
                <div className="contact-form-buttons">
                  <MyButton
                    active={customaryclick}
                    placeholder="customary"
                    style={{ margin: "10px" }}
                    onClick={() => {
                      setcustomaryclick(true);
                      setfreeholdclick(false);
                      setMailolandclick(false);
                      setLeaseHoldclick(false);
                    }}
                  />
                  <MyButton
                    active={freeholdclick}
                    placeholder="free_hold"
                    style={{ margin: "10px" }}
                    onClick={() => {
                      setfreeholdclick(true);
                      setcustomaryclick(false);
                      setMailolandclick(false);
                      setLeaseHoldclick(false);
                    }}
                  />
                  <MyButton
                    active={Mailolandclick}
                    placeholder="Mailo_land"
                    style={{ margin: "10px" }}
                    onClick={() => {
                      setcustomaryclick(false);
                      setfreeholdclick(false);
                      setMailolandclick(true);
                      setLeaseHoldclick(false);
                    }}
                  />
                  <MyButton
                    active={LeaseHoldclick}
                    placeholder="Lease_Hold"
                    style={{ margin: "10px" }}
                    onClick={() => {
                      setcustomaryclick(false);
                      setfreeholdclick(false);
                      setMailolandclick(false);
                      setLeaseHoldclick(true);
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "Center",
                    alignItems: "center",
                  }}
                >
                  {customaryclick && (
                    <motion.div
                      key="customary"
                      initial={{
                        width: "0px",
                        y: "50%",
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{ width: "100%", y: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      exit={{
                        width: "1px",
                        y: "50%",
                        opacity: 0,
                        transition: { duration: 0.5 },
                      }}
                      className="row"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "Center",
                        alignItems: "center",
                        paddingTop: "30px",
                      }}
                    >
                      {isempty && <p style={{ color: "red" }}>{isempty}</p>}

                      <div className="input-group">
                        <input
                          style={{ width: "100%" }}
                          type="text"
                          onChange={(e) => setclinnumber(e.target.value)}
                          placeholder="enter clin number"
                          className="input-control"
                          required
                        />
                      </div>
                      <MyButton placeholder="search" onClick={search} />
                    </motion.div>
                  )}

                  {freeholdclick && (
                    <motion.div
                      key="freehold"
                      initial={{
                        width: "0px",
                        y: "50%",
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{ width: "100%", y: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      exit={{
                        width: "1px",
                        y: "50%",
                        opacity: 0,
                        transition: { duration: 0.5 },
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "Center",
                        alignItems: "center",
                        paddingTop: "30px",
                      }}
                    >
                      <strong style={{ color: "green" }}>
                        Free Hold Land Data not yet set
                      </strong>
                      <Lottie
                        style={{ width: "60%" }}
                        animationData={NoData}
                        loop={true}
                      />
                    </motion.div>
                  )}

                  {Mailolandclick && (
                    <motion.div
                      key="mailo"
                      initial={{
                        width: "0px",
                        y: "50%",
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{ width: "100%", y: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      exit={{
                        width: "1px",
                        y: "50%",
                        opacity: 0,
                        transition: { duration: 0.5 },
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "Center",
                        alignItems: "center",
                        paddingTop: "30px",
                      }}
                    >
                      <strong style={{ color: "brown" }}>
                        Mailo Land Data not yet set
                      </strong>
                      <Lottie
                        style={{ width: "60%" }}
                        animationData={NoData}
                        loop={true}
                      />
                    </motion.div>
                  )}
                  {LeaseHoldclick && (
                    <motion.div
                      key="leasehold"
                      initial={{
                        width: "0px",
                        y: "50%",
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{ width: "100%", y: 0, opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      exit={{
                        width: "1px",
                        y: "50%",
                        opacity: 0,
                        transition: { duration: 0.5 },
                      }}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "Center",
                        alignItems: "center",
                        paddingTop: "30px",
                      }}
                    >
                      <strong style={{ color: "red" }}>
                        Lease Hold Data not yet set
                      </strong>
                      <Lottie
                        style={{ width: "60%" }}
                        animationData={NoData}
                        loop={true}
                      />
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </SearchSectionDiv>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </MySection>
  );
}

const SearchSectionDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;

  .hometextcontainer {
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: row;
    @media (max-width: 1000px) {
      flex-direction: column;
      display: flex;
      flex-wrap: wrap;
    }
  }

  .home-text,
  .search {
    width: 50%;
    padding: 15px;
    @media (max-width: 1000px) {
      width: 100%;
    }
  }
  .contact-form {
    height: 100%;
    padding: 0 15px;
    border-left: 1px dotted var(--white-alpha-40);
    @media (max-width: 850px) {
      flex-direction: column;
      width: 100%;
      border-top: 1px dotted var(--white-alpha-40);
    }
  }

  .contact-form-buttons {
    display: flex;
    width: 50%;
    height: 100%;
    flex-direction: column;
    @media (max-width: 850px) {
      display: flex;
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
  .contact-form .row {
    align-items: center;
  }
  .contact-form .input-group {
    width: 100%;
    margin-bottom: 30px;
  }
  .contact-form .input-control::placeholder {
    color: var(--black-dark);
    opacity: 0.8;
    font-weight: 300;
  }
  .contact-form .input-control {
    display: block;
    width: 100%;
    height: 50px;
    border-radius: 25px;
    border: none;
    font-family: inherit;
    font-weight: 400;
    font-size: 16px;
    background-color: var(--white-alpha-25);
    padding: 0 20px;
    color: var(--blue-dark);
    border: 1px solid transparent;
    transition: border-color 0.3s ease;
  }
  .contact-form .input-control:focus {
    border-color: var(--white-alpha-40);
  }
`;
export default SearchSection;
