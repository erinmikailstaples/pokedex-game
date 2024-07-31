// convex/getHighScores.ts
import { query } from "./_generated/server";

export default query(async ({ db }) => {
  return await db
    .query("highScores")
    .order("score", "desc")
    .take(10);
});
