
window.LEAGUE = {
  season: "Season 1",

  // CURRENT TEAMS
  // For substitutions, move the old player into "former"
  // and add the replacement to "players".
  teams: [
    {
      id: "eclipse",
      name: "Team Eclipse",
      status: "Active",
      players: ["Aesily", "_vicktor"],
      former: []
    },
    {
      id: "revenant",
      name: "Team Revenant",
      status: "Active",
      players: ["ViniJrs", "icypancake"],
      former: ["RevB"]
    }
  ],

  // UPCOMING MATCHES
  // Status: "Scheduled" or "Postponed".
  fixtures: [
    {
      teamA: "eclipse",
      teamB: "revenant",
      date: "",
      status: "Scheduled"
    }
  ],

  // MATCH RESULTS
  // Pending results stay saved but do not count towards
  // standings, points, match history or player statistics.
  // Change to "Completed" when the match has been played.

  results: [
    {
      date: "TBD",
      status: "Pending",
      teamA: "eclipse",
      teamB: "revenant",
      scoreA: 0,
      scoreB: 0,

      players: [
        {
          name: "_vicktor",
          team: "eclipse",
          kills: 0,
          deaths: 0,
          damage: 0,
          duelsWon: 0,
          duelsLost: 0
        },
        {
          name: "Aesily",
          team: "eclipse",
          kills: 0,
          deaths: 0,
          damage: 0,
          duelsWon: 0,
          duelsLost: 0
        },
        {
          name: "ViniJrs",
          team: "revenant",
          kills: 0,
          deaths: 0,
          damage: 0,
          duelsWon: 0,
          duelsLost: 0
        },
        {
          name: "icypancake",
          team: "revenant",
          kills: 0,
          deaths: 0,
          damage: 0,
          duelsWon: 0,
          duelsLost: 0
        }
      ]
    }
  ],

  results: []
};
};
