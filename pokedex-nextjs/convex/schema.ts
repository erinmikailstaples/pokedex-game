// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  highScores: defineTable({
    initials: v.string(),
    email: v.string(),
    score: v.number(),
  }),
});

