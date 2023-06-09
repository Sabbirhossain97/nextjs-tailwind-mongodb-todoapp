"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { AiFillWarning } from "react-icons/ai";
import Loading from "../../../components/Loading";
import Cookies from "js-cookie";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visibility, setVisiblity] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email | (password === "")) {
      return;
    }
    try {
      setLoading(true);
      await axios
        .post(
          "/api/signin",
          {
            email: email,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((data) => setMessage(data))
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (message?.data.status === 400) {
      setTimeout(() => {
        setError(message?.data.message);
      }, 1000);
    } else if (message?.data.status === 404) {
      setTimeout(() => {
        setError(message?.data.message);
      }, 1000);
      console.log(message);
    } else if (message?.data.status === 200) {
      localStorage.setItem("token", message?.data.token);
      Cookies.set("isLoggedIn", true);
      setTimeout(() => {
        router.push("/Home");
      }, 1500);
      toast.success("Login Successful!");
    }
  }, [message]);

  return (
    <div>
      <Toaster
        toastOptions={{
          duration: 2000,
          style: {
            background: "rgb(30,41,59)",
            color: "gray",
            fontSize: "14px",
          },
        }}
      />
      <section className=" bg-slate-900">
        <motion.div
          className="flex flex-col h-screen w-10/12 md:w-full items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.25 }}
        >
          <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-slate-800/50 border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign In
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div className="">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <div className="relative ">
                    <input
                      type="email"
                      id="email"
                      className="relative border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-800 border-gray-600 placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <AiOutlineMail className="absolute top-3.5 right-2 text-gray-600" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative ">
                    <input
                      type={visibility ? "text" : "password"}
                      id="password"
                      className={`border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-800 border-gray-600
                     dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      required
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setError("");
                      }}
                    />
                    {visibility ? (
                      <AiFillEye
                        onClick={() => setVisiblity(!visibility)}
                        className="cursor-pointer absolute top-3.5 right-2 text-gray-600"
                      />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={() => setVisiblity(!visibility)}
                        className="cursor-pointer absolute top-3.5 right-2 text-gray-600"
                        title="show password"
                      />
                    )}
                  </div>
                </div>
                <AnimatePresence>
                  {error ? (
                    <motion.p
                      className={`mt-1 text-sm text-center border border-red-500 text-red-600 flex flex-row justify-center w-full rounded-md p-2`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.0 }}
                    >
                      <AiFillWarning className="mt-0.5 " />{" "}
                      <span className="ml-1">{error}</span>
                    </motion.p>
                  ) : (
                    ""
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition bg-cyan-600 hover:bg-cyan-700 dark:focus:ring-primary-800"
                  onClick={handleSubmit}
                >
                  {loading ? <Loading /> : "Sign in"}
                </button>
                <p className="text-sm text-center font-semibold text-gray-500 dark:text-gray-400">
                  Didn't have an account?
                  <Link
                    href="/Register"
                    className="font-medium ml-1 text-primary-600 hover:underline text-cyan-500"
                  >
                    Signup
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
