import {
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
} from "@mui/material";
import React from "react";
import RedoOutlinedIcon from "@mui/icons-material/RedoOutlined";

const ViewUserMessage = ({ open, close, selectedUser }: any) => {
  return (
    <Dialog  open={open} onClose={close}>
      <DialogTitle>
        <RedoOutlinedIcon />
        From: {selectedUser?.name}
      </DialogTitle>
      <Divider />
      <DialogContent  dividers>
        <Typography my={2} variant="body1">
          <b>Subject:</b> {selectedUser?.subject}{" "}
        </Typography>
        <Divider />
      </DialogContent>
    </Dialog>
  );
};

export default ViewUserMessage;
