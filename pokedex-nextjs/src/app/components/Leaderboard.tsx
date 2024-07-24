import { useQuery, useMutation } from "@/convex/_generated/react";

export default function Leaderboard() {
  const topScores = useQuery("getTopScores") || [];
  const addScore = useMutation("addScore");

  const handleGameOver = async (initials: string, score: number) => {
    await addScore({ initials, score });
  };

  return (
    <div>
      {/* Existing game component */}
      <div className="leaderboard">
        <h2>Top Scores</h2>
        <ul>
          {topScores.map((entry, index) => (
            <li key={index}>{entry.initials}: {entry.score}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}