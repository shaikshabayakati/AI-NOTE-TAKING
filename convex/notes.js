import { v } from 'convex/values'
import { mutation } from './_generated/server'

export const ADDNOTESTODB = mutation({
  args: {
    fileId: v.string(),
    notes: v.any(),
    
  },
  handler: async (ctx, args) => {
    const recordId = await ctx.db.query('notes')
      .filter((q) => q.eq(q.field("fileId"), args.fileId)) // fixed here
      .collect();
    if (recordId?.length == 0) {
      await ctx.db.insert('notes', {
        fileId: args.fileId,
        notes: args.notes,
        
      });
    } else {
      await ctx.db.patch(recordId[0]._id, { notes: args.notes });
    }
  }
});