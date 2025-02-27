"use client";
import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { enqueueSnackbar } from "notistack";
import { loginAdminService } from "../service/service";
import { useRouter } from "next/navigation";
import RecoverPassword from "./RecoveryDialog";
// import { loginAdmin } from "./handleLoginAdmin";

const Signin = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    values: { email: "admin@gmail.com", password: "admin123" },
  });
  const [showPassword1, setShowPassword1] = useState(false);

  const error: any = errors;

  const [openDialog, setOpenDialog] = useState(false);
  const closeDialog = () => {
    setOpenDialog(false);
  };

  const loginAdmin = async (data: any) => {
    try {
      const res: any = await loginAdminService(data);
      if (res?.error) {
        enqueueSnackbar("Invalid Credentials", {
          variant: "error",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });
      } else {
        enqueueSnackbar(res?.message, {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
        });

        router.push("/admin/dashboard");
      }
    } catch (error) {
      console.log(error, "ERROR WHILE LOGIN");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword1(!showPassword1);
  };

  return (
    <>
      {/* <!-- ===== SignIn Form Start ===== --> */}
      <section className="pb-12.5 pt-32.5 lg:pb-25 lg:pt-45 xl:pb-30 xl:pt-50">
        
        <div className="relative z-1 mx-auto max-w-c-1016 px-7.5 pb-7.5 pt-10 lg:px-15 lg:pt-15 xl:px-20 xl:pt-20">
          <div className="absolute left-0 top-0 -z-1 h-2/3 w-full rounded-lg bg-gradient-to-t from-transparent to-[#dee7ff47] dark:bg-gradient-to-t dark:to-[#252A42]"></div>
          <div className="absolute bottom-17.5 left-0 -z-1 h-1/3 w-full">
            <Image
              src="/images/shape/shape-dotted-light.svg"
              alt="Dotted"
              className="dark:hidden"
              fill
            />
            <Image
              src="/images/shape/shape-dotted-dark.svg"
              alt="Dotted"
              className="hidden dark:block"
              fill
            />
          </div>

          <motion.div
            variants={{
              hidden: {
                opacity: 0,
                y: -20,
              },

              visible: {
                opacity: 1,
                y: 0,
              },
            }}
            initial="hidden"
            whileInView="visible"
            transition={{ duration: 1, delay: 0.1 }}
            viewport={{ once: true }}
            className="animate_top rounded-lg bg-white px-7.5 py-2 pt-7.5 shadow-solid-8 dark:border dark:border-strokedark dark:bg-black xl:px-15 xl:pt-15"
          >
            <h2 className="mb-15 text-center text-3xl font-semibold text-black dark:text-white xl:text-sectiontitle2">
              Login as Admin
            </h2>

            <form onSubmit={handleSubmit(loginAdmin)}>
              <div className="mb-7.5 flex flex-col gap-7.5 lg:mb-22.5 lg:flex-row lg:justify-between lg:gap-14">
                <div className="w-full">
                  <input
                    type="text"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    value={watch("email")}
                    // error={error?.email}
                    className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                  />
                  <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                    {error?.email?.message}
                  </span>
                </div>

                <div className="w-full">
                  <input
                    type={!showPassword1 ? "password" : "text"}
                    placeholder="Password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    value={watch("password")}
                    className="w-full border-b border-stroke !bg-white pb-3.5 focus:border-waterloo focus:placeholder:text-black focus-visible:outline-none dark:border-strokedark dark:!bg-black dark:focus:border-manatee dark:focus:placeholder:text-white"
                  />
                  <span className="ml-1 mt-1 flex items-center text-xs font-medium tracking-wide text-red-500">
                    {error?.password?.message}
                  </span>
                  <div className="mt-4 flex">
                    <input
                      data-hs-toggle-password='{
                        "target": "#hs-toggle-password-with-checkbox"
                      }'
                      id="hs-toggle-password-checkbox"
                      type="checkbox"
                      onClick={handleClickShowPassword}
                      // checked={showPassword1 ? true : false}
                      defaultChecked={showPassword1}
                      className="mt-0.5 shrink-0 rounded border-gray-200 text-blue-600 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-800 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
                    />
                    <label
                      htmlFor="hs-toggle-password-checkbox"
                      className="ms-3 text-sm text-gray-500 dark:text-neutral-400"
                    >
                      Show password
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-10 md:justify-between xl:gap-15">
                <div className="flex flex-wrap gap-4 md:gap-10">
                  {/* <div className="mb-4 flex items-center">
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <span className="group mt-1 flex h-5 min-w-[20px] items-center justify-center rounded border-gray-300 bg-gray-100 text-blue-600 peer-checked:bg-primary dark:border-gray-600 dark:bg-gray-700">
                      <svg
                        className="opacity-0 peer-checked:group-[]:opacity-100"
                        width="10"
                        height="8"
                        viewBox="0 0 10 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M9.70704 0.792787C9.89451 0.980314 9.99983 1.23462 9.99983 1.49979C9.99983 1.76495 9.89451 2.01926 9.70704 2.20679L4.70704 7.20679C4.51951 7.39426 4.26521 7.49957 4.00004 7.49957C3.73488 7.49957 3.48057 7.39426 3.29304 7.20679L0.293041 4.20679C0.110883 4.01818 0.0100885 3.76558 0.0123669 3.50339C0.0146453 3.24119 0.119814 2.99038 0.305222 2.80497C0.490631 2.61956 0.741443 2.51439 1.00364 2.51211C1.26584 2.50983 1.51844 2.61063 1.70704 2.79279L4.00004 5.08579L8.29304 0.792787C8.48057 0.605316 8.73488 0.5 9.00004 0.5C9.26521 0.5 9.51951 0.605316 9.70704 0.792787Z"
                          fill="white"
                        />
                      </svg>
                    </span>
                    <label
                      htmlFor="default-checkbox"
                      className="flex max-w-[425px] cursor-pointer select-none pl-3"
                    >
                      Keep me signed in
                    </label>
                  </div> */}

                  <a
                    onClick={() => setOpenDialog(true)}
                    className="cursor-pointer hover:text-primary"
                  >
                    Forgot Password?
                  </a>
                </div>

                <button
                  aria-label="login with email and password"
                  className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-black px-6 py-3 font-medium text-white duration-300 ease-in-out hover:bg-blackho dark:bg-btndark dark:hover:bg-blackho"
                >
                  Log in
                  <svg
                    className="fill-white"
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.4767 6.16664L6.00668 1.69664L7.18501 0.518311L13.6667 6.99998L7.18501 13.4816L6.00668 12.3033L10.4767 7.83331H0.333344V6.16664H10.4767Z"
                      fill=""
                    />
                  </svg>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
      {/* <!-- ===== SignIn Form End ===== --> */}

      <RecoverPassword open={openDialog} close={closeDialog} />
    </>
  );
};

export default Signin;
