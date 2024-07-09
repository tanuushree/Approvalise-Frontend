'use client';

import React, { useState, useEffect } from "react";
import dynamic from 'next/dynamic';
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface Username {
  username: string;
}

interface FormData {
  title: string;
  description: string;
  approverPath: string[];
}

const Create: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    approverPath: [""],
  });
  const [usernames, setUsernames] = useState<Username[]>([]);
  const [selectedUsernames, setSelectedUsernames] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const fetchUsernames = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/getapprovers");
        if (response.ok) {
          const data = await response.json();
          setUsernames(data || []);
        } else {
          console.error("Failed to fetch usernames:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching usernames:", error);
      }
    };
    console.log("Fetching usernames...");
    fetchUsernames();
  }, []);

  const fetchUserIdByUsername = async (username: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/users/username/${username}/id`);
      if (response.ok) {
        const data = await response.json();
        return data.userId;
      } else {
        console.error("Failed to fetch user ID:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
    console.log("Fetching user ID for username:", username);
    return null;
  };

  const saveFormData = async (updatedFormData: FormData) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/api/applications/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedFormData),
      });
      console.log("Response:", response);
      if (response.ok) {
        const result = await response.json();
        console.log("Form data saved successfully:", result);
        setIsSubmitted(true);
      } else {
        const result = await response.json();
        console.error("Failed to save form data:", response.statusText, result.message);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    }
    console.log("Saving form data:", updatedFormData);
  };

  const handleTextEditorChange = (content: string) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      description: content,
    }));
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      title: e.target.value,
    }));
  };

  const handleAddDropdown = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      approverPath: [...prevFormData.approverPath, ""],
    }));
  };

  const handleDropdownChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    index: number
  ) => {
    const updatedApproverPath = [...formData.approverPath];
    updatedApproverPath[index] = e.target.value;
    setFormData(prevFormData => ({
      ...prevFormData,
      approverPath: updatedApproverPath,
    }));
    setSelectedUsernames([...selectedUsernames, e.target.value]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Data on Submit:", formData);
    const approverPathWithIds = await Promise.all(
      formData.approverPath.map(async (username) => {
        const userId = await fetchUserIdByUsername(username);
        return userId;
      })
    );
    const updatedFormData = {
      ...formData,
      approverPath: approverPathWithIds.filter(id => id !== null) as string[],
    };
    console.log("Updated Form Data with IDs:", updatedFormData);
    await saveFormData(updatedFormData);
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Create" />
      <div className="mx-auto max-w-270">
        {isSubmitted ? (
          <p className="text-xl font-bold text-green-500">Application created successfully.</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-black dark:text-white">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={handleTitleChange}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="textEditor" className="block text-sm font-medium text-black dark:text-white">
                Description
              </label>
              <ReactQuill
                id="textEditor"
                value={formData.description}
                onChange={handleTextEditorChange}
                modules={{
                  toolbar: [
                    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                    [{size: []}],
                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                    [{'list': 'ordered'}, {'list': 'bullet'}, 
                     {'indent': '-1'}, {'indent': '+1'}],
                    ['link', 'image', 'video'],
                    ['clean']
                  ],
                }}
                formats={[
                  'header', 'font', 'size',
                  'bold', 'italic', 'underline', 'strike', 'blockquote',
                  'list', 'bullet', 'indent',
                  'link', 'image', 'video'
                ]}
                className="mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
              />
            </div>

            {formData.approverPath.map((dropdownValue, index) => (
              <div key={index} className="mb-4">
                <label htmlFor={`dropdown-${index}`} className="block text-sm font-medium text-black dark:text-white">
                  Dropdown {index + 1}
                </label>
                <select
                  id={`dropdown-${index}`}
                  value={dropdownValue}
                  onChange={(e) => handleDropdownChange(e, index)}
                  className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary focus:border-primary"
                >
                  <option value="">Select an option</option>
                  {usernames.map((username) => (
                    <option key={username.username} value={username.username}>
                      {username.username}
                    </option>
                  ))}
                </select>
              </div>
            ))}

            <div className="mb-4">
              <button
                type="button"
                onClick={handleAddDropdown}
                className="py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 dark:text-white"
              >
                + Add Dropdown
              </button>
            </div>

            <div className="mb-4">
              <button
                type="submit"
                className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-50 dark:text-white"
              >
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </DefaultLayout>
  );
};

export default Create;
