// convex/addHighScore.ts
import { mutation } from "./_generated/server";

export default mutation(
  async ({ db }, { initials, email, score }: { initials: string; email: string; score: number }) => {
    await db.insert("highScores", { initials, email, score });
  }
);

