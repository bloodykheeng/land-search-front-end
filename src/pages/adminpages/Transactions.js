import React, { useState, useContext, useEffect } from "react";
import AdminContainer from "../../components/admin-components/AdminContainer";
import AdminTable from "../../components/admin-components/AdminTable";
import Lottie from "lottie-react";
import { ToastContainer, toast } from "react-toastify";

//import { GridActionsCellItem } from "@mui/x-data-grid";

import loadingCircle from "../../lottiefiles/adminlotties/loadingCircle.json";

//import { normal_admin_column } from "./AdminUsersColumns";

import Axios from "axios";

import { isAdminData, isAdminAuth, isAdminSession } from "./AdminAuthContext";
//import { useNavigate } from "react-router-dom";
//import { URL } from "../../config";

function Transactions() {
  //const navigate = useNavigate();
  const { setAdminAuth } = useContext(isAdminAuth);
  const { adminSession, setAdminSession } = useContext(isAdminSession);
  const { adminData, setAdminData } = useContext(isAdminData);

  const [showtable, setshowtable] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tableRows, setTableRows] = useState();

  useEffect(() => {
    const fetchadmins = async () => {
      setIsLoading(true);

      let url = `/transactions`;
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
          console.log(
            "succesfully fetched transactions data : ",
            res.data.data
          );
        }
      } catch (err) {
        console.log(err);
        setIsLoading(false);
        toast.error("Server Down");
      }
    };

    fetchadmins();
  }, []);

  let creator_admin_column = [
    { field: "id", headerName: "Land Search Id", minWidth: 300 },
    { field: "paypalTxId", headerName: "PayPal Tx Id", minWidth: 300 },
    {
      field: "paypalPayerEmailAddress",
      headerName: "paypal email",
      minWidth: 300,
    },
    { field: "paypalTxStatus", headerName: "Paypal Tx Status", minWidth: 300 },
    { field: "userEmail", headerName: "user email", minWidth: 300 },
    { field: "tokenStatus", headerName: "Token Status", minWidth: 300 },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      minWidth: 330,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "usedDate",
      headerName: "Token UsedDate",
      minWidth: 330,
      type: "dateTime",
      valueGetter: ({ value }) => value && new Date(value),
    },
    {
      field: "paypalTxCurrency",
      headerName: "Paypal Tx Currency",
      minWidth: 300,
    },
    { field: "paypalTxAmount", headerName: "Paypal Tx Amount", minWidth: 300 },
  ];

  return (
    <AdminContainer activeTab="transactions">
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
              <h2>View Transactions</h2>
              <AdminTable
                columns={creator_admin_column}
                rows={tableRows}
                checkboxSelection={false}
                idcolumn="id"
              />
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

export default Transactions;
