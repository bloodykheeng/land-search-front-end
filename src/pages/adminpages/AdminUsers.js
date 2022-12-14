import React, { useState, useContext, useEffect } from "react";
import AdminContainer from "../../components/admin-components/AdminContainer";
import AdminTable from "../../components/admin-components/AdminTable";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";

import { GridActionsCellItem } from "@mui/x-data-grid";

import loadingCircle from "../../lottiefiles/adminlotties/loadingCircle.json";

import { normal_admin_column } from "./AdminUsersColumns";

import Axios from "axios";

import { isAdminData, isAdminAuth, isAdminSession } from "./AdminAuthContext";
import { useNavigate } from "react-router-dom";
import { URL } from "../../config";

function AdminUsers() {
  const navigate = useNavigate();
  const { setAdminAuth } = useContext(isAdminAuth);
  const { adminSession, setAdminSession } = useContext(isAdminSession);
  const { adminData, setAdminData } = useContext(isAdminData);

  const [showtable, setshowtable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableRows, setTableRows] = useState();

  useEffect(() => {
    const fetchadmins = async () => {
      setIsLoading(true);

      let url = `${URL}/adminusers`;
      try {
        let res = await Axios.post(url, { withCredentials: true });
        console.log(res.data);
        setIsLoading(false);

        if (res.data.status === "cookie-failed") {
          console.log("admin user cookie failed");
          console.log("admin user cookie set adminsession : ", adminSession);
          console.log(res.data.auth);
          setAdminAuth(res.data.auth);
          setAdminData(null);
          setAdminSession("session expired");
        } else if (res.data.status === "token-failed") {
          console.log("admin user token failed");
          console.log(res.data.message);
          setAdminAuth(res.data.auth);
          setAdminSession("token expired");
          setAdminData(null);
        } else if (res.data.status === "successfull") {
          setTableRows(res.data.data);
          setshowtable(true);
          console.log("succesfully fetched data : ", res.data.data);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error("Server Down");
      }
    };

    fetchadmins();
  }, []);

  // console.log("admin user admin status is : ",adminstatus);

  const getAdminStatus = (id, status) => {
    // console.log("the admin is we want to edit is : ",id);
    // console.log("the admin is status name we want to edit is : ",status);
    let adminid, adminStatusId;
    if (status === "activated") {
      adminid = id;
      adminStatusId = 1;
    } else if (status === "deactivated") {
      adminid = id;
      adminStatusId = 2;
    }
    let adminstatus = { adminid, adminStatusId };
    // setAdminStatus({adminid,adminStatusId});
    //adminStatusMemo();
    const updateadminstatus = async ({ adminid, adminStatusId }) => {
      setIsLoading(true);
      let data = { adminid, adminStatusId };
      let url = `${URL}/updateadminuserstatus`;

      try {
        let res = await Axios.post(url, data, {
          withCredentials: false,
        });
        console.log(res.data);
        setIsLoading(false);

        if (res.data.status === "cookie-failed") {
          console.log("cookie failed");
          console.log(res.data.auth);
          setAdminAuth(res.data.auth);
          setAdminData(false);
          setAdminSession("session expired");
          navigate("/adminlogin");
        } else if (res.data.status === "token-failed") {
          console.log(res.data.message);
          console.log("token failed");
          setAdminAuth(res.data.auth);
          setAdminData(false);
          setAdminSession("session expired");
        } else if (res.data.status === "successfull") {
          setTableRows(res.data.data);
          setshowtable(true);
          console.log("succesfully fetched data : ", res.data.data);
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error("Server Down");
      }
    };

    updateadminstatus(adminstatus);
  };

  let creator_admin_column = [
    { field: "adminId", headerName: "adminid", minWidth: 300 },
    { field: "firstName", headerName: "firstName", minWidth: 300 },
    { field: "lastName", headerName: "lastName", minWidth: 300 },
    { field: "username", headerName: "username", minWidth: 300 },
    { field: "email", headerName: "email", minWidth: 300 },
    {
      field: "dateOfBirth",
      headerName: "dateOfBirth",
      minWidth: 330,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    { field: "phoneNumber", headerName: "phoneNumber", minWidth: 330 },
    { field: "AccountTypeName", headerName: "AccountTypeName", minWidth: 330 },
    {
      field: "statusName",
      headerName: "statusName",
      width: 330,
      type: "singleSelect",
      valueOptions: ["activated", "deactivated"],
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      type: "actions",
      minWidth: 330,
      getActions: ({ row }) => [
        <GridActionsCellItem
          icon={
            <div
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                backgroundColor: "green",
                cursor: "pointer",
              }}
            >
              <strong>update</strong>
            </div>
          }
          label="update"
          onClick={() => getAdminStatus(row.adminId, row.statusName)}
        />,
      ],
    },
  ];

  return (
    <AdminContainer activeTab="adminusers">
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {isLoading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Lottie
                style={{ width: "100%" }}
                animationData={loadingCircle}
                loop={true}
              />
            </div>
          </div>
        )}

        {showtable && adminData.accountTypeName === "creator_admin" && (
          <div style={{ width: "100%", height: "100%", padding: "20px" }}>
            <div style={{ height: "80%", marginBottom: "20px" }}>
              <h2>View Admin Users Table</h2>
              <AdminTable
                columns={creator_admin_column}
                rows={tableRows}
                checkboxSelection={false}
                idcolumn="adminId"
              />
            </div>
            <br />
          </div>
        )}

        {showtable && adminData.accountTypeName === "normal_admin" && (
          <div style={{ width: "100%", height: "100%", padding: "20px" }}>
            <div style={{ height: "80%", marginBottom: "20px" }}>
              <h2>View Admin Users Table</h2>
              <AdminTable columns={normal_admin_column} rows={tableRows} />
            </div>
            <br />
          </div>
        )}
      </div>
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
}

export default AdminUsers;
