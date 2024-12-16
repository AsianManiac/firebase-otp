"use client";

import React, { useEffect, useState } from "react";
import { axios } from "@/lib/axiosClient";
import CarCard from "@/components/CarCard";
interface Data {
  cars: any;
  message?: string;
  status?: string;
}

const InsurancePage = () => {
  const [insurance, setInsurance] = useState<Data | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchInsurance = async () => {
      try {
        const response = await axios.get(
          `/car/insurance-search?companyId=${"667405801eba922fd40acc1f"}`
        ); // Replace with your actual API endpoint
        setInsurance(response.data);
      } catch (err) {
        setError("Failed to load insurance.");
      }
    };
    fetchInsurance();
  }, []);
  const data = insurance?.cars;

  const isEmpty = !Array.isArray(data) || data.length < 1 || !data;
  return (
    <div>
      <p>{JSON.stringify(data, undefined, 2)}</p>
      {!isEmpty ? (
        <section>
          <div className="home__cars-wrapper">
            {data?.map((car) => (
              <CarCard key={car._id} car={car} />
            ))}
          </div>

          {/* <ShowMore
              pageNumber={(searchParams.limit || 10) / 10}
              isNext={(searchParams.limit || 10) > allCars.length}
            /> */}
        </section>
      ) : (
        <div className="home__error-container">
          <h2 className="text-black text-xl font-bold">Oops, no results</h2>
          <p>{data?.message}</p>
        </div>
      )}
    </div>
  );
};

export default InsurancePage;
