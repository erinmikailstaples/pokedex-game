import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  leaderboard: defineTable({
    initials: v.string(),
    score: v.number(),
  }).index("by_score", ["score"]),
});
