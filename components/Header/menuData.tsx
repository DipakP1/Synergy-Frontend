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
    title: "Features",
    newTab: false,
    path: "/#",
  },
  
  {
    id: 2.3,
    title: "Docs",
    newTab: false,
    path: "/#",
  },
  {
    id: 3,
    title: "Pages",
    newTab: false,
    submenu: [
      {
        id: 31,
        title: "Blog Grid",
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
      {
        id: 35,
        title: "Docs",
        newTab: false,
        path: "/#",
      },
      {
        id: 35.1,
        title: "Support",
        newTab: false,
        path: "/#",
      },
      // {
      //   id: 36,
      //   title: "404",
      //   newTab: false,
      //   path: "/",
      // },
    ],
  },

  {
    id: 4,
    title: "Support",
    newTab: false,
    path: "/#",
  },
];

export default menuData;
