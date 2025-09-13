"use client";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Boxes, LayoutPanelTop } from "lucide-react";
import Image from "next/image";
import React from "react";
import UploadDialog from "./dialog";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Sidebar = () => {
  const { user } = useUser();
  return (
    <div className="h-screen p-7 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700">
      <Link href="/">
        <Image
          className=""
          src="/logo.svg"
          height={250}
          width={252}
          alt="logo"
        />
      </Link>
      <div className="flex flex-col justify-center ">
        <UploadDialog></UploadDialog>
      </div>
      <div className="absolute bottom-22 flex flex-col gap-4 w-[80%] p-3">
        <div className="flex gap-3 items-center">
          <UserButton />
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {user ? user.fullName : null}
          </p>
        </div>
        <div className="flex justify-center">
          
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
