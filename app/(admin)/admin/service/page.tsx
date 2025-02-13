// import axios from "axios";
// import { cookies } from "next/headers";

// export const loginAdminService = async (payload: any) => {
//   console.log(payload, "PAYLOAD");
//   try {
//     const res: any = await axios.post(`/api/login`, payload);

//     (await cookies()).set("token", res?.data?.token);

//     return res.data;
//   } catch (error) {
//     console.log(error, "ERROR WHILE LOGIN");
//   }
// };

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
