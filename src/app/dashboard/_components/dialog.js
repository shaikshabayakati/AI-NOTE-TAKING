"use client";
import React, { Children, useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAction, useMutation } from "convex/react";
import { LoaderIcon } from "lucide-react";
import { toast } from "sonner";
import { useUser } from "@clerk/nextjs";
import uuid4 from "uuid4";
import axios from "axios";
import { Embeddings } from "@langchain/core/embeddings";

const UploadDialog = ({ children }) => {
  const generateUploadUrl = useMutation(api.fileupload.generateUploadUrl);
  const [file, setfile] = useState();
  const [open, setopen] = useState(false);
  const AddFileEntryDB = useMutation(api.fileupload.AddFileEntryDB);
  const { user } = useUser();
  const [fileName, setFileName] = useState();
  const GetUrl = useMutation(api.fileupload.GetUrl);
  const documentEmbedding = useAction(api.myAtions.ingest);
  const [loading, setloading] = useState(false);
  const OnFileSelect = async (e) => {
    setfile(e.target.files[0]);
  };
  const Onupload = async () => {
    setloading(true);
    const postUrl = await generateUploadUrl();
    const result = await fetch(postUrl, {
      method: "POST",
      headers: { "Content-Type": file?.type },
      body: file,
    });
    const { storageId } = await result.json();
    console.log(storageId, "<-Storage id");
    const fileId = uuid4();
    const fileUrl = await GetUrl({ storageId });
    const res = await AddFileEntryDB({
      fileId: fileId,
      storageId: storageId,
      fileName: fileName ? fileName : "untitled",
      fileUrl: fileUrl,
      createdBy: user?.primaryEmailAddress?.emailAddress,
    });

    const Apires = await axios.get("/api/pdf-loader?pdfLink=" + fileUrl);

    documentEmbedding({
      uploadedpdffile: Apires.data.results,
      fileId: fileId,
    });

    setloading(false);
    if (loading === false) {
      toast("✅ File has been uploaded");
    }
    setopen(false);
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setopen}>
        <DialogTrigger asChild>
          <Button
            onClick={() => setopen(true)}
            className="cursor-pointer p-5 w-full"
          >
            <span className="text-2xl ">+</span>Upload PDF
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload PDF File</DialogTitle>
            <DialogDescription asChild>
              <div>
                <div className="flex gap-2 pt-10 p-3 rounded-md border">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => OnFileSelect(e)}
                    className="cursor-pointer"
                  />
                </div>
                <div>
                  <label>File Name</label>
                  <Input
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="Example.pdf"
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button onClick={Onupload} className="cursor-pointer w-25">
              {loading ? <LoaderIcon className="animate-spin" /> : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadDialog;
