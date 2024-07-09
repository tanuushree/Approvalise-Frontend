"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Container } from "@/components/landing-page/Container";
import { Navbar } from "@/components/landing-page/Navbar";

const AdminAuth: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    setSuccessMessage(null); // Clear previous success message

    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);

        const uploadResponse = await fetch("http://localhost:5000/api/users/register-users", {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("File upload failed");
        }

        setSuccessMessage("Users registered successfully.");
      } else {
        setError("Please select a file to upload");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <>
      <Navbar />
      <Container className="flex justify-center">
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full">
            <div className="max-w-screen-md mx-auto p-4 sm:p-12.5 xl:p-17.5">
              <h2 className="mb-4 mt-0 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Admin Dashboard
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="file">
                    Upload CSV
                  </label>
                  <input
                    id="file"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
                {error && <p className="text-red-500 text-xs italic">{error}</p>}
                {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    Submit
                  </button>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  CSV file should contain the following columns: <br />username, email, password, department, role, hierarchyValue
                </p>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default AdminAuth;
