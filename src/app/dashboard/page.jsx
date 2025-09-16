"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import React, { useEffect } from "react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Dashboard = () => {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const DeleteFileEntryDB = useMutation(api.fileupload.DeleteFileEntryDB);
  const DeleteFile = async (fileId) => {
    await DeleteFileEntryDB({ fileId });
  };
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

 
  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
        <ThemeToggle />
          <h1 className="text-4xl font-bold text-gray-900 mt-15 dark:text-white mb-2">
            My Workspace
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Upload and manage your PDF documents
          </p>
        </div>

        {/* Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {fileList === undefined ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300 text-lg">
                  Loading your files...
                </p>
              </div>
            </div>
          ) : fileList.length === 0 ? (
            <div className="col-span-full flex items-center justify-center py-12">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400 dark:text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No files yet
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Upload your first PDF to get started
                </p>
              </div>
            </div>
          ) : (
            fileList.map((x) => (
              <div
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-600"
                key={x._id}
              >
                {/* File Icon */}
                <div className="p-6 pb-4">
                  <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                    <img src="/PDF_LOGO.png" className="w-10 h-10" alt="PDF" />
                  </div>

                  {/* File Name */}
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-4 line-clamp-2 min-h-[3.5rem] flex items-center justify-center">
                    {x.fileName}
                  </h3>
                </div>

                {/* Action Buttons */}
                <div className="px-6 pb-6 space-y-3">
                  <Link href={`/workspace/${x.fileId}`} className="block">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-xl transition-colors">
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                      Make Notes
                    </Button>
                  </Link>

                  <Button
                    onClick={() => DeleteFile(x.fileId)}
                    variant="outline"
                    className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 font-medium py-2.5 rounded-xl transition-colors"
                  >
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
