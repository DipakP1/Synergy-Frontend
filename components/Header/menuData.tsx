import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: "/",
  },
  {
    id: 2,
    title: "Product",
    newTab: false,
    path: "/#",
  },

  {
    id: 2.3,
    title: "Solution",
    newTab: false,
    path: "/#",
  },
  {
    id: 3,
    title: "Learning",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Dummy 1",
        newTab: false,
        path: "/#",
      },
      {
        id: 35,
        title: "Dummy 2",
        newTab: false,
        path: "/#",
      },
      {
        id: 34,
        title: "Sign In",
        newTab: false,
        path: "/auth/signin",
      },
      {
        id: 35,
        title: "Sign Up",
        newTab: false,
        path: "/auth/signup",
      },
    ],
  },

  {
    id: 4,
    title: "Company",
    newTab: false,
    path: "/#",
  },
];

export default menuData;
