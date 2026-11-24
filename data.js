// ============================================================
// ALL LEAGUE INFORMATION LIVES IN THIS FILE.
// Edit it, save, and push to GitHub. Standings and stats are
// calculated automatically. See README.md for examples.
// The teams and fixtures below are PLACEHOLDERS: replace them.
// ============================================================
window.LEAGUE = {
  season: "Season 1",

  // Current rosters. To substitute: move the old player into "former"
  // and put the new player in "players". Old stats stay in the results.
  teams: [
    { id: "eclipse",  name: "Team Eclipse",  status: "Active", players: ["EclipseOne", "EclipseTwo"], former: [] },
    { id: "revenant", name: "Team Revenant", status: "Active", players: ["RevA", "RevB"], former: [] },
    { id: "ember",    name: "Team Ember",    status: "Active", players: ["EmberX", "EmberY"], former: [] },
    { id: "vanguard", name: "Team Vanguard", status: "Active", players: ["VanOne", "VanTwo"], former: [] }
  ],

  // Matches not played yet. status: "Scheduled" or "Postponed". date is optional ("" if unknown).
  fixtures: [
    { teamA: "eclipse",  teamB: "revenant", date: "", status: "Scheduled" },
    { teamA: "ember",    teamB: "vanguard", date: "", status: "Scheduled" }
  ],

  // No matches have been played yet. When one is, add it here, for example:
  // { status: "Completed", date: "2026-12-05", teamA: "eclipse", teamB: "revenant", scoreA: 3, scoreB: 2,
  //   players: [
  //     { name: "EclipseOne", team: "eclipse",  kills: 0, deaths: 0, damage: 0, duelsWon: 0, duelsLost: 0 },
  //     { name: "EclipseTwo", team: "eclipse",  kills: 0, deaths: 0, damage: 0, duelsWon: 0, duelsLost: 0 },
  //     { name: "RevA",       team: "revenant", kills: 0, deaths: 0, damage: 0, duelsWon: 0, duelsLost: 0 },
  //     { name: "RevB",       team: "revenant", kills: 0, deaths: 0, damage: 0, duelsWon: 0, duelsLost: 0 }
  //   ] },
  // status "Completed" counts (winner needs exactly 3 rounds, loser 0-2).
  // status "Pending" is saved but ignored everywhere.
  results: []
};
