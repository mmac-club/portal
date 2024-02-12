export default class PaymentHandlerService {
  API_URL = import.meta.env.VITE_API_URL_DEV;

  async orderData(selectedPlan, amount, planFor) {
    const response = await fetch("http://localhost:3000/payment/orders", {
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
  }

  async get_membership_by_id(userId) {
    console.log(userId)
    const response = await fetch(this.API_URL + "/payment/orders/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    return body; // assuming the response body is the user details
  }
  async get_all_membership() {
    const response = await fetch(this.API_URL + "/payment/orders/members", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const body = await response.json();
    return body; // assuming the response body is the user details
  }
}
