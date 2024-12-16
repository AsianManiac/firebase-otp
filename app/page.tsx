"use client";

import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { axios, setBearerToken } from "@/lib/axiosClient";
import { CarProps } from "@/types";
import UserForm from "@/components/forms/UserForm";
import InsuranceForm from "@/components/forms/InsuranceForm";
import UpdateInsuranceForm from "@/components/forms/UpdateInsuranceForm";
import UpdateInsuranceDocForm from "@/components/forms/UpdateInsuranceDocForm";
import NewUserForm from "@/components/forms/NewUser";

export default function Home() {
  const { user } = useAuth();
  // const data = res;
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // const createUser = async () => {
  //   try {
  //     const create = await axios
  //       .post(`/users/create`, {
  //         name: "Home Makde",
  //         phoneNumber: "237677473999",
  //         email: "homemakde@gmail.com",
  //         gender: "M",
  //         country: "cmr",
  //         dateOfBirth: {
  //           day: "12",
  //           month: "06",
  //           year: "2024",
  //         },
  //         coordinates: {
  //           longitude: "123478",
  //           latitude: "123412",
  //           elevation: "12",
  //         },
  //         uid: user?.uid,
  //       })
  //       .then((response) => {
  //         console.log(response);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const getUser = async () => {
    const token = await user?.getIdToken();
    setBearerToken(token);
    const response = await axios
      .get(`/insurance`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/insurance`);
        if (!response) {
          throw new Error("Network response was not ok");
        }
        setData(await response.data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="text-center">
      <h1 className="font-bold text-center mb-5">
        How to Add One-Time Password Phone Authentication
      </h1>
      <Button onClick={getUser}>Get User</Button>
      {/* <UserForm uid={user!.uid} /> */}
      {/* <UpdateInsuranceForm id="6686b4ae79c3a469b3a16df3" /> */}
      {/* <UpdateInsuranceDocForm
        insuranceId="6686b4ae79c3a469b3a16df3"
        documentId="6686b4ae79c3a469b3a16df4"
      /> */}
      {/* <InsuranceForm /> */}
      {/* <Button onClick={createUser} variant={"default"}>
        Create User
      </Button> */}
      <p className="w-[50%]">
        {JSON.stringify(user?.uid, undefined, 2)}
        {/* @ts-ignore */}
        {JSON.stringify(user?.accessToken, undefined, 2)}
        {/* {JSON.stringify(data, undefined, 2)} */}
      </p>

      {user ? (
        <div>
          <h2>Welcome to the App as a logged in as User </h2>
        </div>
      ) : (
        <>
          <h2>You are not logged in</h2>
          <div></div>
        </>
      )}

      {user ? (
        <Button onClick={() => signOut(auth)} className="mt-10">
          Sign out
        </Button>
      ) : (
        <Link href="/login">
          <Button className="mt-10">Sign In</Button>
        </Link>
      )}
    </main>
  );
}
