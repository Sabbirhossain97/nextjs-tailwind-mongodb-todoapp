"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Loading from "../../../components/Loading";
import { AiFillWarning } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiFillEye } from "react-icons/ai";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [visibility, setVisiblity] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name | email | (password === "")) {
      return;
    } else {
      try {
        setLoading(true);
        await axios
          .post(
            "/api/register",
            {
              name: name,
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
    }
  };

  useEffect(() => {
    if (message?.data === 200) {
      setTimeout(() => {
        router.push("/Login");
      }, 2500);
      toast.success("Registration successfull");
    } else if (message?.data === 404) {
      setTimeout(() => {
        setError("Email already exists!");
      }, 1000);
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
            <form
              className="p-6 space-y-4 md:space-y-6 sm:p-8"
              onSubmit={handleSubmit}
            >
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign up
              </h1>
              <div className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Name
                  </label>
                  <input
                    className=" border border-gray-300 text-gray-500 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-800 dark:border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                    id="name"
                    type="text"
                    onChange={(e) => {
                      setName(e.target.value);
                      setError("");
                    }}
                  />
                </div>
                <div>
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
                      className={`border text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-800 border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                      required
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                      }}
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
                      className={`border  text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-slate-800  border-gray-600 dark:placeholder-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
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
                      className="mt-1 text-sm text-center border border-red-500 text-red-600 flex flex-row justify-center w-full rounded-md p-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ delay: 0.25 }}
                    >
                      <AiFillWarning className="mt-0.5 " />{" "}
                      <span className="ml-1">Email already exists!</span>
                    </motion.p>
                  ) : (
                    ""
                  )}
                </AnimatePresence>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition bg-cyan-600 hover:bg-cyan-700 dark:focus:ring-primary-800"
                >
                  {loading ? <Loading /> : "Create an account"}
                </button>

                <p className="text-sm text-center font-semibold text-gray-500 dark:text-gray-400">
                  Already have an account?{" "}
                  <Link
                    href="/Login"
                    className="font-medium text-primary-600 hover:underline text-cyan-500"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
            {/* <button
              onClick={notify}
              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-2 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition bg-cyan-600 hover:bg-cyan-700 dark:focus:ring-primary-800"
            >
              test
            </button> */}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
