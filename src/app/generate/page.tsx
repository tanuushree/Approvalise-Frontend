'use client';
import React, { useState, useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface Username {
  username: string;
}

interface FormData {
  title: string;
  subject: string;
  description: string;
  approverPath: string[];
}

const Generate: React.FC = () => {
  const [formData, setFormData] = useState({
    title: "",
    subject:"",
    description: "",
    approverPath: [""],
    // file: null as File | null,
    // dropdowns: [{ id: 1, value: "" }],
    // uploads: [{ id: 1, file: null as File | null }]
  });
  const [usernames, setUsernames] = useState<Username[]>([]);
  const [selectedUsernames, setSelectedUsernames] = useState<string[]>([]);

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubjectChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      subject: e.target.value,
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

  const handleGenerate = async () => {
    try {
      const payload = { prompt: formData.title };
      const res = await fetch("http://localhost:5000/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }
  
      const data = await res.json();
      const formattedContent = data.message.replace(/\n/g, "<br/>");
  
      setFormData({
        ...formData,
        description: formattedContent
      });
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  
   

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Generate" />
      <div className="mx-auto max-w-270">
        <form onSubmit={handleSubmit}>
          {/* Input Prompt */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-black dark:text-white">
              Input Prompt
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 dark:text-white"
          >
            Generate
          </button>

          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-black dark:text-white">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.subject}
              onChange={handleSubjectChange}
              className="mt-1 p-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Text Editor */}
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

          {/* Dropdown Boxes */}
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

          {/* Button to Add Dropdown Box */}
          {/* <button
            type="button"
            onClick={handleAddDropdown}
            className="mb-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 dark:text-white"
          >
            + Add Dropdown
          </button> */}
          
          
          {/* Submit Button */}
          {/* <button
            type="submit"
            className="py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-50 dark:text-white"
          >
            Submit
          </button> */}
          {/* Button to Add Dropdown Box */}
        <button type="button"
  onClick={handleAddDropdown}
  className="mb-4 py-2 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50 dark:text-white"
>
  + Add Dropdown
</button>

{/* Submit Button */}
<button
  type="submit"
  className="block py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-opacity-50 dark:text-white mt-4"
>
  Submit
</button>

        </form>
      </div>
    </DefaultLayout>
  );
};

export default Generate;
