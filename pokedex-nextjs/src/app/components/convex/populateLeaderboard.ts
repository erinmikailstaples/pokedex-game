// convex/populateLeaderboard.ts
import { mutation } from "./_generated/server";

const initialScores = [
  { initials: "ASH", score: 10 },
  { initials: "MST", score: 09 },
  { initials: "BRK", score: 08 },
  { initials: "JOY", score: 07 },
  { initials: "OAK", score: 06 },
  { initials: "GRY", score: 05 },
  { initials: "MIS", score: 04 },
  { initials: "LNC", score: 03 },
  { initials: "ERI", score: 02 },
  { initials: "RED", score: 01 },
];

export default mutation(async ({ db }) => {
  for (const score of initialScores) {
    await db.insert("leaderboard", score);
  }
  return "Leaderboard populated with initial scores";
});
