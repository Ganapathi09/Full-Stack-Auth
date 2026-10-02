
"use client";

import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface UserData {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
}

export default function ProfilePage() {
  const router = useRouter();

  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Get logged-in user details
  const getUserDetails = async () => {
    try {
      setLoading(true);

      const res = await axios.get("/api/users/me");

      console.log(res.data);

      setData(res.data.data);
      toast.success("User details fetched successfully");
    } catch (error: unknown) {
      console.log("Error fetching user:", error);

      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error || "Failed to get user details"
        );

        if (error.response?.status === 401) {
          router.push("/login");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  // Logout
  const logout = async () => {
    try {
      setLogoutLoading(true);

      await axios.get("/api/users/logout");

      toast.success("Logout successful");
      router.push("/login");
    } catch (error: unknown) {
      console.log("Logout failed:", error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.error || "Logout failed");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">

        {/* Profile Heading */}
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-3xl font-bold text-green-700">
            {data?.username?.charAt(0).toUpperCase() || "P"}
          </div>

          <h1 className="text-3xl font-bold text-gray-900">
            Profile
          </h1>

          <p className="mt-2 text-gray-500">
            Welcome to your profile page
          </p>
        </div>

        <hr className="mb-6 border-gray-200" />

        {/* User Details */}
        {data ? (
          <div className="mb-6 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-semibold text-gray-900">
                {data.username}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="break-all font-semibold text-gray-900">
                {data.email}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <Link
                href={`/profile/${data._id}`}
                className="break-all font-medium text-blue-600 hover:underline"
              >
                {data._id}
              </Link>
            </div>

            <div>
              <p className="text-sm text-gray-500">Account Status</p>
              <p className="font-semibold text-gray-900">
                {data.isVerified ? "Verified" : "Not verified"}
              </p>
            </div>
          </div>
        ) : (
          <p className="mb-6 text-center text-gray-500">
            Click below to get your user details.
          </p>
        )}

        {/* Get User Details */}
        <button
          onClick={getUserDetails}
          disabled={loading || logoutLoading}
          className="w-full rounded-lg bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Get User Details"}
        </button>

        {/* Logout */}
        <button
          onClick={logout}
          disabled={logoutLoading || loading}
          className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {logoutLoading ? "Logging out..." : "Logout"}
        </button>

      </div>
    </div>
  );
}

