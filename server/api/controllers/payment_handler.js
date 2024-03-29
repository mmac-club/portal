import fetch from "node-fetch";
import "dotenv/config";
import Payment from  "../models/Payment.js"

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com";


/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 * @see https://developer.paypal.com/api/rest/authentication/
 */
const generateAccessToken = async () => {
  try {
    if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
      throw new Error("MISSING_API_CREDENTIALS");
    }
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
    ).toString("base64");
    const response = await fetch(`${base}/v1/oauth2/token`, {
      method: "POST",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
};

const createOrder = async (cart) => {
    // use the cart information passed from the front-end to calculate the purchase unit details
  // console.log(
  //   "shopping cart information passed from the frontend createOrder() callback:",
  //   cart,
  // );

  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: cart[0].amount,
        },
      },
    ],
  };
  
  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  return handleResponse(response);
};

/**
 * Capture payment for the created order to complete the transaction.
 * @see https://developer.paypal.com/docs/api/orders/v2/#orders_capture
 */
const captureOrder = async (orderID) => {
  // console.log(orderID)
  const accessToken = await generateAccessToken();
  const url = `${base}/v2/checkout/orders/${orderID}/capture`;
  // console.log(url)

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
      // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
      // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
      // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
      // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
    },
  });
  return handleResponse(response);
};

export const order = async (req, res, next) => {
  try {
    // use the cart information passed from the front-end to calculate the order amount detals.
    const { cart } = req.body;
    // console.log(cart)
    const { jsonResponse, httpStatusCode } = await createOrder(cart);
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
};

export const capture = async (req, res, next) => {
  try {
    const orderID  = req.params.id;
    const params = req.body.cart[0];
    console.log(params)
    const { jsonResponse, httpStatusCode } = await captureOrder(orderID);
    console.log(jsonResponse)
    const payResponse = await createPayment({
      uid: params.userId,
      paypal_payer_id: jsonResponse.payer.payer_id,
      transactionId: jsonResponse.id || jsonResponse.debug_id,
      transactionStatus: jsonResponse.status || jsonResponse.name,
      planFor: params.planFor,
      planType: params.planType,
      planStartDate: params.planStartDate,
      planEndDate: params.planEndDate,
      planPrice: params.amount,
      payerEmail: jsonResponse.payer.email_address,
      payerFullName: jsonResponse.purchase_units[0].shipping.name.full_name,
      payerBillingAddress: jsonResponse.purchase_units[0].shipping.address
    })
    res.status(httpStatusCode).json(jsonResponse);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
};
  
async function handleResponse(response) {
  try {
    const jsonResponse = await response.json();
    return {
      jsonResponse,
      httpStatusCode: response.status,
    };
  } catch (err) {
    console.log(err)
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
};

export const createPayment = async (paymentData) => {
  const newPayment = new Payment(paymentData) 
  console.log(newPayment)
  try {
      await newPayment.save()
      console.log("message: Payment has been created.")
  }
  catch(error) {
      console.log("Problem with adding payment")
  }
}

export const get_membership_details_by_id = async (req, res, next) => {
  try {
      const firebase_uid  = req.params.id;
      const user = await Payment.find({ uid : firebase_uid });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } 
  catch (error) {
      next(error);
  }
}

export const get_all_membership = async (req, res, next) => {
  try {
      const user = await Payment.find();
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
  } 
  catch (error) {
      next(error);
  }
}