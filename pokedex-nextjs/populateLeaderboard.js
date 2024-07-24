const { ConvexHttpClient } = require("convex/browser");

const address = "https://good-mink-792.convex.cloud";
const client = new ConvexHttpClient(address);

client.mutation("populateLeaderboard").then((result) => {
  console.log(result);
});