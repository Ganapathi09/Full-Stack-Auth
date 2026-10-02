"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUserEmail = async (token: string) => {
    try {
      await axios.post("/api/users/verifyemail", {
        token,
      });

      setVerified(true);
    } catch (error: unknown) {
      setError(true);

      if (axios.isAxiosError(error)) {
        console.log("Verification error:", error.response?.data);
      } else {
        console.log("Verification error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlToken = params.get("token");

    if (urlToken) {
      setToken(urlToken);
      verifyUserEmail(urlToken);
    } else {
      setError(true);
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-2">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center shadow-md">
        <h1 className="mb-6 text-4xl font-bold text-black">
          Verify Email
        </h1>

        {loading && (
          <p className="text-gray-600">
            Verifying your email...
          </p>
        )}

        {verified && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-green-600">
              Email Verified Successfully!
            </h2>

            <p className="mb-6 text-gray-600">
              Your email has been verified. You can now login.
            </p>

            <Link
              href="/login"
              className="rounded-lg bg-black px-6 py-3 text-white hover:bg-gray-800"
            >
              Login
            </Link>
          </div>
        )}

        {error && (
          <div>
            <h2 className="mb-4 text-2xl font-bold text-red-600">
              Verification Failed
            </h2>

            <p className="text-gray-600">
              The verification link is invalid or has expired.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

