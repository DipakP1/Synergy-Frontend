import Signin from "@/app/(admin)/admin/Auth/Signin";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",

  // other metadata
  description: "This is Login page for"
};

const SigninPage = () => {
  return (
    <>
      <Signin />
    </>
  );
};

export default SigninPage;
