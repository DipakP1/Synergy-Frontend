import React from "react";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import ChangePass from "./ChangePass";

const page = async () => {
  const token: any = (await cookies()).get("token")?.value;
  const decoded = jwtDecode(token);

  const { id } = decoded as any;



  return <ChangePass id={id} />;
};

export default page;
