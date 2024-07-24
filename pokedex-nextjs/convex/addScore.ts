import { mutation } from "./_generated/server";

export default mutation(
  async ({ db }, { initials, score }: { initials: string; score: number }) => {
    await db.insert("leaderboard", { initials, score });
  }
);
