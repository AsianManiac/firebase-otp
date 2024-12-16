"use client";
import { axios } from "@/lib/axiosClient";
import { useState } from "react";

const NewUserForm = () => {
  const [user, setUser] = useState({
    name: "",
    phoneNumber: "",
    email: "",
    gender: "",
    country: "",
    dateOfBirth: {
      day: "",
      month: "",
      year: "",
    },
  });
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name.includes("dateOfBirth")) {
      const [field, subField] = name.split(".");
      setUser((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [subField]: value,
        },
      }));
    } else {
      setUser((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      //   await axios.post("http://localhost:4000/api/user/register", user); // Replace with your actual API endpoint
      await axios.post("/user/register", user); // Replace with your actual API endpoint
      setMessage("User created successfully!");
    } catch (err) {
      setError("Failed to create user.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Create User</h2>
      {message && <div className="mb-4 text-green-600">{message}</div>}
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <select
            name="gender"
            value={user.gender}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Country</label>
          <input
            type="text"
            name="country"
            value={user.country}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Avatar</label>
          <input
            type="file"
            name="avatar"
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Date of Birth</label>
          <div className="flex space-x-2">
            <input
              type="text"
              name="dateOfBirth.day"
              value={user.dateOfBirth.day}
              onChange={handleChange}
              placeholder="Day"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="dateOfBirth.month"
              value={user.dateOfBirth.month}
              onChange={handleChange}
              placeholder="Month"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
            <input
              type="text"
              name="dateOfBirth.year"
              value={user.dateOfBirth.year}
              onChange={handleChange}
              placeholder="Year"
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default NewUserForm;
