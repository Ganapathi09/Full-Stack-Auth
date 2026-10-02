
"use client";

import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [loading, setLoading] = React.useState(false);

  // Disable button if any field is empty
  const buttonDisabled =
    !user.username || !user.email || !user.password;

  const onSignup = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "/api/users/signup",
        user
      );

      console.log("Signup success:", response.data);

      toast.success("Signup successful!");

      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(
          "Signup failed:",
          error.response?.data?.error
        );

        toast.error(
          error.response?.data?.error || "Signup failed"
        );
      } else if (error instanceof Error) {
        console.log("Signup failed:", error.message);
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-2 text-center text-3xl font-bold text-black">
          {loading ? "Processing..." : "Signup"}
        </h1>

        <hr className="mb-6" />

        {/* Username */}
        <label
          htmlFor="username"
          className="mb-1 block text-black"
        >
          Username
        </label>

        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) =>
            setUser({
              ...user,
              username: e.target.value,
            })
          }
          placeholder="Enter username"
          className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-black outline-none placeholder:text-gray-400 focus:border-gray-600"
        />

        {/* Email */}
        <label
          htmlFor="email"
          className="mb-1 block text-black"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
          placeholder="Enter email"
          className="mb-4 w-full rounded-lg border border-gray-300 bg-white p-3 text-black outline-none placeholder:text-gray-400 focus:border-gray-600"
        />

        {/* Password */}
        <label
          htmlFor="password"
          className="mb-1 block text-black"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) =>
            setUser({
              ...user,
              password: e.target.value,
            })
          }
          placeholder="Enter password"
          className="mb-6 w-full rounded-lg border border-gray-300 bg-white p-3 text-black outline-none placeholder:text-gray-400 focus:border-gray-600"
        />

        {/* Signup Button */}
        <button
          onClick={onSignup}
          disabled={buttonDisabled || loading}
          className="mb-4 w-full rounded-lg bg-black p-3 text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading
            ? "Processing..."
            : buttonDisabled
            ? "Fill all fields"
            : "Signup"}
        </button>

        {/* Login Link */}
        <p className="text-center text-black">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

