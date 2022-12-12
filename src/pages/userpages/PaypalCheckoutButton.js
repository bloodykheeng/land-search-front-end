import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

function PaypalCheckoutButton() {
  const [errMsg, setErrMsg] = useState("");
  const [paypalResponse, setPaypalResponse] = useState("");
  const [payername, setPayerName] = useState("");
  return {
    payername,
    paypalResponse,
    setPaypalResponse: (res) => {
      setPaypalResponse(res);
    },
    errMsg,
    setErrMsg: (msg) => {
      setErrMsg(msg);
    },
    renderPaypal: (
      <div>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "1",
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = `${details.payer.name.given_name}, ${details.payer.name.surname}`;
              setPaypalResponse(details);
              setPayerName(name);
              console.log("details after approving a payment : ", details);
              alert(`Transaction completed by ${name}`);
            });
          }}
          onCancel={() => {
            console.log("user canceled transaction");
            setErrMsg("You just canceled the transaction !");
          }}
          onError={(err) => {
            console.log("paypal errr is : ", err);
          }}
        />
      </div>
    ),
  };
}

export default PaypalCheckoutButton;
