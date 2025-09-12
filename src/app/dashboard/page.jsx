"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();

  const fileList = useQuery(
    api.fileupload.GetUserData,
    user?.primaryEmailAddress?.emailAddress
      ? { createdBy: user.primaryEmailAddress.emailAddress } // Remove v.optional
      : undefined
  );
  console.log(fileList);

  useEffect(() => {
    if (!user) {
      router.push("/auth/sign-in");
    }
  }, [user, router]);

  return (
    <div>
      <h2 className="font-bold text-2xl">Workspace</h2>
      <div className="flex gap-5">
        {fileList ? (
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
        ) : (
          <h1>No file found Yet</h1>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
