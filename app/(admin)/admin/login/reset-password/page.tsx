import React from "react";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs";
import { useSearchParams } from "next/navigation";
import NextCrypto from "next-crypto";
import ResetPass from "./ResetPass";

const secretKey: any = process.env.SECRET_KEY;

const page = async ({ searchParams }: any) => {
  const id = await searchParams?.id;

  if (!id) {
    return <p>Error: Missing ID in URL</p>;
  }
  const crypto = new NextCrypto(secretKey);


  const decrypted = await crypto.decrypt(id);
  console.log(decrypted, "IDDD");

  return <ResetPass id={decrypted} />;
};

export default page;
