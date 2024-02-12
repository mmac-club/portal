import React from 'react'
import {  useState } from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useAuth } from '../services/AuthService/AuthContext';

const PaymentHandler = ({amount, selectedPlan, planFor, planStartDate, planEndDate, planType, onClose, openPaymentResponseModal}) => {
    const API_URL = import.meta.env.VITE_API_URL_DEV;

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
        onClose();
        openPaymentResponseModal(status);
    }

    const {currentUser} = useAuth();

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
                    const response = await fetch(API_URL + "/payment/orders", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        cart: [
                        {
                            id: selectedPlan,
                            amount: amount,
                            planFor: planFor,
                            planType: planType,
                            planStartDate: planStartDate,
                            planEndDate: planEndDate
                        },
                        ],
                    }),
                    });
                    const orderData = await response.json();
                    console.log(orderData)
                    if (orderData.id) {
                    return orderData.id;
                    }
                    else {
                    const errorDetail = orderData?.details?.[0];
                    const errorMessage = errorDetail
                        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                        : JSON.stringify(orderData);
                    throw new Error(errorMessage);
                    }
                } catch (error) {
                    changeMessage({
                    status: "Failed",
                    message: `Could not initiate PayPal Checkout...${error}`  
                    })
                }
                }}
                onApprove={async (data, actions) => {
                try {
                    const response = await fetch(
                        API_URL + `/payment/orders/${data.orderID}/capture`,
                        {
                            method: "POST",
                            headers: {
                            "Content-Type": "application/json",
                            },
                    body: JSON.stringify({
                                cart: [
                                {
                                    id: selectedPlan,
                                    userId: currentUser.uid,
                                    amount: amount,
                                    planFor: planFor,
                                    planType: planType,
                                    planStartDate: planStartDate,
                                    planEndDate: planEndDate
                                },
                                ],
                            })
                        },
                    );

                    const orderData = await response.json();
                    console.log(orderData)
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