// export default class PaymentHandlerService {
//   API_URL = import.meta.env.VITE_API_URL_DEV;

//   async orderData(selectedPlan, amount, planFor) {
//     const response = await fetch("http://localhost:3000/payment/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         cart: [
//           {
//             id: selectedPlan,
//             amount: amount,
//             planFor: planFor,
//           },
//         ],
//       }),
//     });
//     const orderData = await response.json();
//     if (orderData.id) {
//       return orderData.id;
//     } else {
//       const errorDetail = orderData?.details?.[0];
//       const errorMessage = errorDetail
//         ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
//         : JSON.stringify(orderData);
//       throw new Error(errorMessage);
//     }
//   }
//   async register(data) {
//     console.log(JSON.stringify(data));
//     const response = await fetch(this.API_URL + "/auth/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     console.log(response);
//     const body = await response;
//     let m = body.message;
//     console.log(m);
//     return m;
//   }

//   async get_user_by_id(userId) {
//     const response = await fetch(this.API_URL + "/user/" + userId, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     const body = await response.json();
//     return body; // assuming the response body is the user details
//   }

//   async update_user(firebase_uid, updatedData) {
//     try {
//       const response = await fetch(
//         `${this.API_URL}/user/update/${firebase_uid}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(updatedData),
//         }
//       );
//       console.log(response);
//       if (!response.ok) {
//         throw new Error(`Failed to update user: ${response.statusText}`);
//       }
//       const updatedUser = await response.json();
//       return updatedUser; // Assuming the response body contains the updated user details
//     } catch (error) {
//       throw new Error(`Error updating user: ${error.message}`);
//     }
//   }
// }
