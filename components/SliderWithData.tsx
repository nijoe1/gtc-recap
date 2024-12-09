"use client";

import { useEffect, useState } from "react";
import { RecapData, RecapStatus } from "@/lib/types";
import { RecapCarousel } from "@/components/recap-carousel";
import { fetchRecapData } from "@/lib/recap-service";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";
import { dummyRecapData } from "@/lib/dummy-data";

const SliderWithData = ({
  params,
}: {
  params: { address: string; demo?: boolean };
}) => {
  const [status, setStatus] = useState<RecapStatus>("loading");
  const [recapData, setRecapData] = useState<RecapData | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchRecapData(params.address);
        console.log(data);
        console.log("data:", data);
        if (data) {
          setRecapData(data);
          setStatus("success");
        } else {
          setStatus("not-found");
        }
      } catch (error) {
        setStatus("error");
      }
    };

    if (!params.demo) {
      loadData();
    } else {
      setRecapData(dummyRecapData);
      setStatus("success");
    }
  }, [params.address, params.demo]);
  return (
    <>
      {status === "loading" && (
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Loading recap data...</p>
        </div>
      )}

      {status === "not-found" && (
        <div className="max-w-2xl mx-auto">
          <Alert>
            <AlertDescription className="text-center">
              No contribution data found for this address.
              <div className="mt-4">
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  ← Back to Search
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      )}

      {status === "error" && (
        <div className="max-w-2xl mx-auto">
          <Alert variant="destructive">
            <AlertDescription>
              Failed to fetch recap data. Please try again later.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {status === "success" && recapData && (
        <div>
          <h1 className="text-2xl font-bold text-center mb-10">
            {params.demo ? "Preview Demo" : "Gitcoin 2024 Recap"}
          </h1>
          <RecapCarousel data={recapData} />
        </div>
      )}
    </>
  );
};

export default SliderWithData;
