// @ts-nocheck
// "use client";

// import Head from "next/head";
// import styles from "./style.module.css";
// // import * as THREE from "three";
// import Link from "next/link";
// import { useState } from "react";
// // @ts-ignore
// import dynamic from "next/dynamic";
// // @ts-ignore
// import toast, { Toaster } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { login, setUserLogin } from "../../store/userSlice";
// import { useDispatch } from "react-redux";

// // const Earth = dynamic(() => import("@/components/Earth/Earth"), {
// //   ssr: false,
// // });
// // Google Font Montserrat with weight 600 for Latin subset

// const Page = () => {
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const [email, setEmail] = useState("");
//   const [data, setData] = useState({});
//   const [password, setPassword] = useState("");
//   // @ts-ignore
//   const [error, setError] = useState(false);
//   // @ts-ignore
//   const [message, setMessage] = useState(null);
//   const [emailError, setEmailErr] = useState("");
//   const [passwordErr, setPasswordErr] = useState("");

//   // @ts-ignore
//   function isValidEmail(email) {
//     // Regular expression for email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   }

//   // @ts-ignore
//   function isValidPassword(password) {
//     if (password.length >= 8) {
//       return true;
//     }
//   }

//   const validatePage1 = () => {
//     const validEmail = isValidEmail(email);
//     const validPassword = isValidPassword(password);
//     console.log(validEmail, validPassword, "ok");

//     if (!validEmail) {
//       setEmailErr("email is not valid");
//     } else if (email === "") {
//       setEmailErr("*required");
//     } else {
//       setEmailErr("");
//     }

//     if (password == "") {
//       setPasswordErr("*required");
//     } else if (!validPassword) {
//       setPasswordErr("Min 8 character required");
//     } else {
//       setPasswordErr("");
//     }
//     if (validEmail && validPassword) {
//       setError(false);
//       return "ok";
//     } else {
//       setError(true);
//       return "error";
//     }
//   };

//   // @ts-ignore
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("chala");
//     const err = validatePage1();
//     if (err != "error") {
//       try {
//         toast.loading("User login");
//         // @ts-ignore
//         let res = await dispatch(login({ email, password }));
//         dispatch(setUserLogin(true));
//         // let res = await loginUser({ email, password });
//         console.log(res, "ress");
//         // @ts-ignore
//         if (res.payload.message == "success") {
//           // @ts-ignore
//           setMessage("User signed up successfully");
//           setEmail("");
//           setPassword("");
//           // nextPage();
//           toast.dismiss();
//           toast.success("Login success");
//           router.push("/");
//         } else {
//           throw new Error();
//         }
//       } catch (error) {
//         toast.dismiss();
//         toast.error("error while login");
//         // @ts-ignore
//         console.log(error.message, "error ayya");
//       }
//     }
//   };
//   return (
//     <>
//       <Head>
//         <link rel="preconnect" href="https://fonts.googleapis.com" />
//       </Head>
//       <div className={styles.login}>
//         <div className={styles.loginFormContainer}>
//           <form onSubmit={handleSubmit}>
//             <h1>Login</h1>
//             <div className={styles.input}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20px"
//                 height="20px"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   fill="#000"
//                   d="M12 12q-1.65 0-2.825-1.175T8 8q0-1.65 1.175-2.825T12 4q1.65 0 2.825 1.175T16 8q0 1.65-1.175 2.825T12 12m-8 8v-2.8q0-.85.438-1.562T5.6 14.55q1.55-.775 3.15-1.162T12 13q1.65 0 3.25.388t3.15 1.162q.725.375 1.163 1.088T20 17.2V20z"
//                 />
//               </svg>
//               <input
//                 onChange={(e) => setEmail(e.target.value)}
//                 value={email}
//                 type="text"
//                 placeholder="email"
//               />
//             </div>
//             <div className="w-[60%]">
//               {emailError && (
//                 <p className="text-red-500 whitespace=nowrap">{emailError}</p>
//               )}
//             </div>
//             <div className={styles.input}>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20px"
//                 height="20px"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   fill="#000"
//                   d="M6 22q-.825 0-1.412-.587T4 20V10q0-.825.588-1.412T6 8h1V6q0-2.075 1.463-3.537T12 1q2.075 0 3.538 1.463T17 6v2h1q.825 0 1.413.588T20 10v10q0 .825-.587 1.413T18 22zm6-5q.825 0 1.413-.587T14 15q0-.825-.587-1.412T12 13q-.825 0-1.412.588T10 15q0 .825.588 1.413T12 17M9 8h6V6q0-1.25-.875-2.125T12 3q-1.25 0-2.125.875T9 6z"
//                 />
//               </svg>
//               <input
//                 onChange={(e) => setPassword(e.target.value)}
//                 value={password}
//                 type="password"
//                 placeholder="Password"
//               />
//             </div>
//             <div className="w-[60%]">
//               {passwordErr && (
//                 <p className="text-red-500 whitespace=nowrap whitespace=nowrap">
//                   {passwordErr}
//                 </p>
//               )}
//             </div>
//             <div className={styles.rememberMeContainer}>
//               <label className="relative inline-flex gap-3 items-center cursor-pointer">
//                 <input
//                   type="checkbox"
//                   className="sr-only peer border-black"
//                   value="call"
//                   onChange={(e) =>
//                     setData({ ...data, pushIntegration: e.target.value })
//                   }
//                 />
//                 <div className="h-3 w-3 border-[2px] border-black rounded-[20px] peer-checked:bg-black peer-checked:border-[#000] "></div>
//                 <span className="text-sm text-black">Remember me</span>
//               </label>
//               <div>
//                 <a href="#" className="text-sm text-black">
//                   Forgot password?
//                 </a>
//               </div>
//             </div>

//             <button
//               type="submit"
//               className="bg-white w-40 h-10 rounded-3xl text-[#122285] text-sm font-bold mt-[30px]"
//             >
//               Login
//             </button>
//             <Link href={"/signup"}>
//               <p className="text-sm text-black text-center mt-[20px]">
//                 Don{`&apos;`}t have a account? &nbsp;
//                 <span className="underline">SignUp</span>
//               </p>
//             </Link>
//           </form>
//         </div>
//         <div className={styles.earthContainer}>
//           <div className={styles.earthOverlay}>
//             <span></span>
//             <span></span>
//             <span></span>
//             <span></span>
//             <span></span>
//             <img
//               className="h-[80%] w-[90%] rounded-lg"
//               src="bin4.jpeg"
//               alt=""
//             />
//             {/* <Earth /> */}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Page;

"use client";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login, setUserLogin } from "../../store/userSlice";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function Example() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailErr] = useState("");
  const [passwordError, setPasswordErr] = useState("");

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 8;
  }

  const validateForm = () => {
    let valid = true;

    if (!isValidEmail(email)) {
      setEmailErr("Email is not valid");
      valid = false;
    } else {
      setEmailErr("");
    }

    if (!isValidPassword(password)) {
      setPasswordErr("Password must be at least 8 characters long");
      valid = false;
    } else {
      setPasswordErr("");
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        toast.loading("User login");
        // Dispatch login action
        const res = await dispatch(login({ email, password }));
        // Check login response
        if (res.payload.message === "success") {
          // Set user login state
          toast.dismiss();
          toast.success("login sucess");
          dispatch(setUserLogin(true));
          await localStorage.setItem("role", res?.payload?.data?.role);
          const { data, token } = res.payload;

//           Store the token in local storage
          localStorage.setItem('token', token);
          // Redirect to homepage
          if (res?.payload?.data?.role === "user") {
            router.push("/");
          } else {
            router.push("/adminDashboard");
          }
        } else {
          throw new Error("Login failed");
        }
      } catch (error) {
        console.error("Error occurred while logging in:", error);
        toast.dismiss();
        toast.error("invalid credentials");
      }
    }
  };

  return (
    <div>
      <div className="flex min-h-screen  flex-1">
        <div className="flex mt-[5%] h-full flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <Link href={"/"}>
            <p className="text-[28px] font-bold ">Todo Log In</p>
          </Link>
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-8 text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Sign in to your account
              </h2>
            </div>

            <div className="mt-10">
              <div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="email"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {emailError && (
                      <p className="text-red-500 mt-1">{emailError}</p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        placeholder="password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="block px-2 w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    {passwordError && (
                      <p className="text-red-500 mt-1">{passwordError}</p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-3 block text-sm leading-6 text-gray-700"
                      >
                        Remember me
                      </label>
                    </div>

                    {/* <div className="text-sm leading-6">
                      <a
                        href="#"
                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot password?
                      </a>
                    </div> */}
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Sign in
                    </button>
                  </div>
                </form>
                <div className="text-center mt-2">
                  create new account{" "}
                  <a className="text-blue-500" href="/signup">
                    Signup
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1565214975484-3cfa9e56f914?q=80&w=1527&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Ni dikhani jo kr sakta krle"
          />
        </div>
      </div>
    </div>
  );
}
