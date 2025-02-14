import Signup from "@/app/(admin)/admin/Auth/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up Page - Synergi",

  // other metadata
  description: "This is Sign Up page for Startup Pro"
};

export default function Register() {
  return (
    <>
      <Signup />
    </>
  );
}
