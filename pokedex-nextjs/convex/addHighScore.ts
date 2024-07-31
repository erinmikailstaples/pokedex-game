// convex/addHighScore.ts

import { mutation } from "./_generated/server"; 

export const addHighScore = mutation(
  async ({ db }, { initials, email, score }: { initials: string; email: string; score: number }) => {
    await db.insert("highScores", { initials, email, score });
  }
);

