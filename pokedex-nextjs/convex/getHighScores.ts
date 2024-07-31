// convex/getHighScores.ts
import { query } from "./_generated/server";

export const getHighScores = query(async ({ db }) => {
  return await db
    .query("highScores")
    .take(10);
});
