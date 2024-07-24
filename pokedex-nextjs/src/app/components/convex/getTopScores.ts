import { query } from "./_generated/server";

export default query(async ({ db }) => {
  return await db
    .query("leaderboard")
    .order("desc", "score")
    .take(10);
});
