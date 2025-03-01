"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { cookies } from "next/headers";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import Image from "next/image";
import ThemeToggler from "@/components/Header/ThemeToggler";
import ChangePass from "./change-password/ChangePass";
import { Divider } from "@mui/material";

const pages = ["Super Admin", "Dashboard"];

const Header = ({ userData, TOKEN }) => {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null,
  );
  const [open, setOpen] = React.useState(false);

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const closeDialog = () => {
    setOpen(false);
  };
  return (
    <AppBar sx={{ backgroundColor: "#cfd6f959" }} position="static">
      <Container maxWidth="xl">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
          disableGutters
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {/* <AdbIcon
              sx={{
                display: {
                  xs: "none",
                  md: "flex",
                  justifyContent: "space-between",
                },
                mr: 1,
              }}
            /> */}
            <Image
              src={"/images/logo/logo.png"}
              alt="Logo"
              width={100}
              height={100}
            />
            {/* <Typography
              variant="h6"
              noWrap
              component="a"
              href="/admin/dashboard"
              sx={{
                mr: 2,
                display: "flex",
                fontFamily: "monospace",
                fontWeight: 700,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Synergi Solutions
            </Typography> */}
          </Box>

          <Box
            sx={{
              flexGrow: 0,
              display: "flex",
              alignItems: "center",
              gap: 2,
              justifyContent: "space-between",
            }}
          >
            <ThemeToggler />

            <Box ml={2}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/images/user/user-3.png" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <Box my={1} px={2}>
                  <Typography sx={{ textAlign: "center" }}>
                    Welcome,{" "}
                    <span style={{ color: "blue" }}>{userData?.email}</span>
                  </Typography>
                </Box>
                <Divider />
                <MenuItem
                  onClick={() =>
                    // router.push("/admin/dashboard/change-password")
                    setOpen(true)
                  }
                >
                  <Typography sx={{ textAlign: "center" }}>
                    Change Password
                  </Typography>
                </MenuItem>

                <MenuItem
                  onClick={async () => {
                    const res = await axios.post("/api/logout");
                    if (!res.data.error) {
                      enqueueSnackbar(res?.data?.message, {
                        variant: "success",
                      });
                      router.push("/admin/login");
                    } else {
                      enqueueSnackbar(res?.data?.message, { variant: "error" });
                    }
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </Container>

      <ChangePass
        open={open}
        close={closeDialog}
        email={userData?.email}
        TOKEN={TOKEN}
      />
    </AppBar>
  );
};

export default Header;
