import { Box, Card, Container, Paper, Typography } from "@mui/material";
import Header from "../components/Header";
import InquiryTable from "../components/InquiryTable";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

const page = async () => {
  const token: any = (await cookies()).get("token")?.value;
  const decoded = jwtDecode(token);
  const userData = decoded as any;

  
  return (
    <Box>
      <Header userData={userData} TOKEN={token} />
      <Container maxWidth="xl">
        <Card sx={{ my: 4, p: 2 }}>
          <Typography variant="h6" color="primary">
            Super Admin Dashboard
          </Typography>
          <InquiryTable />
        </Card>
      </Container>
    </Box>
  );
};
export default page;
