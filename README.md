# Peitharchia League: how to run and update it

Plain HTML, CSS and JavaScript. No database, no server, no installs.
Files: `index.html` (page), `style.css` (look), `app.js` (calculations), **`data.js` (your league information, the only file you normally edit)**.

## View it on your computer
Double-click `index.html`. Refresh after every edit to `data.js`.

## Update the league (edit `data.js`)
**Add a team** (copy a line in `teams`, give it a unique lowercase `id`):
`{ id: "ghost", name: "Team Ghost", status: "Active", players: ["PlayerOne","PlayerTwo"], former: [] },`

**Remove a team:** delete its line (and any fixtures/results that use its id).

**Add a fixture** (in `fixtures`, `date` optional, use `""` if unknown):
`{ teamA: "ghost", teamB: "ember", date: "2026-12-10T19:00", status: "Scheduled" },`
Use status `"Postponed"` to postpone. Delete the line once the match is played.

**Add a result** (in `results`): copy an existing block, set both teams, the score (winner must have 3, loser 0-2) and the four players who played. Then delete that match from `fixtures`.

**Substitute a player:** in the team, move the old name from `players` to `former` and add the new name to `players`. Past results keep the old player's name, so their stats stay saved and the new player starts at zero.

**Edit or delete a result:** change or remove its block. Everything recalculates, so there's nothing to fix by hand.

If you enter an invalid score or the same pairing twice, a red warning appears at the top of the page.

Ties: if two teams are level on points, difference and damage, the head-to-head winner goes higher. If it can't be separated, the table shows "tiebreaker match needed".

## Put it online (free)
1. Create a GitHub account and a new repository (e.g. `peitharchia-league`).
2. Upload all four site files (`index.html`, `style.css`, `app.js`, `data.js`) via **Add file → Upload files**, then **Commit**.
3. Go to **Settings → Pages**, set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`, and Save.
4. After a minute your site appears at `https://YOUR-USERNAME.github.io/peitharchia-league/`.

**Updating later:** open `data.js` on GitHub, click the pencil icon, edit, and **Commit changes**. The site updates within a minute or so.

(Render also works: create a **Static Site**, connect the repo, leave the build command empty and set the publish directory to `.`)
