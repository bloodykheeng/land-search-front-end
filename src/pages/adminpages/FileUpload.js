import React, { useState, useContext } from "react";
import MyProgress from "../../components/admin-components/Progress";
import Axios from "axios";
import Button from "@mui/material/Button";
import Lottie from "lottie-react";
import Surveyor from "../../lottiefiles/adminlotties/filling.json";
import DataCenter from "../../lottiefiles/adminlotties/datacenter.json";
import { ToastContainer, toast } from "react-toastify";

import AdminContainer from "../../components/admin-components/AdminContainer";
import { isAdminData, isAdminAuth, isAdminSession } from "./AdminAuthContext";
import styled from "styled-components";
import AdminButton from "../../components/admin-components/AdminButton";
import AdminTable from "../../components/admin-components/AdminTable";
import AdminLabel from "../../components/admin-components/AdminLabel";
import { URL } from "../../config";

const FileUpload = () => {
  const { adminData } = useContext(isAdminData);
  const { setAdminAuth } = useContext(isAdminAuth);
  const { setAdminSession } = useContext(isAdminSession);

  const [file, setfile] = useState("");
  const [zipfile, setzipfile] = useState("");
  const [filename, setfilename] = useState("choose file");
  const [zipfilename, setzipfilename] = useState("");
  const [message, setmessage] = useState("");
  const [uploadpercentage, setuploadpercentage] = useState(0);
  const [success, setsuccess] = useState("");
  const [result, setresult] = useState("");

  const onChange = (e) => {
    if (e.target.id === "xcellupload") {
      if (!e.target.files[0]) {
        setmessage("");
      } else {
        setfile(e.target.files[0]);
        //console.log(e.target.files[0])
        // console.log(e.target.files[0].name);
        setfilename(e.target.files[0].name);
        //console.log(e.target.files[0].name.split(".").pop());
      }
    } else if (e.target.id === "zipupload") {
      if (!e.target.files[0]) {
        setmessage("");
      } else {
        setzipfile(e.target.files[0]);
        // console.log(e.target.files[0])
        // console.log(e.target.files[0].name);
        setzipfilename(e.target.files[0].name);
      }
    }
  };

  const onSubmit = async (e) => {
    if (!file || !zipfile) {
      setmessage(
        "please first choose an excell and a geodatabase zip file & then press upload"
      );
      setresult("");
      setshowtable(false);
      console.log("no file set ");
    } else {
      const excelext = filename.split(".").pop();
      const zipext = zipfilename.split(".").pop();
      if (excelext !== "xlsx" || zipext !== "zip") {
        console.log("wrong extensionsnn");
        setsuccess("please first choose the correct files");
      } else {
        setmessage("uploading file");
        // const formdata = new FormData();
        // formdata.append("file",file);
        let data = {
          excelfile: file,
          zipfile: zipfile,
        };

        let url = `${URL}/fileupload`;
        try {
          const res = await Axios.post(url, data, {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (ProgressEvent) => {
              setuploadpercentage(
                parseInt(
                  Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                )
              );
            },
          });

          //clear percentage
          setTimeout(() => {
            setuploadpercentage(0);
            setfile(null);
            setzipfile(null);
          }, 100);

          if (res.data.status === "cookie-failed") {
            setmessage(res.data.auth);
            setAdminAuth(res.data.auth);
            setAdminSession("session expired");
          } else if (res.data.status === "token-failed") {
            setAdminSession("session expired");
            setmessage(res.data.message);
            setAdminAuth(res.data.auth);
          } else {
            setsuccess("files uploaded succesfuly");
            setmessage(null);
            setresult(res.data);
          }

          // const {fileName,filePath} = res.data;
          // console.log(res.data);
          // console.log(fileName);
          // setuploadedfile({fileName,filePath});
        } catch (err) {
          console.log(err);
          toast.error("Server Down");
          if (err.response) {
            if (err.response.status === 500) {
              setmessage("There was a problem with the server");
            } else {
              setmessage(err.response.data.msg);
            }
          } else {
            console.log("error ", err);
          }
          setuploadpercentage(0);
        }
      }
    }
  };

  const [errrows, seterrrows] = useState();
  const [successrows, setsuccessrows] = useState();
  const [showtable, setshowtable] = useState(false);

  const columns = [
    { field: "status", headerName: "status", minWidth: 100, flex: 1 },
    { field: "err", headerName: "Reason", minWidth: 150, flex: 1 },
  ];

  //the function bellow inserts the data into the table when you press on a button in view summary

  const viewsummary = (
    cld,
    rptowner,
    rptneighbour,
    rptwitness,
    rptinspection,
    rptform,
    wrongworksheetname,
    othererrors
  ) => {
    let erows = [],
      srows = [];

    if (cld) {
      //here we get the responses then push them in an array srows then put that array in a usestate variable eg seterrows
      srows.push(cld.CLD_response);
      erows.push(cld.CLD_err);
      setsuccessrows(srows);
      seterrrows(erows);
      setshowtable(true);
    }
    if (rptowner) {
      srows.push(rptowner.rptowner_response);
      erows.push(rptowner.rptowner_err);
      setsuccessrows(srows);
      seterrrows(erows);
      setshowtable(true);
    }
    if (rptneighbour) {
      srows.push(rptneighbour.rptneighbor_response);
      erows.push(rptneighbour.rptneighbor_err);
      setsuccessrows(srows);
      seterrrows(erows);
      setshowtable(true);
    }
    if (rptwitness) {
      srows.push(rptwitness.rptwitness_response);
      erows.push(rptwitness.rptwitness_err);
      setsuccessrows(srows);
      seterrrows(erows);
      setshowtable(true);
    }
    if (rptinspection) {
      srows.push(rptinspection.rptinspection_response);
      erows.push(rptinspection.rptinspection_err);
      setsuccessrows(srows);
      seterrrows(erows);
      setshowtable(true);
    }
    if (rptform) {
      srows.push(rptform.rptform_response);
      erows.push(rptform.rptform_err);
      setsuccessrows(srows);
      seterrrows(erows);
      setshowtable(true);
      console.log("rptform");
    }
    if (
      wrongworksheetname &&
      wrongworksheetname.wrongworksheetname.length > 0
    ) {
      console.log("wrong worksheet name");
      erows.push(wrongworksheetname.wrongworksheetname);
      console.log(
        "testing wrong worksheet names : ",
        wrongworksheetname.wrongworksheetname
      );
      seterrrows(erows);
      setshowtable(true);
    }

    if (othererrors && othererrors.othererrors.length > 0) {
      console.log("othererrors");
      erows.push(othererrors.othererrors);
      console.log("testing other errors : ", othererrors.othererrors);
      seterrrows(erows);
      setshowtable(true);
    }
  };

  return (
    <AdminContainer activeTab="fileupload">
      <UploadContainer>
        <div style={{ width: "100%", marginBottom: "10px" }}>
          <MyProgress percentage={uploadpercentage} />
        </div>
        {success && (
          <p style={{ color: "green", margin: "10px", padding: 0 }}>
            {success}
          </p>
        )}
        {(!file || !zipfile) && <p style={{ color: "red" }}>{message}</p>}
        {/* label and input field for xcel upload */}
        <label htmlFor="xcellupload">
          {file ? (
            <AdminButton style={{ color: "green" }} placeholder={filename} />
          ) : (
            <AdminLabel style={{ color: "red" }} placeholder="Excell File *" />
          )}
        </label>
        <input
          id="xcellupload"
          style={{
            visibility: "hidden",
            margin: "0px",
            padding: "0px",
            lineHeight: 0,
          }}
          type="file"
          onClick={(e) => {
            setfile(null);
            e.target.value = null;
            setsuccess("");
            setresult("");
            setshowtable(false);
          }}
          onChange={onChange}
        />{" "}
        <br />
        {/* label and input field for zip upload */}
        <label htmlFor="zipupload">
          {zipfile ? (
            <AdminButton style={{ color: "green" }} placeholder={zipfilename} />
          ) : (
            <AdminLabel
              style={{ color: "red" }}
              placeholder=" GeoDatabase zip File *"
            />
          )}
        </label>
        <input
          id="zipupload"
          style={{
            visibility: "hidden",
            margin: "0px",
            padding: "0px",
            lineHeight: 0,
          }}
          type="file"
          onClick={(e) => {
            setzipfile(null);
            e.target.value = null;
            setsuccess("");
            setresult("");
            setshowtable(false);
          }}
          onChange={onChange}
        />
        <br />
        <Button onClick={onSubmit} variant="contained">
          Upload_Files
        </Button>
      </UploadContainer>
      <UploadContainer>
        {!result ? (
          <div>
            {" "}
            <strong>Results not yet set</strong>{" "}
            <Lottie
              animationData={DataCenter}
              loop={true}
              style={{ width: "90%" }}
            />{" "}
          </div>
        ) : (
          <div className="result">
            <strong>results set</strong>

            {/* the function below maps the result to display the buttons in show result */}

            {result.map(
              (
                {
                  cld,
                  rptowner,
                  rptneighbour,
                  rptwitness,
                  rptinspection,
                  rptform,
                  wrongworksheetname,
                  othererrors,
                },
                key
              ) => {
                return (
                  <div
                    key={key}
                    style={{
                      borderBottom: "1px solid green",
                      cursor: "pointer",
                    }}
                    className="result-items"
                    onClick={() => {
                      viewsummary(
                        cld,
                        rptowner,
                        rptneighbour,
                        rptwitness,
                        rptinspection,
                        rptform,
                        wrongworksheetname,
                        othererrors
                      );
                    }}
                  >
                    {/* Below we check if a varible is set we display its button */}

                    {cld && (
                      <>
                        <p>
                          Customary_Land_Dermacation__0 total success :{" "}
                          {cld.CLD_response.length}
                        </p>
                        <p>
                          Customary_Land_Dermacation__0 total failure :{" "}
                          {cld.CLD_err.length}
                        </p>
                      </>
                    )}

                    {rptowner && (
                      <>
                        <p>
                          {" "}
                          rptowner_1 total success :{" "}
                          {rptowner.rptowner_response.length}
                        </p>
                        <p>
                          rptowner_1 total failure :{" "}
                          {rptowner.rptowner_err.length}
                        </p>
                      </>
                    )}
                    {rptneighbour && (
                      <>
                        <p>
                          rptneighbor_2 total success :{" "}
                          {rptneighbour.rptneighbor_response.length}
                        </p>
                        <p>
                          rptneighbor_2 total failure :{" "}
                          {rptneighbour.rptneighbor_err.length}
                        </p>
                      </>
                    )}
                    {rptwitness && (
                      <>
                        <p>
                          rptwitness_3 total success :{" "}
                          {rptwitness.rptwitness_response.length}
                        </p>
                        <p>
                          rptwitness_3 total failure :{" "}
                          {rptwitness.rptwitness_err.length}
                        </p>
                      </>
                    )}
                    {rptinspection && (
                      <>
                        <p>
                          rptinspection_4 total success :{" "}
                          {rptinspection.rptinspection_response.length}
                        </p>
                        <p>
                          rptinspection_4 total failure :{" "}
                          {rptinspection.rptinspection_err.length}
                        </p>
                      </>
                    )}
                    {rptform && (
                      <>
                        <p>
                          rptform1_5 total success :{" "}
                          {rptform.rptform_response.length}
                        </p>
                        <p>
                          rptform1_5 total failure :{" "}
                          {rptform.rptform_err.length}
                        </p>
                      </>
                    )}
                    {/* displays the number of wrong worksheet names */}
                    {wrongworksheetname &&
                      wrongworksheetname.wrongworksheetname.length > 0 && (
                        <p>
                          total Number of wrong worksheet names :{" "}
                          {wrongworksheetname.wrongworksheetname.length}
                        </p>
                      )}

                    {othererrors && othererrors.othererrors.length > 0 && (
                      <p>
                        total Number of other errors :{" "}
                        {othererrors.othererrors.length}
                      </p>
                    )}
                  </div>
                );
              }
            )}
          </div>
        )}
      </UploadContainer>

      <TableContainer>
        {showtable && (
          <>
            {" "}
            <h1>Errors</h1> <AdminTable columns={columns} rows={errrows[0]} />{" "}
          </>
        )}
        {!showtable && (
          <Lottie
            style={{ height: "100%" }}
            animationData={Surveyor}
            loop={true}
          />
        )}
      </TableContainer>
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
    </AdminContainer>
  );
};

const UploadContainer = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  width: 40%;
  height: 50%;
  overflow-y: auto;
  overflow-x: hidden;
  background-color: #ffd8d8;
  display: flex;
  align-items: center;
  align-items: center;
  flex-direction: column;
`;
const TableContainer = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 20px;
  margin: 20px;
  border-radius: 10px;
  width: 90%;
  height: 50%;
  overflow-y: hidden;
  overflow-x: hidden;
  background-color: #ffd8d8;
`;

export default FileUpload;
