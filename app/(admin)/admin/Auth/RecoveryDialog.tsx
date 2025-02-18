"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const RecoverPassword = ({ open, close }: any) => {
  const { register, watch, handleSubmit, reset } = useForm();

  const [emailOrUsername, setEmailOrUsername] = useState("");

  const submitHandler = async (data: any) => {
    const res = await axios.post("/api/login/forgotPassword", data);

    if (!res?.data?.error) {
      enqueueSnackbar(res.data?.message, { variant: "success" });
      close();
      reset();
    } else {
      enqueueSnackbar("Something went wrong!", { variant: "error" });
    }
  };

  const isButtonDisabled = !emailOrUsername;

  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>
        <Typography variant="body1" fontWeight={"bold"}>
          Recovery Password
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit(submitHandler)}>
        <DialogContent dividers>
          <Stack spacing={2} style={{ textAlign: "left" }}>
            <label>Enter your email address</label>
            <TextField
              size="small"
              fullWidth
              type="text"
              placeholder="Email"
              value={emailOrUsername}
              {...register("email")}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              required={true}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button sx={{backgroundColor:"primary", color:"#000"}} variant="contained" type="submit" disabled={isButtonDisabled}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RecoverPassword;
