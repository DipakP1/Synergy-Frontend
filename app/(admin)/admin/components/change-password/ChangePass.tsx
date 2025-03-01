"use client";

import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  Box,
  Typography,
  Stack,
  TextField,
  Button,
  IconButton,
  InputAdornment,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import axios from "axios";
import { register } from "module";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ENV = process.env.NEXT_PUBLIC_BACKEND_URL;

const ChangePass = ({ email, open, close, TOKEN }: any) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const submitData = async (data: any) => {
    try {
      const res = await axios.put(
        `${ENV}/api/login/change-password`,
        {
          ...data,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        },
      );

      console.log(res, "RES");
      if (res && res?.data && !res?.data?.error) {
        enqueueSnackbar(res?.data?.message, { variant: "success" });
        reset();
        close();
        router.push("/admin/login");
      } else {
        enqueueSnackbar(res?.data?.message || "Something went wrong", {
          variant: "error",
        });
      }
    } catch (error) {
      console.error("Error changing password:", error);
      enqueueSnackbar(error?.response?.data.message, { variant: "error" });
    }
  };

  const handleClickShowPassword1 = () => {
    setShowPassword1(!showPassword1);
  };
  const handleClickShowPassword2 = () => {
    setShowPassword2(!showPassword2);
  };
  const handleClickShowPassword3 = () => {
    setShowPassword3(!showPassword3);
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent dividers sx={{ width: "450px" }}>
        <form onSubmit={handleSubmit(submitData)}>
          <Stack spacing={2}>
            <TextField
              size="small"
              type={!showPassword1 ? "password" : "text"}
              placeholder="Current password"
              required={true}
              {...register("currentPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword1}
                      edge="end"
                    >
                      {showPassword1 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="small"
              type={!showPassword2 ? "password" : "text"}
              placeholder="New password"
              required={true}
              {...register("newPassword")}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword2}
                      edge="end"
                    >
                      {showPassword2 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              size="small"
              type={!showPassword3 ? "password" : "text"}
              placeholder="Confirm password"
              {...register("confirmPassword")}
              required={true}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword3}
                      edge="end"
                    >
                      {showPassword3 ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <DialogActions>
            <Button
              sx={{ border: "1px solid red !important", color: "red" }}
              variant="outlined"
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              sx={{ backgroundColor: "green !important" }}
              // color="success"
              variant="contained"
              type="submit"
            >
              Change Password
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePass;
