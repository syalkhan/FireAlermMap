"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import FireMap with SSR disabled
const FireMap = dynamic(() => import("./components/FireMap"), { ssr: false });

const Page = () => {
  const [fireData, setFireData] = useState([]);

  useEffect(() => {
    const fetchFireData = async () => {
      try {
        const res = await fetch("/api/fires"); // Adjust API route if needed
        const data = await res.json();
        setFireData(data);
      } catch (error) {
        console.error("Failed to fetch fire data:", error);
      }
    };

    fetchFireData();
  }, []);

  return (
    <div>
      <h1>Forest Fire Alerts</h1>
      <FireMap fireData={fireData} />
    </div>
  );
};

export default Page;
