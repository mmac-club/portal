
export default class UserManagementService {
  API_URL = import.meta.env.VITE_API_URL;

  async register(data) {
    const response = await fetch(this.API_URL + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await response;
    console.log(body)
    let m = body.message;
    return m
  }
}