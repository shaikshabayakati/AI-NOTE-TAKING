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
export const DeleteFileEntryDB = mutation({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    // Find the document by fileId first
    const fileDoc = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .first();

    if (fileDoc) {
      // Delete the PDF file document
      await ctx.db.delete(fileDoc._id);
    }

    // Delete all vector embeddings for this file
    const vectorDocs = await ctx.db
      .query("documents")
      .filter((q) => q.eq(q.field("metadata").fileId, args.fileId))
      .collect();

    // Delete each vector embedding document
    for (const vectorDoc of vectorDocs) {
      await ctx.db.delete(vectorDoc._id);
    }

    // Also delete any notes associated with this file
    const notesDocs = await ctx.db
      .query("notes")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();

    for (const noteDoc of notesDocs) {
      await ctx.db.delete(noteDoc._id);
    }
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
