// ============================================================
// ALL LEAGUE INFORMATION LIVES IN THIS FILE.
// Edit it, save, and push to GitHub. Standings and stats are
// calculated automatically. See README.md for examples.
// The teams/results below are SAMPLE DATA: replace them.
// ============================================================
window.LEAGUE = {
  season: "Season 1",

  // Current rosters. To substitute: move the old player into "former"
  // and put the new player in "players". Old stats stay in the results.
  teams: [
    { id: "eclipse",  name: "Team Eclipse",  status: "Active", players: ["Aesily", "_vicktor"], former: [] },
    { id: "revenant", name: "Team Revenant", status: "Active", players: ["ViniJrs", "icypancake"], former: ["RevB"] },
  ],

  // Matches not played yet. status: "Scheduled" or "Postponed". date is optional ("" if unknown).
  fixtures: [
    { teamA: "ember",    teamB: "vanguard", date: "", status: "Scheduled" },
    { teamA: "eclipse",  teamB: "ember",    date: "",                 status: "Scheduled" }
  ],

  // Finished matches. Winner must have 3 rounds, the other 0-2.
  // "players" lists who actually played, so history stays correct after substitutions.
  results: [
    { date: "TBD", teamA: "eclipse", teamB: "revenant", scoreA: 0, scoreB: 0,
      players: [
        { name: "_vicktor", team: "eclipse",  kills: 0, deaths: 0, damage: 0, duelsWon: 0, duelsLost: 0 },
        { name: "Aesily", team: "eclipse",  kills: 0, deaths: 0, damage: 0, duelsWon: 0, duelsLost: 0 },
        { name: "ViniJrs",       team: "revenant", kills: 0, deaths: 0, damage: 0, duelsWon: 0, duelsLost: 0 },
        { name: "icypancake",       team: "revenant", kills: 0, deaths: 0, damage: 0, duelsWon: 0, duelsLost: 0 }
      ] }
  ]
};
