

import axios from "axios";

export const loginAdminService = async (payload: any) => {
  try {
    const res = await axios.post(`/api/login`, payload);
    return res.data;
  } catch (error) {
    console.log(error, "ERROR WHILE LOGIN");
    return { error: "Login failed" };
  }
};
