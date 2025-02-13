"use client";
import { Box, Card, Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import InquiryTable from "../components/InquiryTable";
import axios from "axios";
import React, { useEffect } from "react";

function Page() {
  const [enquiry, setEnquiry] = React.useState([]);
  const headCell = [
    {
      id: "id",
      label: "#",
    },
    {
      id: "name",
      label: "User Name",
    },
    {
      id: "email",
      label: "Email ID",
    },
    {
      id: "phone_no",
      label: "Mobile No",
    },
    {
      id: "subject",
      label: "Subject",
    },
    {
      id: "message",
      label: "Message",
    },
    {
      id: "action",
      label: "Action",
    },
  ];

  useEffect(() => {
    const getEnquiries = async () => {
      try {
        const res = await axios.get("/api/getMessages");

        console.log(res, "RESPONS");
        setEnquiry(res?.data?.data);
      } catch (error) {
        console.error(error, "ERROR GETTING MESSAGES");
      }
    };
    getEnquiries();
  }, []);

  console.log(enquiry, "enquiry");
  return (
    <Box>
      <Header />
      <Card sx={{ mx:10, my:4, p: 2 }}>
        <Typography variant="h6" color="primary">
          Super Admin Dashboard
        </Typography>
        <InquiryTable rows={enquiry} headCell={headCell} />
      </Card>
    </Box>
  );
}
export default Page;
