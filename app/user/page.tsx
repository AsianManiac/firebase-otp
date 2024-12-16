"use client";
import React, { useEffect } from "react";
import NewUserForm from "@/components/forms/NewUser";
import { axios } from "@/lib/axiosClient";

const Userpage = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/");
        if (!response) {
          throw new Error("Network response was not ok");
        }
        console.log(response);
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <NewUserForm />
    </div>
  );
};

export default Userpage;
