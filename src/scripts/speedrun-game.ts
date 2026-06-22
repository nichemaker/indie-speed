// ============================================================
//  IndieSpeedRun — original speedrun platformer
//  Vanilla canvas, zero deps. Original IP, transfers with sale.
// ============================================================

const STORAGE_KEY = 'isr-game-v1';
const CANVAS_W = 800;
const CANVAS_H = 450;
const GRAVITY = 0.55;
const PLAYER_SPEED = 4.5;
const JUMP_FORCE = -12.5;
const PLAYER_W = 22;
const PLAYER_H = 30;

// ── Types ────────────────────────────────────────────────────

interface Rect { x: number; y: number; w: number; h: number; }
interface Platform extends Rect { color?: string; }
interface Spike extends Rect {}
interface Level {
  name: string;
  platforms: Platform[];
  spikes: Spike[];
  goal: Rect;
  startX: number;
  startY: number;
  bgColor: string;
  hint?: string;
}

// ── Level data ───────────────────────────────────────────────
// Canvas: 800 × 450.  Ground platforms sit at y=390 (60px tall to bottom).
// All coords: top-left origin.

const LEVELS: Level[] = [
  // 1 — First Steps: two gaps, right-to-finish
  {
    name: 'First Steps',
    bgColor: '#0f172a',
    hint: 'Arrow keys / WASD to move, Up/W/Space to jump',
    startX: 30, startY: 340,
    platforms: [
      { x: 0,   y: 390, w: 200, h: 60 },   // ground left
      { x: 260, y: 390, w: 180, h: 60 },   // gap 200-260
      { x: 500, y: 390, w: 300, h: 60 },   // ground right
    ],
    spikes: [],
    goal: { x: 750, y: 358, w: 28, h: 32 },
  },
  // 2 — Step Up: ascending staircase, long-jump skip exists
  {
    name: 'Step Up',
    bgColor: '#0f1a2e',
    hint: 'Tip: long-jump from the first step to skip two platforms',
    startX: 30, startY: 340,
    platforms: [
      { x: 0,   y: 390, w: 160, h: 60 },
      { x: 180, y: 330, w: 120, h: 20 },
      { x: 330, y: 270, w: 120, h: 20 },
      { x: 480, y: 210, w: 120, h: 20 },
      { x: 630, y: 150, w: 170, h: 20 },
    ],
    spikes: [],
    goal: { x: 750, y: 118, w: 28, h: 32 },
  },
  // 3 — The Pit: wide gap, spikes in pit, platform bridge
  {
    name: 'The Pit',
    bgColor: '#1a0f0f',
    hint: 'Spikes at the bottom — fall = restart',
    startX: 30, startY: 340,
    platforms: [
      { x: 0,   y: 390, w: 150, h: 60 },
      { x: 310, y: 320, w: 100, h: 20 },   // mid bridge
      { x: 480, y: 390, w: 320, h: 60 },
    ],
    spikes: [
      { x: 150, y: 420, w: 160, h: 30 },   // pit floor spikes (visual — OOB kills anyway)
    ],
    goal: { x: 750, y: 358, w: 28, h: 32 },
  },
  // 4 — Low Ceiling: platforms high, must crouch-run (auto on low platforms)
  {
    name: 'Low Ceiling',
    bgColor: '#0a1a0a',
    hint: 'Platforms are low — precise landings required',
    startX: 30, startY: 340,
    platforms: [
      { x: 0,   y: 390, w: 120, h: 60 },
      { x: 150, y: 350, w: 80, h: 20 },
      { x: 260, y: 310, w: 80, h: 20 },
      { x: 370, y: 350, w: 80, h: 20 },
      { x: 480, y: 390, w: 80, h: 60 },
      { x: 590, y: 350, w: 80, h: 20 },
      { x: 700, y: 390, w: 100, h: 60 },
    ],
    spikes: [
      { x: 150, y: 420, w: 110, h: 30 },
      { x: 480, y: 420, w: 110, h: 30 },
    ],
    goal: { x: 750, y: 358, w: 28, h: 32 },
  },
  // 5 — Spike Alley: ground run with spike clusters, rhythm-based
  {
    name: 'Spike Alley',
    bgColor: '#1a0f1a',
    hint: 'Keep your rhythm — stop between spikes to reset timing',
    startX: 30, startY: 340,
    platforms: [
      { x: 0,   y: 390, w: 800, h: 60 },  // solid ground
    ],
    spikes: [
      { x: 150, y: 370, w: 40, h: 20 },
      { x: 230, y: 370, w: 40, h: 20 },
      { x: 350, y: 370, w: 60, h: 20 },
      { x: 470, y: 370, w: 40, h: 20 },
      { x: 560, y: 370, w: 80, h: 20 },
      { x: 690, y: 370, w: 40, h: 20 },
    ],
    goal: { x: 750, y: 358, w: 28, h: 32 },
  },
  // 6 — Two Roads: high safe route vs low risky route, both reachable
  {
    name: 'Two Roads',
    bgColor: '#0f0f1a',
    hint: 'High road is safer. Low road is faster — try both.',
    startX: 30, startY: 340,
    platforms: [
      { x: 0,   y: 390, w: 120, h: 60 },   // start
      // High road
      { x: 150, y: 260, w: 100, h: 20 },
      { x: 290, y: 200, w: 100, h: 20 },
      { x: 430, y: 260, w: 100, h: 20 },
      // Low road
      { x: 150, y: 390, w: 80,  h: 60 },
      { x: 300, y: 390, w: 80,  h: 60 },
      { x: 450, y: 390, w: 80,  h: 60 },
      // Merge
      { x: 580, y: 390, w: 220, h: 60 },
    ],
    spikes: [
      { x: 230, y: 370, w: 70, h: 20 },   // low-road gap spikes
      { x: 380, y: 370, w: 70, h: 20 },
    ],
    goal: { x: 750, y: 358, w: 28, h: 32 },
  },
  // 7 — Precision: narrow platforms, large gaps
  {
    name: 'Precision',
    bgColor: '#1a1500',
    hint: 'Narrow platforms — take it slow first, then go fast',
    startX: 30, startY: 340,
    platforms: [
      { x: 0,   y: 390, w: 80, h: 60 },
      { x: 140, y: 350, w: 40, h: 20 },
      { x: 250, y: 310, w: 40, h: 20 },
      { x: 360, y: 270, w: 40, h: 20 },
      { x: 470, y: 230, w: 40, h: 20 },
      { x: 580, y: 270, w: 40, h: 20 },
      { x: 680, y: 310, w: 120, h: 20 },
    ],
    spikes: [],
    goal: { x: 750, y: 278, w: 28, h: 32 },
  },
  // 8 — The Final Run: combines all mechanics
  {
    name: 'The Final Run',
    bgColor: '#0d0d1f',
    hint: 'Everything you learned — now go fast',
    startX: 30, startY: 340,
    platforms: [
      { x: 0,   y: 390, w: 100, h: 60 },
      { x: 160, y: 330, w: 80,  h: 20 },
      { x: 290, y: 390, w: 60,  h: 60 },
      { x: 410, y: 350, w: 60,  h: 20 },
      { x: 520, y: 300, w: 60,  h: 20 },
      { x: 630, y: 250, w: 60,  h: 20 },
      { x: 720, y: 390, w: 80,  h: 60 },
    ],
    spikes: [
      { x: 100, y: 370, w: 60, h: 20 },
      { x: 355, y: 370, w: 55, h: 20 },
      { x: 470, y: 370, w: 50, h: 20 },
    ],
    goal: { x: 752, y: 358, w: 28, h: 32 },
  },
];

// ── localStorage ─────────────────────────────────────────────

interface BestEntry { time: number; date: string; }

function loadBests(): BestEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as BestEntry[]) : [];
  } catch { return []; }
}

function saveBest(time: number): void {
  const bests = loadBests();
  bests.push({ time, date: new Date().toLocaleDateString() });
  bests.sort((a, b) => a.time - b.time);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bests.slice(0, 5)));
  } catch { /* storage full */ }
}

function fmtTime(ms: number): string {
  const m  = Math.floor(ms / 60000);
  const s  = Math.floor((ms % 60000) / 1000);
  const ms3 = Math.floor(ms % 1000);
  return `${m}:${String(s).padStart(2,'0')}.${String(ms3).padStart(3,'0')}`;
}

// ── Game engine ───────────────────────────────────────────────

export function initGame(canvas: HTMLCanvasElement): void {
  const ctx = canvas.getContext('2d')!;

  // ── Input state
  const keys: Record<string, boolean> = {};
  // Touch virtual buttons
  const touch = { left: false, right: false, jump: false };

  window.addEventListener('keydown', e => {
    keys[e.code] = true;
    // Prevent Space/Arrow scroll while game is focused
    if (['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code)) {
      e.preventDefault();
    }
  });
  window.addEventListener('keyup', e => { keys[e.code] = false; });

  // ── Wire touch buttons (if present in DOM)
  function bindTouch(id: string, prop: 'left'|'right'|'jump') {
    const el = document.getElementById(id);
    if (!el) return;
    const on  = () => { touch[prop] = true; };
    const off = () => { touch[prop] = false; };
    el.addEventListener('touchstart', on,  { passive: true });
    el.addEventListener('touchend',   off, { passive: true });
    el.addEventListener('touchcancel',off, { passive: true });
    el.addEventListener('mousedown',  on);
    el.addEventListener('mouseup',    off);
    el.addEventListener('mouseleave', off);
  }
  bindTouch('touch-left',  'left');
  bindTouch('touch-right', 'right');
  bindTouch('touch-jump',  'jump');

  function isLeft()  { return keys['ArrowLeft']  || keys['KeyA'] || touch.left; }
  function isRight() { return keys['ArrowRight'] || keys['KeyD'] || touch.right; }
  function isJump()  { return keys['ArrowUp'] || keys['KeyW'] || keys['Space'] || touch.jump; }

  // ── State
  let levelIndex = 0;
  let runStart   = 0;        // performance.now() when entire run started
  let levelStart = 0;        // performance.now() when current level started
  let gameState: 'playing'|'dead'|'win' = 'playing';
  let deathTimer = 0;        // frames to wait before respawn
  let jumpPressed = false;   // edge-detect for jump

  // ── Player
  const player = { x: 0, y: 0, vx: 0, vy: 0, onGround: false };

  function spawnPlayer() {
    const lvl = LEVELS[levelIndex];
    player.x  = lvl.startX;
    player.y  = lvl.startY;
    player.vx = 0;
    player.vy = 0;
    player.onGround = false;
  }

  function startRun() {
    levelIndex = 0;
    runStart   = performance.now();
    levelStart = runStart;
    gameState  = 'playing';
    spawnPlayer();
  }

  startRun();

  // ── AABB helpers
  function overlaps(a: Rect, b: Rect): boolean {
    return a.x < b.x + b.w && a.x + a.w > b.x &&
           a.y < b.y + b.h && a.y + a.h > b.y;
  }

  // ── Physics update (called every frame)
  function update() {
    if (gameState === 'dead') {
      deathTimer--;
      if (deathTimer <= 0) {
        gameState = 'playing';
        levelStart = performance.now();
        spawnPlayer();
      }
      return;
    }
    if (gameState === 'win') return;

    const lvl = LEVELS[levelIndex];

    // Horizontal movement
    player.vx = 0;
    if (isLeft())  player.vx = -PLAYER_SPEED;
    if (isRight()) player.vx =  PLAYER_SPEED;

    // Jump (edge-trigger: only on fresh press)
    const wantJump = isJump();
    if (wantJump && !jumpPressed && player.onGround) {
      player.vy = JUMP_FORCE;
      player.onGround = false;
    }
    jumpPressed = wantJump;

    // Gravity
    player.vy += GRAVITY;

    // Move X, resolve platforms
    player.x += player.vx;
    player.x  = Math.max(0, Math.min(player.x, CANVAS_W - PLAYER_W));

    const pr: Rect = { x: player.x, y: player.y, w: PLAYER_W, h: PLAYER_H };

    // Move Y, resolve platforms
    player.y += player.vy;
    player.onGround = false;

    for (const plat of lvl.platforms) {
      const p2: Rect = { x: player.x, y: player.y, w: PLAYER_W, h: PLAYER_H };
      if (overlaps(p2, plat)) {
        if (player.vy >= 0) {
          // Landing on top
          player.y  = plat.y - PLAYER_H;
          player.vy = 0;
          player.onGround = true;
        } else {
          // Hitting ceiling
          player.y  = plat.y + plat.h;
          player.vy = 0;
        }
      }
    }

    // Fall off screen = die
    if (player.y > CANVAS_H + 20) die();

    // Spikes
    const pRect: Rect = { x: player.x, y: player.y, w: PLAYER_W, h: PLAYER_H };
    for (const spike of lvl.spikes) {
      if (overlaps(pRect, spike)) { die(); return; }
    }

    // Goal
    if (overlaps(pRect, lvl.goal)) {
      if (levelIndex < LEVELS.length - 1) {
        levelIndex++;
        levelStart = performance.now();
        spawnPlayer();
      } else {
        // Run complete
        const totalTime = performance.now() - runStart;
        saveBest(totalTime);
        gameState = 'win';
        updateLeaderboardDOM();
      }
    }
  }

  function die() {
    gameState  = 'dead';
    deathTimer = 40; // ~0.67s at 60fps
  }

  // ── Draw helpers
  function drawRect(r: Rect, color: string) {
    ctx.fillStyle = color;
    ctx.fillRect(r.x, r.y, r.w, r.h);
  }

  function drawRoundRect(x: number, y: number, w: number, h: number, r: number, color: string) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, r);
    ctx.fill();
  }

  // ── Draw frame
  function draw() {
    const lvl = LEVELS[levelIndex];
    const elapsed = gameState === 'win' ? 0 : performance.now() - runStart;

    // Background
    ctx.fillStyle = lvl.bgColor;
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Platforms
    for (const plat of lvl.platforms) {
      const isGround = plat.y + plat.h >= CANVAS_H;
      ctx.fillStyle = isGround ? '#1e293b' : '#334155';
      ctx.fillRect(plat.x, plat.y, plat.w, plat.h);
      // Top edge highlight
      ctx.fillStyle = '#475569';
      ctx.fillRect(plat.x, plat.y, plat.w, 2);
    }

    // Spikes
    for (const spike of lvl.spikes) {
      // Draw as triangles
      const count = Math.max(1, Math.floor(spike.w / 16));
      const tw = spike.w / count;
      ctx.fillStyle = '#ef4444';
      for (let i = 0; i < count; i++) {
        ctx.beginPath();
        ctx.moveTo(spike.x + i * tw, spike.y + spike.h);
        ctx.lineTo(spike.x + i * tw + tw / 2, spike.y);
        ctx.lineTo(spike.x + (i + 1) * tw, spike.y + spike.h);
        ctx.closePath();
        ctx.fill();
      }
    }

    // Goal (flag)
    drawRoundRect(lvl.goal.x, lvl.goal.y, lvl.goal.w, lvl.goal.h, 4, '#fbbf24');
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 16px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('▶', lvl.goal.x + lvl.goal.w / 2, lvl.goal.y + lvl.goal.h / 2 + 6);

    // Player
    if (gameState !== 'dead') {
      drawRoundRect(player.x, player.y, PLAYER_W, PLAYER_H, 4, '#6366f1');
      // Eyes
      ctx.fillStyle = '#fff';
      ctx.fillRect(player.x + 5,  player.y + 8, 5, 5);
      ctx.fillRect(player.x + 13, player.y + 8, 5, 5);
      ctx.fillStyle = '#1e1b4b';
      ctx.fillRect(player.x + 6,  player.y + 9, 3, 3);
      ctx.fillRect(player.x + 14, player.y + 9, 3, 3);
    }

    // ── HUD
    ctx.textAlign = 'left';
    ctx.font = 'bold 13px monospace';
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, CANVAS_W, 36);

    // Timer
    ctx.fillStyle = '#f8fafc';
    ctx.fillText(fmtTime(elapsed), 10, 22);

    // Level indicator
    ctx.fillStyle = '#94a3b8';
    ctx.textAlign = 'center';
    ctx.fillText(`Level ${levelIndex + 1} / ${LEVELS.length}  —  ${lvl.name}`, CANVAS_W / 2, 22);

    // Hint
    if (lvl.hint) {
      ctx.fillStyle = '#64748b';
      ctx.font = '11px sans-serif';
      ctx.fillText(lvl.hint, CANVAS_W / 2, CANVAS_H - 8);
    }

    // Death flash
    if (gameState === 'dead') {
      ctx.fillStyle = 'rgba(239,68,68,0.25)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      ctx.fillStyle = '#fca5a5';
      ctx.font = 'bold 28px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('✕  Try again', CANVAS_W / 2, CANVAS_H / 2);
    }

    // Win screen
    if (gameState === 'win') {
      const totalTime = loadBests()[0]?.time ?? 0;
      ctx.fillStyle = 'rgba(0,0,0,0.75)';
      ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

      ctx.fillStyle = '#fbbf24';
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.fillText('Run complete!', CANVAS_W / 2, 160);

      const runTime = loadBests().length > 0
        ? loadBests().find(b => b.date === new Date().toLocaleDateString())?.time
          ?? loadBests()[0].time
        : 0;
      ctx.fillStyle = '#f8fafc';
      ctx.font = 'bold 28px monospace';
      ctx.fillText(fmtTime(runTime), CANVAS_W / 2, 220);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px monospace';
      ctx.fillText('Press  Enter  or  R  to play again', CANVAS_W / 2, 280);

      // Best time comparison
      const bests = loadBests();
      if (bests.length > 0) {
        ctx.fillStyle = '#64748b';
        ctx.font = '13px monospace';
        ctx.fillText(`Your best: ${fmtTime(bests[0].time)}`, CANVAS_W / 2, 320);
      }
    }

    ctx.textAlign = 'left'; // reset
  }

  // Replay hotkey
  window.addEventListener('keydown', e => {
    if (gameState === 'win' && (e.code === 'Enter' || e.code === 'KeyR')) {
      startRun();
    }
  });

  // Touch replay button
  document.getElementById('touch-replay')?.addEventListener('click', () => {
    if (gameState === 'win') startRun();
  });

  // ── Main loop
  function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
  }
  loop();
}

// ── Leaderboard DOM update (called after each run)
function updateLeaderboardDOM() {
  const el = document.getElementById('leaderboard-rows');
  if (!el) return;
  const bests = loadBests();
  if (bests.length === 0) {
    el.innerHTML = '<tr><td colspan="3" class="py-2 text-gray-400 text-sm">No runs yet — play to set a time.</td></tr>';
    return;
  }
  el.innerHTML = bests.map((b, i) => `
    <tr class="border-b border-gray-800">
      <td class="py-1.5 pr-4 text-gray-400 text-sm">${i + 1}</td>
      <td class="py-1.5 pr-4 font-mono text-sm text-gray-100">${fmtTime(b.time)}</td>
      <td class="py-1.5 text-sm text-gray-500">${b.date}</td>
    </tr>`
  ).join('');
}

// Export so the page can call it on first render too
export { updateLeaderboardDOM };
