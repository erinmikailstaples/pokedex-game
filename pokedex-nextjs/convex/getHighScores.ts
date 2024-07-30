// convex/getHighScores.ts
import { query } from "./_generated/server";

export default query(async ({ db }) => {
  return await db
    .query("highScores")
    .order("desc", (q) => q.field("score"))
    .take(10);
});

