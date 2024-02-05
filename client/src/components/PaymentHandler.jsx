import React from 'react'
import {  useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

// Renders errors or successfull transactions on the screen.
function Message({ status, message, onClose, openPaymentResponseModal }) {
    console.log(status, message)
    onClose()
    openPaymentResponseModal(status);
    // return status ? <PaymentConfirmation status={status} content={message} onClose={onClose}/> : "";
  }

const PaymentHandler = ({amount, selectedPlan, onClose, openPaymentResponseModal}) => {

    const initialOptions = {
        "client-id": "Ab3clPu_33eKE8Fi5A29tFOyhvrVVsJdXaL4vNqIC1Mxxf7JZhcMkgZdosMzovg9_BkDIlzt-1Kq-Mwn",
        "enable-funding": "paylater,venmo,card",
        "disable-funding": "",
        "data-sdk-integration-source": "integrationbuilder_sc",
    };

    const [message, setMessage] = useState({
        status: "",
        message: ""
    });

    const changeMessage = ({status, message}) => {
        setMessage({status: status, message: message})
        console.log(status, message);
        onClose();
        openPaymentResponseModal(status);
    }

    return (
    <div>
        <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
                style={{
                shape: "rect",
                layout: "vertical",
                }}
                createOrder={async () => {
                try {
                    const response = await fetch("http://localhost:3000/payment/orders", {
                    method: "POST",
                    // mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // use the "body" param to optionally pass additional order information
                    // like product ids and quantities
                    body: JSON.stringify({
                        cart: [
                        {
                            id: selectedPlan,
                            amount: amount,
                        },
                        ],
                    }),
                    });

                    const orderData = await response.json();

                    if (orderData.id) {
                    return orderData.id;
                    } else {
                    const errorDetail = orderData?.details?.[0];
                    const errorMessage = errorDetail
                        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                        : JSON.stringify(orderData);

                    throw new Error(errorMessage);
                    }
                } catch (error) {
                    console.error(error);
                    changeMessage({
                    status: "Failed",
                    message: `Could not initiate PayPal Checkout...${error}`  
                    })
                }
                }}
                onApprove={async (data, actions) => {
                try {
                    const response = await fetch(
                        `http://localhost:3000/payment/orders/${data.orderID}/capture`,
                        {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                            },
                        },
                    );

                    const orderData = await response.json();
                    // Three cases to handle:
                    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    //   (2) Other non-recoverable errors -> Show a failure message
                    //   (3) Successful transaction -> Show confirmation or thank you message

                    const errorDetail = orderData?.details?.[0];

                    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                    // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                    // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                        // return actions.restart();
                        throw new Error(
                            `${errorDetail.description} (${orderData.debug_id})`,
                        );
                    } else if (errorDetail) {
                    // (2) Other non-recoverable errors -> Show a failure message
                        throw new Error(
                            `${errorDetail.description} (${orderData.debug_id})`,
                        );
                    } else {
                    // (3) Successful transaction -> Show confirmation or thank you message
                    // Or go to another URL:  actions.redirect('thank_you.html');
                        const transaction =
                            orderData.purchase_units[0].payments.captures[0];
                            changeMessage({
                            status: "Successful",
                            message: `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`  
                        })
                        console.log(
                            "Capture result",
                            orderData,
                            JSON.stringify(orderData, null, 2),
                    );
                    }
                    } catch (error) {
                        console.error(error);
                        changeMessage({
                            status: "Failed",
                            message: `Sorry, your transaction could not be processed...${error}`  
                        })
                }
                }}
            />
        </PayPalScriptProvider>
        {/* if message.status ? <Message {...message} onClose={onClose} openPaymentResponseModal={openPaymentResponseModal}/> */}
    </div>
    );
}

export default PaymentHandler