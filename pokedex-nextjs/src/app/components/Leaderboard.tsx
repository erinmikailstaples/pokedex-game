'use client';

import { useQuery, useMutation } from "convex/react";
import { api } from "@/app/components/convex/_generated/api.js";

export default function Leaderboard() {
    const topScores = useQuery(api.getTopScores) || [];
    const addScore = useMutation(api.addScore);
    

  const handleGameOver = async (initials: string, score: number) => {
    await addScore({ initials, score });
  };

  return (
    <div className="leaderboard">
      <h2>Top Scores</h2>
      <ul>
        {topScores.map((entry, index) => (
          <li key={index}>{entry.initials}: {entry.score}</li>
        ))}
      </ul>
    </div>
  );
}
