// path: convex/fileupload.ts

import { mutation, query } from "./_generated/server";
import { v } from "convex/values"; // Make sure 'v' is imported from here

// This is the function for generating the upload URL
export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// This is the function for adding the file to the database
// The 'args' part is the most important here.
export const AddFileEntryDB = mutation({
  args: {
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    fileUrl: v.string(),
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      storageId: args.storageId,
      fileUrl: args.fileUrl,
      fileName: args.fileName,
      createdBy: args.createdBy,
    });
  },
});

export const AddnotestoDB = mutation({
  args: {
    notes: v.string(),
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("notes", {
      notes: args.notes,
      fileId: args.fileId,
    });
  },
});

export const GetUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);

    return url;
  },
});

export const Getfilefromquery = query({
  args: {
    fileId: v.string(), // fixed typo and added ()
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId)) // fixed filter
      .collect();
    return result;
  },
});

// convex/fileupload.js - KEEP THIS VERSION
export const GetUserData = query({
  args: {
    createdBy: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args.createdBy))
      .collect();

    return result;
  },
});
