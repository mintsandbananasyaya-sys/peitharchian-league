const D = window.LEAGUE;
const $ = id => document.getElementById(id);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const team = id => D.teams.find(t => t.id === id);
const tn = id => esc(team(id) ? team(id).name : id);
const num = v => Number(v) || 0;
const fmtDate = d => {
  if (!d) return 'Date to be confirmed';
  const x = new Date(d); if (isNaN(x)) return esc(d);
  return x.toLocaleString('en-GB', d.includes('T') ? {dateStyle:'medium', timeStyle:'short'} : {dateStyle:'medium'});
};

// ---- Check data and warn about mistakes ----
const warnings = [], pairs = new Set();
D.results.forEach((r, i) => {
  const label = `Result ${i + 1}`;
  if (!team(r.teamA) || !team(r.teamB)) warnings.push(`${label}: unknown team id.`);
  if (r.teamA === r.teamB) warnings.push(`${label}: a team cannot play itself.`);
  const w = Math.max(r.scoreA, r.scoreB), l = Math.min(r.scoreA, r.scoreB);
  if (w !== 3 || l < 0 || l > 2 || r.scoreA === r.scoreB) warnings.push(`${label}: invalid score ${r.scoreA}–${r.scoreB}. The winner needs exactly 3 rounds and the loser 0, 1 or 2.`);
  const k = [r.teamA, r.teamB].sort().join('|');
  if (pairs.has(k)) warnings.push(`${label}: these two teams have already played each other.`);
  pairs.add(k);
});
$('warnings').innerHTML = warnings.map(w => `<div class="warn">${esc(w)}</div>`).join('');
$('season').textContent = D.season;

const valid = D.results.filter(r => team(r.teamA) && team(r.teamB) && r.teamA !== r.teamB);

// ---- Teams ----
$('teamGrid').innerHTML = D.teams.map(t => `
  <div class="card">
    ${t.status ? `<span class="tag">${esc(t.status)}</span>` : ''}
    <h3>${esc(t.name)}</h3>
    ${t.players.map(p => `<div class="pl">${esc(p)}</div>`).join('')}
    ${t.former && t.former.length ? `<div class="old">Former: ${t.former.map(esc).join(', ')}</div>` : ''}
  </div>`).join('') || '<p class="empty">No teams yet.</p>';

// ---- League table ----
function headToHead(x, y) {
  const r = valid.find(m => (m.teamA === x && m.teamB === y) || (m.teamA === y && m.teamB === x));
  if (!r) return 0;
  const winner = r.scoreA > r.scoreB ? r.teamA : r.teamB;
  return winner === x ? -1 : 1;
}
function standings() {
  const s = {};
  D.teams.forEach(t => s[t.id] = {id: t.id, name: t.name, mp: 0, w: 0, l: 0, pts: 0, rw: 0, rl: 0, dmg: 0});
  valid.forEach(r => {
    const a = s[r.teamA], b = s[r.teamB], aw = r.scoreA > r.scoreB;
    a.mp++; b.mp++;
    a.rw += r.scoreA; a.rl += r.scoreB; b.rw += r.scoreB; b.rl += r.scoreA;
    (aw ? a : b).w++; (aw ? b : a).l++; (aw ? a : b).pts += 3;
    (r.players || []).forEach(p => { if (s[p.team]) s[p.team].dmg += num(p.damage); });
  });
  const list = Object.values(s);
  list.sort((x, y) => (y.pts - x.pts) || ((y.rw - y.rl) - (x.rw - x.rl)) || (y.dmg - x.dmg) || headToHead(x.id, y.id) || x.name.localeCompare(y.name));
  list.forEach((t, i) => {
    const p = list[i - 1];
    t.tie = !!p && p.pts === t.pts && (p.rw - p.rl) === (t.rw - t.rl) && p.dmg === t.dmg && headToHead(p.id, t.id) === 0 && t.mp > 0;
  });
  return list;
}
$('leagueTable').innerHTML = `<thead><tr><th>Pos</th><th>Team</th><th>MP</th><th>W</th><th>L</th><th>Pts</th><th>RW</th><th>RL</th><th>Diff</th><th>Damage</th></tr></thead><tbody>` +
  standings().map((t, i) => `<tr><td>${i + 1}</td><td>${esc(t.name)}${t.tie ? ' <span class="meta">(tied: tiebreaker match needed)</span>' : ''}</td><td>${t.mp}</td><td>${t.w}</td><td>${t.l}</td><td class="pts">${t.pts}</td><td>${t.rw}</td><td>${t.rl}</td><td>${t.rw - t.rl > 0 ? '+' : ''}${t.rw - t.rl}</td><td>${t.dmg}</td></tr>`).join('') + `</tbody>`;

// ---- Upcoming ----
const upcoming = D.fixtures.filter(f => team(f.teamA) && team(f.teamB));
$('fixtureList').innerHTML = upcoming.map(f => `
  <div class="item row"><strong>${tn(f.teamA)} vs ${tn(f.teamB)}</strong>
  <span class="meta">${fmtDate(f.date)} · <span style="color:var(--red2)">${esc(f.status || 'Scheduled')}</span></span></div>`).join('') || '<p class="empty">No upcoming matches yet.</p>';

// ---- Results ----
const sorted = [...valid].sort((a, b) => String(b.date || '').localeCompare(String(a.date || '')));
$('resultList').innerHTML = sorted.map(r => {
  const aw = r.scoreA > r.scoreB;
  const rows = (r.players || []).map(p => `<tr><td class="l">${esc(p.name)}</td><td class="l">${tn(p.team)}</td><td>${num(p.kills)}</td><td>${num(p.deaths)}</td><td>${num(p.damage)}</td><td>${num(p.duelsWon)}</td><td>${num(p.duelsLost)}</td></tr>`).join('');
  return `<details class="item"><summary class="row">
    <span class="score">${tn(r.teamA)} ${aw ? `<b>${r.scoreA}</b>` : r.scoreA}–${aw ? r.scoreB : `<b>${r.scoreB}</b>`} ${tn(r.teamB)}</span>
    <span class="meta">Winner: ${tn(aw ? r.teamA : r.teamB)} · ${fmtDate(r.date)}</span></summary>
    ${rows ? `<div class="scroll"><table><thead><tr><th class="l">Player</th><th class="l">Team</th><th>Kills</th><th>Deaths</th><th>Damage</th><th>Duels won</th><th>Duels lost</th></tr></thead><tbody>${rows}</tbody></table></div>` : '<p class="meta">No player details recorded.</p>'}
  </details>`;
}).join('') || '<p class="empty">No results yet.</p>';

// ---- Player stats (alphabetical, no ranking) ----
const players = {};
valid.forEach(r => (r.players || []).forEach(p => {
  const s = players[p.name] ||= {mp: 0, w: 0, l: 0, k: 0, d: 0, dw: 0, dl: 0, dmg: 0};
  const won = (p.team === r.teamA) === (r.scoreA > r.scoreB);
  s.mp++; won ? s.w++ : s.l++;
  s.k += num(p.kills); s.d += num(p.deaths); s.dw += num(p.duelsWon); s.dl += num(p.duelsLost); s.dmg += num(p.damage);
}));
$('playerTable').innerHTML = `<thead><tr><th class="l">Player</th><th>MP</th><th>W</th><th>L</th><th>Win rate</th><th>Kills</th><th>Deaths</th><th>Duels won</th><th>Duels lost</th><th>Damage</th></tr></thead><tbody>` +
  (Object.keys(players).sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).map(n => {
    const s = players[n];
    return `<tr><td class="l">${esc(n)}</td><td>${s.mp}</td><td>${s.w}</td><td>${s.l}</td><td>${Math.round(s.w / s.mp * 100)}%</td><td>${s.k}</td><td>${s.d}</td><td>${s.dw}</td><td>${s.dl}</td><td>${s.dmg}</td></tr>`;
  }).join('') || '<tr><td colspan="10" class="empty">No player stats yet.</td></tr>') + `</tbody>`;
