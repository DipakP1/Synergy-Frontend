"use client";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import axios from "axios";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React from "react";
import { useForm } from "react-hook-form";

const ResetPass = ({ id }: any) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  const submitData = async (data: any) => {
    try {
      const res = await axios.put("/api/login/resetPassword", {
        ...data,
        id: id,
      });

      if (!res?.data?.error) {
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        reset();
        router.push("/admin/login");
      } else {
        enqueueSnackbar("Something went wrong", { variant: "error" });
      }
    } catch (error) {
      console.error(error, "ERROR 500");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "white",
        width: "350px",
        p: 2,
        margin: "auto",
        mt: 10,
      }}
    >
      <Typography variant="body1" fontWeight={"bold"} mb={2}>
        Reset Password
      </Typography>
      <form onSubmit={handleSubmit(submitData)}>
        <Stack spacing={2} style={{ textAlign: "left" }}>
          <TextField
            type="password"
            placeholder="New password"
            required={true}
            {...register("password")}
          />
          <TextField
            type="password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
            required={true}
          />
          <Button
            sx={{ backgroundColor: "red !important" }}
            variant="contained"
            type="submit"
          >
            Change Password
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ResetPass;
