import React from "react";
import Signin from "../Auth/Signin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const page = () => {
  return (
    <>
      <a href="/">
        <button
          type="button"
          className="ml-4 mt-3 inline-flex items-center rounded-lg bg-blue-950 px-3 py-2 text-center text-sm font-medium text-white hover:bg-blue-900 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <ArrowBackIcon />
          Go back to site
        </button>
      </a>
      <Signin />
    </>
  );
};

export default page;
