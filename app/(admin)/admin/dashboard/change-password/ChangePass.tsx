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
} from "@mui/material";
import axios from "axios";
import { register } from "module";
import { useRouter } from "next/navigation";
import { enqueueSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ChangePass = ({ id }: any) => {
  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const submitData = async (data: any) => {
    try {
      const res: any = await axios.put("/api/login/change-password", {
        ...data,
        userId: id,
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
    <Card
      variant="outlined"
      sx={{
        // backgroundColor: "white",
        width: "350px",
        p: 2,
        margin: "auto",
        mt: 10,
      }}
    >
      <Typography variant="body1" fontWeight={"bold"} mb={2}>
        Change Password
      </Typography>
      <form onSubmit={handleSubmit(submitData)}>
        <Stack spacing={2} style={{ textAlign: "left" }}>
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
          <Button
            sx={{ backgroundColor: "red !important" }}
            variant="contained"
            type="submit"
          >
            Change Password
          </Button>
        </Stack>
      </form>
    </Card>
  );
};

export default ChangePass;
