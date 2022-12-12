import { useState, useEffect } from "react";
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
import PaypalCheckoutButton from "./PaypalCheckoutButton";
import { validate } from "react-email-validator";
import parse from "html-react-parser";
import {
  cldcolumn,
  ownercolumn,
  neighbourcolumn,
  witnesscolumn,
} from "./UserColumns";
import { motion } from "framer-motion";

import loadingCircle from "../../lottiefiles/userlotties/loadingCircle.json";
import emailjs from "@emailjs/browser";

function SearchSection() {
  const [clinnumber, setclinnumber] = useState("");
  const [isempty, setisempty] = useState(false);
  const [showtable, setshowtable] = useState(false);
  const [cld, setcld] = useState("");
  const [owner, setowner] = useState("");
  const [neighbour, setneighbour] = useState("");
  const [witness, setwitness] = useState("");
  const [nouser, setnouser] = useState(false);
  const [showhometext, setshowhometext] = useState(false);

  const [customaryclick, setcustomaryclick] = useState(false);
  const [freeholdclick, setfreeholdclick] = useState(false);
  const [Mailolandclick, setMailolandclick] = useState(false);
  const [LeaseHoldclick, setLeaseHoldclick] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showemailtab, setShowemailtab] = useState(false);
  const [useremail, setUseremail] = useState();
  const [showpaypalbuttons, setShowpaypalbuttons] = useState(false);
  const [paypalmsg, setPaypalMsg] = useState();
  const [msg, setMsg] = useState();

  const [otpTab, setOtpTab] = useState(true);
  const [otp, setotp] = useState("");
  const [otpEmail, setOtpEmail] = useState("");
  const [otpMsg, setOtpMsg] = useState("");
  const [otpIsLoading, setOtpIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [instructions, setInstructions] = useState("");
  const [shownotes, setShownotes] = useState(true);
  const [tokenEmailLoading, setTokenEmailLoading] = useState(false);
  const {
    setPaypalResponse,
    setErrMsg,
    payername,
    paypalResponse,
    renderPaypal,
    errMsg,
  } = PaypalCheckoutButton();

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
      let url = `${URL}/usersearch`;
      try {
        let response = await Axios.post(url, data, {
          withCredentials: true,
        });
        console.log(response.data);
        setIsLoading(false);
        if (response.data.status === "successfull") {
          setshowhometext(false);
          setshowtable(true);
          setcld(response.data.cld);
          setneighbour(response.data.neighbour);
          setowner(response.data.owner);
          setwitness(response.data.witness);
          setShownotes(false);
        } else if (response.data.status === "user not found") {
          setshowhometext(false);
          setShownotes(false);
          setnouser(true);
        } else if (response.data.status === "failed") {
          setIsLoading(false);
          setisempty(false);
          setshowhometext(true);
          toast.error("Server problem");
          setclinnumber(null);
          setShownotes(true);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        setisempty(false);
        setshowhometext(true);
        toast.error("Server Down");
        setShownotes(true);
      }
    }

    console.log("search button pressed");
  };
  useEffect(() => {
    console.log("use effect working");
    if (otpTab) {
      setInstructions(
        "<p>please enter a token you recieved in you email</p><p>after paying for the search and</p><p> if you dont have you can click on get token to get yourself one</p>"
      );
      setTitle("Token");
    } else if (showemailtab) {
      setTitle("How to receive a token");
      setInstructions(
        "<p>please enter any valid email that you posses </p> <p>we shall send a token to this email after you paying a search fee </p> <p>and you shall use it to peform your search but in case you already have a tocken </p>you can click back for you to be able to enter it"
      );
    } else if (validate(useremail)) {
      setTitle("Pay with Paypal or Credit card");
      setInstructions(
        "<p>If you have a paypal account<p/> you can easily pay using paypal by clicking on the pay pal button below </p> <p>or you can simply use a credit card by entering in your credit card details respctievely</p><p> but make sure your have a working internet connection for you to use or see the pay buttons</p>"
      );
    } else if (showhometext) {
      setTitle("Land Title Searching");
      setInstructions(
        `<p>You can easily perfom a search on your land by</p> : <ul> 
        <li>first
        choosing your prefered tenure system 
        </li>
        <li>Then entering in
        your clin number or entering in plot and block number
        where necessary</li>
        </ul>`
      );
    }
  }, [otpTab, showemailtab, useremail, showhometext]);

  useEffect(() => {
    if (paypalResponse.status === "COMPLETED") {
      sendEmail();
      setTokenEmailLoading(false);
    } else {
      setTokenEmailLoading(false);
    }
  }, [paypalResponse]);

  const sendEmail = async () => {
    console.log("send email function user email is : ", useremail);
    setTokenEmailLoading(true);
    let data = {
      paypalTxId: paypalResponse.id,
      paypalPayerEmailAddress: paypalResponse.payer.email_address,
      paypalTxStatus: paypalResponse.status,
      paypalTxCurrency: paypalResponse.purchase_units[0].amount.currency_code,
      paypalTxAmount: paypalResponse.purchase_units[0].amount.value,
      userEmail: useremail,
    };
    const res = await Axios.post("/storepayments", data, {
      withCredentials: false,
    });
    console.log("finished updating store");
    console.log(res);
    if (res.data.status === "Successfull") {
      console.log("started sending email");
      try {
        const serviceid = "service_mrf6ewt";
        const templateid = "template_xb5668r";
        const publickey = "fcTjLWSnhcZiQlj1a";

        let token = res.data.data.token;
        let payerName = payername;
        let email = res.data.data.userEmail;
        console.log(
          "the email we  to whom we are sending",
          res.data.data.userEmail
        );

        let emailmessage = `Dear customer you made a search payment with a paypalaccount registered in the names of ${payerName}. Therefore use this token to make your search token : ${token}`;

        const data = {
          from_name: "LandSearch",
          email_to: email,
          to_name: `${email}`,
          message: emailmessage,
          reply_to: "noreply",
        };

        try {
          let response = await emailjs.send(
            serviceid,
            templateid,
            data,
            publickey
          );
          console.log("send email response: ", response);
          setPaypalMsg({
            color: "green",
            msg: "transaction successful you can go check your token from your email",
          });
          setErrMsg("");
          setTokenEmailLoading(false);
        } catch (err) {
          setTokenEmailLoading(false);
          //console.log("send email error : ",err.status);
          err.status === 0 && toast.error("Check Your Internet connection");
        }
      } catch (err) {
        setTokenEmailLoading(false);
        console.log(err);
        toast.error("Server Down");
      }

      setPaypalResponse("test");
    } else {
      setPaypalMsg({
        color: "red",
        msg: "failed to send token to your email",
      });
      setPaypalResponse("test");
    }
  };

  const handleback = () => {
    setOtpMsg("Thanks for searching.");
    setOtpTab(true);
    setshowtable(false);
    setshowhometext(false);
    setnouser(false);
    setshowtable(false);
    setcld(null);
    setisempty("please try another clin number");
    setneighbour(null);
    setowner(null);
    setwitness(null);
    setclinnumber(null);
    setShownotes(true);
  };

  const validateToken = () => {
    if (!validate(otpEmail)) {
      setOtpMsg("you email is invalid");
    } else if (otp.length > 20) {
      setOtpMsg("This cant be our Token");
    } else {
      setOtpIsLoading(true);
      const data = { token: otp, userEMail: otpEmail };

      let url = `/validateToken`;
      Axios.post(url, data, {
        withCredentials: true,
        crossorigin: true,
      })
        .then((response) => {
          console.log("finished querying for token response is : ", response);
          setIsLoading(false);
          if (response.data.status === "Succesfull") {
            setOtpIsLoading(false);
            setshowhometext(true);
            setOtpTab(false);
          } else {
            setOtpIsLoading(false);
            setOtpMsg("invalid token go get one and come back");
          }
        })
        .catch((err) => {
          setOtpIsLoading(false);
          console.log(err);
          toast.error("Server Down");
        });
    }
  };

  return (
    <MySection>
      <MyNav />
      <SearchSectionDiv>
        <Ministrybar />
        <div className="hometextcontainer">
          {shownotes && (
            <div>
              <div className="note" style={{ padding: "20px" }}>
                <h3>{parse(title)}</h3>
                <span>{parse(instructions)}</span>
              </div>
            </div>
          )}

          {/* show otp code */}
          {otpTab && (
            <div>
              <motion.div
                key="promptemail"
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
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "Center",
                    alignItems: "center",
                  }}
                  className="otptab"
                >
                  <p style={{ color: "red" }}>{otpMsg}</p>
                  <div
                    className="input-group"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "Center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="email"
                      onChange={(e) => {
                        setOtpEmail(e.target.value);
                      }}
                      placeholder="enter email"
                      className="input-control"
                      required
                    />
                  </div>

                  <div
                    className="input-group"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "Center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="text"
                      onChange={(e) => {
                        setotp(e.target.value);
                      }}
                      placeholder="enter your token"
                      className="input-control"
                      required
                    />
                  </div>
                  {otpIsLoading && (
                    <div>
                      <Lottie
                        style={{ height: "100px" }}
                        animationData={loadingCircle}
                        loop={true}
                      />
                    </div>
                  )}

                  <MyButton
                    placeholder="Submit"
                    onClick={() => {
                      if (otp && otpEmail) {
                        // setShowemailtab(false);
                        // setShowpaypalbuttons(true);
                        validateToken();
                      } else {
                        setOtpMsg("you left some input fields empty");
                      }
                    }}
                  />
                  <strong style={{ fontSize: "16px", color: "blue" }}>
                    <button
                      style={{
                        textDecoration: "none",
                        background: "none",
                        border: "none",
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowemailtab(true);
                        setOtpTab(false);
                        setotp("");
                        setOtpEmail("");
                      }}
                    >
                      Get token
                    </button>
                  </strong>
                </div>
              </motion.div>
            </div>
          )}
          {/* show otp code end*/}

          {/* show email tab */}
          {showemailtab && (
            <div>
              <motion.div
                key="promptemail"
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
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "Center",
                    alignItems: "center",
                    paddingTop: "30px",
                  }}
                  className="showemailtab"
                >
                  <p style={{ color: "red" }}>{msg}</p>
                  <div
                    className="input-group"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "Center",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="email"
                      onChange={(e) => {
                        setUseremail(e.target.value);
                      }}
                      placeholder="enter your email"
                      className="input-control"
                      required
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "Center",
                        alignItems: "center",
                      }}
                    />
                  </div>
                  <MyButton
                    placeholder="Proceed To Pay"
                    onClick={() => {
                      if (validate(useremail)) {
                        setShowemailtab(false);
                        setShowpaypalbuttons(true);
                      } else {
                        setMsg("invalid email");
                      }
                    }}
                  />

                  <strong style={{ fontSize: "16px", color: "blue" }}>
                    <button
                      style={{
                        textDecoration: "none",
                        background: "none",
                        border: "none",
                        color: "blue",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setShowemailtab(false);
                        setOtpTab(true);
                        setOtpMsg("");
                        setMsg("");
                      }}
                    >
                      back
                    </button>
                  </strong>
                </div>
              </motion.div>
            </div>
          )}
          {/* show email tab end */}

          {/* pay pall code below */}
          {validate(useremail) && showpaypalbuttons && (
            <div
              style={{
                width: "100%",
              }}
            >
              <motion.div
                key="promptemail"
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
                  padding: "30px",
                  width: "100%",
                }}
              >
                {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
                {paypalmsg && (
                  <p style={{ color: paypalmsg.color }}>{paypalmsg.msg}</p>
                )}
                {renderPaypal}
                {tokenEmailLoading && (
                  <div>
                    <Lottie
                      style={{ height: "100px" }}
                      animationData={loadingCircle}
                      loop={true}
                    />
                  </div>
                )}

                <MyButton
                  placeholder="back"
                  onClick={() => {
                    setShowemailtab(true);
                    setShowpaypalbuttons(false);
                    setUseremail(false);
                    setErrMsg("");
                    setMsg("try with another valid email");
                    setPaypalResponse(false);
                    setPaypalMsg("");
                  }}
                />
              </motion.div>
            </div>
          )}
          {/* pay pall code end */}

          {showhometext && (
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
                      transition={{ duration: 0.1, ease: "easeOut" }}
                      exit={{
                        width: "1px",
                        y: "50%",
                        opacity: 0,
                        transition: { duration: 0.2 },
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
                      transition={{ duration: 0.1, ease: "easeOut" }}
                      exit={{
                        width: "1px",
                        y: "50%",
                        opacity: 0,
                        transition: { duration: 0.2 },
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
                      transition={{ duration: 0.1, ease: "easeOut" }}
                      exit={{
                        width: "1px",
                        y: "50%",
                        opacity: 0,
                        transition: { duration: 0.2 },
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
          )}
        </div>

        {showtable && (
          <div style={{ width: "100%" }}>
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
    align-items: space-around;
    justify-content: space-around;
    @media (max-width: 1000px) {
      flex-direction: column;
      display: flex;
      flex-wrap: wrap;
    }

    .otptab > div,
    .showpaypal > div,
    .showemailtab > div {
      flex: 1;
      padding: 10px;
    }

    .input-group {
      width: 100%;
      margin-bottom: 0px;
      display: "flex";
      flex-direction: "column";
      justify-content: "Center";
      align-items: "center";
      padding-top: "30px";
    }
    .input-control::placeholder {
      color: var(--black-dark);
      opacity: 0.8;
      font-weight: 300;
    }
    .input-control {
      display: block;
      min-width: 60%;
      height: 50px;
      border-radius: 25px;
      border: none;
      font-family: inherit;
      font-weight: 400;
      font-size: 16px;
      background-color: var(--white-alpha-25);
      padding: 0 20px;
      color: var(--blue-dark);
      border: 2px solid var(--white-alpha-40);
      transition: border-color 0.3s ease;
    }
    .input-control:focus {
      border-color: var(--white-alpha-40);
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
    border: 1px solid var(--white-alpha-40);
    transition: border-color 0.3s ease;
  }
  .contact-form .input-control:focus {
    border-color: var(--white-alpha-40);
  }
`;

export default SearchSection;
