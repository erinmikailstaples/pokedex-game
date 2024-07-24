import { query } from "./_generated/server";

export default query(async ({ db }) => {
  return await db
    .query("leaderboard")
    .order("desc")
    .take(10)
    .collect();
});
