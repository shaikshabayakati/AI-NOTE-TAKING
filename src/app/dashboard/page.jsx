"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  // Only run the query when user is loaded and has email
  const fileList = useQuery(
    api.fileupload.GetUserData,
    isLoaded && user?.primaryEmailAddress?.emailAddress
      ? { createdBy: user.primaryEmailAddress.emailAddress }
      : "skip"
  );
  console.log(fileList);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/auth/sign-in");
    }
  }, [user, router, isLoaded]);

  // Show loading state while user is being loaded
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2 className="font-bold text-2xl">Workspace</h2>
      <div className="flex gap-5">
        {fileList === undefined ? (
          <h1>Loading files...</h1>
        ) : fileList.length === 0 ? (
          <h1>No files found yet</h1>
        ) : (
          fileList.map((x) => (
            <div
              className="flex mt-15 flex-col w-55 hover:bg-blue-100 rounded-xl text-center border-6 p-5 justify-between items-center"
              key={x._id}
            >
              <img src="/PDF_LOGO.png" className="h-15 w-15"></img>
              <h2 className="text-2xl break-words max-w-[200px]">
                {x.fileName}
              </h2>

              <Link href={`/workspace/${x.fileId}`}>
                <Button className=" cursor-pointer hover:text-xl">
                  Make Notes
                </Button>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
