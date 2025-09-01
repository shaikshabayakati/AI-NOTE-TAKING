import { ConvexVectorStore } from "@langchain/community/vectorstores/convex";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { TaskType } from "@google/generative-ai";
import { action } from "./_generated/server.js";
import { v } from "convex/values";

export const ingest = action({
  args: {
    uploadedpdffile:v.any(),
    fileId:v.string()
  },
  handler: async (ctx,args) => {
    await ConvexVectorStore.fromTexts(
        args.uploadedpdffile,
        {fileId:args.fileId},
        new GoogleGenerativeAIEmbeddings({
        apiKey:"AIzaSyDsv_sbRtEG_u-X-VEA3RmPKUoH6iE_NXM",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
        }),
      { ctx }
    );
  },
});

export const search = action({
  args: {
    query: v.string(),
    fileId:v.string()
  },
  handler: async (ctx, args) => {
    const vectorStore = new ConvexVectorStore(
     new GoogleGenerativeAIEmbeddings({
        apiKey:"AIzaSyDsv_sbRtEG_u-X-VEA3RmPKUoH6iE_NXM",
        model: "text-embedding-004", // 768 dimensions
        taskType: TaskType.RETRIEVAL_DOCUMENT,
        title: "Document title",
        }), { ctx });

    const resultOne = (await vectorStore.similaritySearch(args.query, 1)).filter(q=>q.metadata.fileId==args.fileId);
    console.log(resultOne);

    return JSON.stringify(resultOne)
  },
})
// takes the text and converts into vectors and then stores into convex