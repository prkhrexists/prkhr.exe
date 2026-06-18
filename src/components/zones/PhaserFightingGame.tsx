import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';

const WIDTH = 960, HEIGHT = 540;
const GROUND_Y = 420;
const ARENA_LEFT = 90, ARENA_RIGHT = 870;
const MIN_SEP = 78;
const FRAME_W = 36, FRAME_H = 34;
const KO_W = 36, KO_H = 16;

const ATTACK_CFG: Record<string, any> = {
  punch:   { startup: 90,  active: 90,  recovery: 160, damage: 6,  range: 78,  cooldown: 120 },
  kick:    { startup: 160, active: 110, recovery: 220, damage: 10, range: 100, cooldown: 150 },
  special: { startup: 380, active: 140, recovery: 420, damage: 16, range: 0,   cooldown: 300 }
};
const SPECIAL_COST = 40;

const PALETTES = {
  player: { primary: 0x12e8ff, dark: 0x0a4a59, visor: 0xeafcff, accent: 0x00fff2 },
  ai:     { primary: 0xff2bd6, dark: 0x5a0e49, visor: 0xffe7fb, accent: 0xff6bf0 }
};

function buildBody(pose: string, c: any): any[] {
  const head        = { x:13, y:1,  w:8,  h:7,  color:c.primary };
  const visor       = { x:14, y:4,  w:6,  h:2,  color:c.visor };
  const torso       = { x:11, y:8,  w:12, h:11, color:c.primary };
  const torsoShade  = { x:11, y:8,  w:4,  h:11, color:c.dark };
  const chestLight  = { x:16, y:11, w:2,  h:2,  color:c.accent };
  const hips        = { x:11, y:19, w:12, h:3,  color:c.dark };
  const footL       = { x:11, y:30, w:6,  h:2,  color:c.dark };
  const footR       = { x:17, y:30, w:6,  h:2,  color:c.dark };
  const base = [head, visor, torso, torsoShade, chestLight, hips];

  switch (pose) {
    case 'idle':
      return [...base, footL, footR,
        { x:12, y:22, w:4, h:8, color:c.primary },
        { x:18, y:22, w:4, h:8, color:c.primary },
        { x:7,  y:9,  w:3, h:9, color:c.dark },
        { x:24, y:9,  w:3, h:9, color:c.primary }
      ];
    case 'walk_a':
      return [...base, footL, footR,
        { x:10, y:23, w:4, h:7,  color:c.primary },
        { x:20, y:21, w:4, h:9,  color:c.primary },
        { x:8,  y:10, w:3, h:8,  color:c.dark },
        { x:23, y:11, w:3, h:8,  color:c.primary }
      ];
    case 'walk_b':
      return [...base, footL, footR,
        { x:20, y:21, w:4, h:9,  color:c.primary },
        { x:10, y:23, w:4, h:7,  color:c.primary },
        { x:23, y:10, w:3, h:8,  color:c.primary },
        { x:8,  y:11, w:3, h:8,  color:c.dark }
      ];
    case 'punch':
      return [...base, footL, footR,
        { x:10, y:22, w:4, h:8, color:c.primary },
        { x:19, y:22, w:4, h:8, color:c.primary },
        { x:7,  y:10, w:3, h:8, color:c.dark },
        { x:25, y:11, w:9, h:3, color:c.accent }
      ];
    case 'kick':
      return [...base,
        { x:9,  y:21, w:5,  h:11, color:c.dark },
        { x:8,  y:30, w:7,  h:2,  color:c.dark },
        { x:22, y:16, w:12, h:4,  color:c.primary },
        { x:8,  y:11, w:3,  h:7,  color:c.dark },
        { x:22, y:11, w:3,  h:7,  color:c.primary }
      ];
    case 'special_charge':
      return [...base, footL, footR,
        { x:10, y:22, w:4, h:8, color:c.primary },
        { x:20, y:22, w:4, h:8, color:c.primary },
        { x:9,  y:9,  w:3, h:8, color:c.dark },
        { x:22, y:9,  w:3, h:8, color:c.primary },
        { x:26, y:13, r:6, color:c.accent, alpha:0.30, type:'circle' },
        { x:26, y:13, r:3, color:c.accent, alpha:0.95, type:'circle' }
      ];
    case 'special_release':
      return [...base, footL, footR,
        { x:10, y:22, w:4, h:8, color:c.primary },
        { x:20, y:22, w:4, h:8, color:c.primary },
        { x:8,  y:10, w:3, h:7, color:c.dark },
        { x:21, y:10, w:7, h:4, color:c.accent },
        { x:30, y:13, r:7, color:c.accent, alpha:0.25, type:'circle' },
        { x:30, y:13, r:4, color:c.accent, alpha:0.95, type:'circle' }
      ];
    case 'block':
      return [...base, footL, footR,
        { x:12, y:22, w:4, h:8, color:c.primary },
        { x:18, y:22, w:4, h:8, color:c.primary },
        { x:12, y:9,  w:10, h:5, color:c.accent, alpha:0.95 }
      ];
    case 'hurt':
      return [
        { x:10, y:2,  w:8,  h:7,  color:c.primary },
        { x:11, y:5,  w:6,  h:2,  color:c.visor },
        { x:8,  y:9,  w:12, h:11, color:c.primary },
        { x:8,  y:9,  w:5,  h:11, color:c.dark },
        { x:8,  y:20, w:12, h:3,  color:c.dark },
        { x:8,  y:30, w:6,  h:2,  color:c.dark },
        { x:14, y:30, w:6,  h:2,  color:c.dark },
        { x:9,  y:22, w:4,  h:8,  color:c.primary },
        { x:15, y:22, w:4,  h:8,  color:c.primary },
        { x:1,  y:6,  w:3,  h:9,  color:c.dark },
        { x:21, y:6,  w:3,  h:9,  color:c.primary }
      ];
    case 'ko':
      return [
        { x:26, y:6,  w:7,  h:7, color:c.primary },
        { x:27, y:8,  w:4,  h:2, color:c.visor },
        { x:2,  y:8,  w:26, h:6, color:c.primary },
        { x:2,  y:8,  w:10, h:6, color:c.dark },
        { x:4,  y:14, w:6,  h:2, color:c.dark },
        { x:14, y:5,  w:6,  h:2, color:c.dark }
      ];
  }
  return base;
}

function drawRects(g: Phaser.GameObjects.Graphics, rects: any[]) {
  rects.forEach(r => {
    g.fillStyle(r.color, r.alpha === undefined ? 1 : r.alpha);
    if (r.type === 'circle') g.fillCircle(r.x, r.y, r.r);
    else g.fillRect(r.x, r.y, r.w, r.h);
  });
}

const POSES = ['idle','walk_a','walk_b','punch','kick','special_charge','special_release','block','hurt'];

class ArenaScene extends Phaser.Scene {
  roundActive = false;
  gameOver = false;
  projectiles: any[] = [];
  player: any;
  ai: any;
  scan: any;
  bars: any;
  playerLabel: any;
  aiLabel: any;
  barGeom: any;
  vsText: any;
  cursors: any;
  keyA: any;
  keyS: any;
  keyD: any;

  constructor(){ super('ArenaScene'); }

  create() {
    this.roundActive = false;
    this.gameOver = false;
    this.projectiles = [];

    this.bakeTextures();
    this.buildArena();

    this.player = this.makeFighter('player', ARENA_LEFT + 90, PALETTES.player, false, 'YOU');
    this.ai     = this.makeFighter('ai', ARENA_RIGHT - 90, PALETTES.ai, true, 'RIVAL.EXE');
    this.player.facing = 1;
    this.ai.facing = -1;

    this.buildHUD();

    if (this.input && this.input.keyboard) {
      this.cursors = this.input.keyboard.createCursorKeys();
      this.keyA = this.input.keyboard.addKey('A');
      this.keyS = this.input.keyboard.addKey('S');
      this.keyD = this.input.keyboard.addKey('D');
    }

    this.runIntro();
  }

  bakeTextures() {
    const g = this.add.graphics();
    g.setVisible(false);

    ['player','ai'].forEach(k => {
      const key = k as 'player' | 'ai';
      const c = PALETTES[key];
      POSES.forEach(pose => {
        g.clear();
        drawRects(g, buildBody(pose, c));
        g.generateTexture(key + '_' + pose, FRAME_W, FRAME_H);
      });
      g.clear();
      drawRects(g, buildBody('ko', c));
      g.generateTexture(key + '_ko', KO_W, KO_H);

      // energy projectile
      g.clear();
      g.fillStyle(c.primary, 0.25); g.fillCircle(13,13,12);
      g.fillStyle(c.accent, 0.55);  g.fillCircle(13,13,8);
      g.fillStyle(c.accent, 0.95);  g.fillCircle(13,13,4);
      g.fillStyle(0xffffff, 0.9);   g.fillCircle(13,13,2);
      g.generateTexture('orb_' + key, 26, 26);
    });

    // hit spark
    g.clear();
    g.fillStyle(0xffffff, 0.95); g.fillRect(13,1,6,30); g.fillRect(1,13,30,6);
    g.fillStyle(0xfff200, 0.95); g.fillCircle(16,16,7);
    g.generateTexture('hitSpark', 32, 32);

    // shadow
    g.clear();
    g.fillStyle(0x000000, 0.45); g.fillEllipse(30,8,60,16);
    g.generateTexture('shadow', 60, 16);

    g.destroy();
  }

  buildArena() {
    const g = this.add.graphics();
    g.setVisible(false);

    g.fillGradientStyle(0x040016, 0x040016, 0x001226, 0x002a40, 1, 1, 1, 1);
    g.fillRect(0, 0, WIDTH, HEIGHT);

    for (let i = 0; i < 16; i++) {
      const bx = i * 64 - 10;
      const bh = 40 + Math.abs(Math.sin(i * 1.7)) * 110;
      const by = 190 - bh;
      g.fillStyle(0x051428, 0.85);
      g.fillRect(bx, by, 46, bh);
      for (let w = 0; w < 4; w++) {
        if (Math.sin(i * 3 + w * 7) > 0.2) {
          g.fillStyle(0x00eaff, 0.4);
          g.fillRect(bx + 6 + w * 9, by + 8 + (w % 2) * 14, 4, 4);
        }
      }
    }

    const vpX = WIDTH / 2, vpY = GROUND_Y - 150;
    for (let i = -8; i <= 8; i++) {
      g.lineStyle(1, 0x00eaff, 0.14);
      g.beginPath();
      g.moveTo(vpX, vpY);
      g.lineTo(vpX + i * 130, HEIGHT);
      g.strokePath();
    }
    for (let t = 0; t <= 9; t++) {
      const y = vpY + 10 + (HEIGHT - (vpY + 10)) * Math.pow(t / 9, 1.7);
      g.lineStyle(1, 0x00eaff, 0.08 + 0.28 * (t / 9));
      g.beginPath(); g.moveTo(0, y); g.lineTo(WIDTH, y); g.strokePath();
    }

    [50, WIDTH - 50].forEach(x => {
      g.fillStyle(0x00eaff, 0.10); g.fillRect(x - 10, 0, 20, HEIGHT);
      g.fillStyle(0xff2bd6, 0.45); g.fillRect(x - 2, 0, 4, HEIGHT);
    });

    g.fillStyle(0x00eaff, 0.08); g.fillRect(0, GROUND_Y + 2, WIDTH, 26);
    g.fillStyle(0x00eaff, 0.55); g.fillRect(0, GROUND_Y + 12, WIDTH, 4);
    g.fillStyle(0xffffff, 0.85); g.fillRect(0, GROUND_Y + 13, WIDTH, 1);

    g.generateTexture('arenaBG', WIDTH, HEIGHT);
    g.destroy();

    this.add.image(0, 0, 'arenaBG').setOrigin(0, 0);

    this.scan = this.add.rectangle(WIDTH/2, 0, WIDTH, 3, 0x00eaff, 0.10).setDepth(2);
    this.tweens.add({
      targets: this.scan, y: HEIGHT, duration: 4200, repeat: -1, ease: 'Sine.easeInOut'
    });
  }

  makeFighter(key: string, x: number, palette: any, isAI: boolean, name: string) {
    const sprite = this.add.sprite(x, GROUND_Y, key + '_idle').setOrigin(0.5, 1).setScale(3).setDepth(10);
    const shadow = this.add.image(x, GROUND_Y + 2, 'shadow').setOrigin(0.5, 0.5).setScale(1.3).setDepth(5).setAlpha(0.55);
    return {
      key, sprite, shadow, name, isAI,
      x, y: GROUND_Y, vy: 0, grounded: true, facing: 1,
      hp: 100, maxHp: 100, energy: 0,
      state: 'idle', attackType: null, attackTimer: 0, hasHit: false, projectileSpawned: false,
      cooldowns: { punch: 0, kick: 0, special: 0 },
      blocking: false, hurtFlash: 0, brain: null as any
    };
  }

  buildHUD() {
    const barW = 300, barH = 20;
    this.bars = this.add.graphics().setDepth(40);

    const txtStyle = { fontFamily:'"Press Start 2P", monospace', fontSize:'11px', color:'#ffffff' };
    this.playerLabel = this.add.text(40, 14, 'YOU', txtStyle).setDepth(41);
    this.aiLabel = this.add.text(WIDTH - 40, 14, 'RIVAL.EXE', txtStyle).setOrigin(1, 0).setDepth(41);
    this.playerLabel.setShadow(0,0,'#00eaff',8,true,true);
    this.aiLabel.setShadow(0,0,'#ff2bd6',8,true,true);

    this.barGeom = {
      pX: 40, pY: 34, aX: WIDTH - 40 - barW, aY: 34, w: barW, h: barH,
      peX: 40, peY: 58, aeX: WIDTH - 40 - barW, aeY: 58, ew: barW, eh: 8
    };

    this.vsText = this.add.text(WIDTH/2, 30, 'VS', {
      fontFamily:'"Press Start 2P", monospace', fontSize:'18px', color:'#ffe34d'
    }).setOrigin(0.5).setDepth(41);
    this.vsText.setShadow(0,0,'#ffe34d',10,true,true);
  }

  updateHUD() {
    const g = this.bars; g.clear();
    const { pX, pY, aX, aY, w, h, peX, peY, aeX, aeY, ew, eh } = this.barGeom;

    g.fillStyle(0x000814, 0.85); g.fillRect(pX, pY, w, h); g.fillRect(aX, aY, w, h);
    g.fillStyle(0x000814, 0.7);  g.fillRect(peX, peY, ew, eh); g.fillRect(aeX, aeY, ew, eh);

    const pPct = Phaser.Math.Clamp(this.player.hp / this.player.maxHp, 0, 1);
    const aPct = Phaser.Math.Clamp(this.ai.hp / this.ai.maxHp, 0, 1);
    const hColor = (pct: number) => pct > 0.5 ? 0x00eaff : pct > 0.2 ? 0xffe34d : 0xff3030;

    g.fillStyle(hColor(pPct), 1); g.fillRect(pX, pY, w * pPct, h);
    g.fillStyle(hColor(aPct), 1); g.fillRect(aX + w * (1 - aPct), aY, w * aPct, h);

    const peP = this.player.energy / 100, aeP = this.ai.energy / 100;
    g.fillStyle(0x00fff2, 0.9); g.fillRect(peX, peY, ew * peP, eh);
    g.fillStyle(0xff6bf0, 0.9); g.fillRect(aeX + ew * (1 - aeP), aeY, ew * aeP, eh);

    g.lineStyle(2, 0x00eaff, 0.9); g.strokeRect(pX, pY, w, h);
    g.lineStyle(2, 0xff2bd6, 0.9); g.strokeRect(aX, aY, w, h);
    g.lineStyle(1, 0xffffff, 0.4); g.strokeRect(peX, peY, ew, eh); g.strokeRect(aeX, aeY, ew, eh);
  }

  runIntro() {
    const style = { fontFamily:'"Press Start 2P", monospace', fontSize:'30px', color:'#5be9ff' };
    const round = this.add.text(WIDTH/2, HEIGHT/2 - 20, 'ROUND 1', style).setOrigin(0.5).setDepth(60);
    round.setShadow(0,0,'#00eaff',16,true,true);
    this.time.delayedCall(900, () => {
      round.setText('FIGHT!'); round.setColor('#ff2bd6'); round.setShadow(0,0,'#ff2bd6',16,true,true);
      this.tweens.add({
        targets: round, scale: 1.4, alpha: 0, duration: 500, delay: 250,
        onComplete: () => { round.destroy(); this.roundActive = true; }
      });
    });
  }

  getPlayerIntents() {
    if (!this.cursors) return { left:false, right:false, jump:false, block:false, punch:false, kick:false, special:false };
    return {
      left: this.cursors.left.isDown,
      right: this.cursors.right.isDown,
      jump: this.cursors.up.isDown,
      block: this.cursors.down.isDown,
      punch: Phaser.Input.Keyboard.JustDown(this.keyA),
      kick: Phaser.Input.Keyboard.JustDown(this.keyS),
      special: Phaser.Input.Keyboard.JustDown(this.keyD)
    };
  }

  getAIIntents(ai: any, player: any, time: number) {
    const intents = { left:false, right:false, jump:false, block:false, punch:false, kick:false, special:false };
    if (ai.state === 'ko' || player.state === 'ko') return intents;
    if (!ai.brain) ai.brain = { nextDecision: 0, preferredRange: 95, blocking: false, blockUntil: 0 };
    const b = ai.brain;
    const dx = player.x - ai.x, dist = Math.abs(dx);

    if (time > b.blockUntil) b.blocking = false;

    if (ai.state === 'idle' || ai.state === 'walk') {
      if (dist > b.preferredRange + 18) { dx > 0 ? intents.right = true : intents.left = true; }
      else if (dist < b.preferredRange - 30) { dx > 0 ? intents.left = true : intents.right = true; }
    }

    if (time >= b.nextDecision && ai.state !== 'attack') {
      b.nextDecision = time + Phaser.Math.Between(380, 760);
      const canPunch = dist <= 80 && time > ai.cooldowns.punch;
      const canKick = dist <= 105 && time > ai.cooldowns.kick;
      const canSpecial = dist <= 170 && time > ai.cooldowns.special && ai.energy >= SPECIAL_COST;
      const r = Math.random();
      if (canSpecial && r < 0.16) intents.special = true;
      else if (canKick && r < 0.55) intents.kick = true;
      else if (canPunch && r < 0.82) intents.punch = true;
      else if (dist < 65 && r < 0.93) { intents.block = true; b.blocking = true; b.blockUntil = time + 450; }
      else b.preferredRange = Phaser.Math.Between(60, 150);
    }
    if (b.blocking) intents.block = true;
    return intents;
  }

  startAttack(fighter: any, type: string, time: number) {
    fighter.state = 'attack';
    fighter.attackType = type;
    fighter.attackTimer = 0;
    fighter.hasHit = false;
    fighter.projectileSpawned = false;
    if (type === 'special') fighter.energy = Math.max(0, fighter.energy - SPECIAL_COST);
  }

  tryHit(attacker: any, opponent: any, cfg: any) {
    const dx = opponent.x - attacker.x, dist = Math.abs(dx);
    const facingCorrect = (dx > 0 && attacker.facing === 1) || (dx < 0 && attacker.facing === -1);
    if (facingCorrect && dist <= cfg.range && opponent.state !== 'ko') {
      attacker.hasHit = true;
      this.applyDamage(attacker, opponent, cfg.damage);
    }
  }

  applyDamage(attacker: any, target: any, dmg: number) {
    if (target.state === 'ko') return;
    let actual = dmg;
    if (target.blocking) {
      const dxv = attacker.x - target.x;
      const facingAttacker = (dxv > 0 && target.facing === 1) || (dxv < 0 && target.facing === -1);
      if (facingAttacker) { actual = Math.round(dmg * 0.2); target.energy = Math.min(100, target.energy + 4); }
    } else {
      target.hurtFlash = this.time.now + 180;
    }
    target.hp = Math.max(0, target.hp - actual);
    attacker.energy = Math.min(100, attacker.energy + 9);
    target.x += (target.x > attacker.x ? 1 : -1) * (target.blocking ? 3 : 10);
    target.x = Phaser.Math.Clamp(target.x, ARENA_LEFT, ARENA_RIGHT);

    this.spawnHitSpark(target.sprite.x, target.sprite.y - 70);
    this.cameras.main.shake(90, 0.0035);

    if (target.hp <= 0 && target.state !== 'ko') {
      target.hp = 0;
      target.state = 'ko';
      this.triggerGameOver(target === this.player ? 'lose' : 'win');
    }
  }

  spawnHitSpark(x: number, y: number) {
    const s = this.add.sprite(x, y, 'hitSpark').setDepth(30).setScale(1.2);
    this.tweens.add({ targets: s, scale: 2.2, alpha: 0, duration: 220, onComplete: () => s.destroy() });
  }

  spawnProjectile(fighter: any) {
    const orbKey = fighter.isAI ? 'orb_ai' : 'orb_player';
    const startX = fighter.sprite.x + fighter.facing * 36;
    const startY = fighter.sprite.y - 68;
    const orb = this.add.sprite(startX, startY, orbKey).setDepth(15).setScale(1.6);
    this.tweens.add({ targets: orb, angle: 360, duration: 500, repeat: -1 });
    this.projectiles.push({ sprite: orb, vx: fighter.facing * 480, owner: fighter, hit: false });
  }

  updateProjectiles(dt: number) {
    const target = (f: any) => f === this.player ? this.ai : this.player;
    this.projectiles.forEach(p => {
      p.sprite.x += p.vx * dt / 1000;
      const opp = target(p.owner);
      if (!p.hit) {
        const dist = Math.abs(opp.sprite.x - p.sprite.x);
        if (dist < 38 && opp.state !== 'ko') {
          p.hit = true;
          this.applyDamage(p.owner, opp, ATTACK_CFG.special.damage);
          this.spawnHitSpark(p.sprite.x, p.sprite.y);
        }
      }
    });
    this.projectiles = this.projectiles.filter(p => {
      const offscreen = p.sprite.x < -20 || p.sprite.x > WIDTH + 20;
      if (p.hit || offscreen) { p.sprite.destroy(); return false; }
      return true;
    });
  }

  updateFighter(fighter: any, intents: any, dt: number, opponent: any, time: number) {
    if (fighter.state === 'ko') { this.applyVisual(fighter, time); return; }

    if (fighter.state !== 'attack') {
      fighter.facing = opponent.x >= fighter.x ? 1 : -1;
    }

    const moveSpeed = 230;
    let moving = false;
    fighter.blocking = intents.block && fighter.state !== 'attack' && fighter.grounded;

    if (fighter.state !== 'attack' && !fighter.blocking) {
      if (intents.left)  { fighter.x -= moveSpeed * dt / 1000; moving = true; }
      if (intents.right) { fighter.x += moveSpeed * dt / 1000; moving = true; }
    }

    if (intents.jump && fighter.grounded && fighter.state !== 'attack' && !fighter.blocking) {
      fighter.vy = -380; fighter.grounded = false;
    }
    fighter.vy += 1000 * dt / 1000;
    fighter.y += fighter.vy * dt / 1000;
    if (fighter.y >= GROUND_Y) { fighter.y = GROUND_Y; fighter.vy = 0; fighter.grounded = true; }

    fighter.x = Phaser.Math.Clamp(fighter.x, ARENA_LEFT, ARENA_RIGHT);

    if (fighter.state !== 'attack' && fighter.grounded && !fighter.blocking) {
      if (intents.punch && time > fighter.cooldowns.punch) this.startAttack(fighter, 'punch', time);
      else if (intents.kick && time > fighter.cooldowns.kick) this.startAttack(fighter, 'kick', time);
      else if (intents.special && time > fighter.cooldowns.special && fighter.energy >= SPECIAL_COST) this.startAttack(fighter, 'special', time);
    }

    if (fighter.state === 'attack') {
      fighter.attackTimer += dt;
      const cfg = ATTACK_CFG[fighter.attackType];
      if (!fighter.hasHit && fighter.attackTimer >= cfg.startup && fighter.attackTimer < cfg.startup + cfg.active) {
        if (fighter.attackType === 'special') {
          if (!fighter.projectileSpawned) { this.spawnProjectile(fighter); fighter.projectileSpawned = true; fighter.hasHit = true; }
        } else {
          this.tryHit(fighter, opponent, cfg);
        }
      }
      if (fighter.attackTimer >= cfg.startup + cfg.active + cfg.recovery) {
        fighter.cooldowns[fighter.attackType] = time + cfg.cooldown;
        fighter.state = 'idle'; fighter.attackTimer = 0; fighter.hasHit = false; fighter.projectileSpawned = false;
      }
    } else {
      fighter.state = fighter.blocking ? 'block' : (moving ? 'walk' : 'idle');
    }

    fighter.energy = Math.min(100, fighter.energy + dt * 0.004);
    this.applyVisual(fighter, time);
  }

  applyVisual(fighter: any, time: number) {
    let pose = 'idle';
    if (fighter.state === 'ko') pose = 'ko';
    else if (fighter.state === 'block') pose = 'block';
    else if (fighter.state === 'attack') {
      if (fighter.attackType === 'special') {
        pose = fighter.attackTimer < ATTACK_CFG.special.startup ? 'special_charge' : 'special_release';
      } else pose = fighter.attackType;
    } else if (fighter.state === 'walk') {
      pose = Math.floor(time / 130) % 2 === 0 ? 'walk_a' : 'walk_b';
    } else if (time < fighter.hurtFlash) {
      pose = 'hurt';
    }

    fighter.sprite.setTexture(fighter.key + '_' + pose);
    fighter.sprite.setFlipX(fighter.facing === -1);
    fighter.sprite.setPosition(fighter.x, fighter.y);
    fighter.shadow.setPosition(fighter.x, GROUND_Y + 4);

    if (time < fighter.hurtFlash) fighter.sprite.setTint(0xff7777);
    else fighter.sprite.clearTint();
  }

  triggerGameOver(result: string) {
    this.gameOver = true;
    this.time.delayedCall(500, () => {
      this.add.rectangle(WIDTH/2, HEIGHT/2, WIDTH, HEIGHT, 0x000010, 0.78).setDepth(50);
      const color = result === 'win' ? '#00eaff' : '#ff2bd6';
      const big = this.add.text(WIDTH/2, HEIGHT/2 - 40, result === 'win' ? 'YOU WIN' : 'YOU LOSE', {
        fontFamily:'"Press Start 2P", monospace', fontSize:'40px', color
      }).setOrigin(0.5).setDepth(51);
      big.setShadow(0,0,color,22,true,true);

      const prompt = this.add.text(WIDTH/2, HEIGHT/2 + 40, 'PRESS R OR CLICK TO REPLAY', {
        fontFamily:'"Press Start 2P", monospace', fontSize:'13px', color:'#ffffff'
      }).setOrigin(0.5).setDepth(51);
      this.tweens.add({ targets: prompt, alpha: { from:1, to:0.25 }, duration: 600, yoyo:true, repeat:-1 });

      if (this.input.keyboard) this.input.keyboard.once('keydown-R', () => this.scene.restart());
      this.input.once('pointerdown', () => this.scene.restart());
    });
  }

  update(time: number, delta: number) {
    if (!this.roundActive || this.gameOver) return;

    const pIntents = this.getPlayerIntents();
    const aIntents = this.getAIIntents(this.ai, this.player, time);

    this.updateFighter(this.player, pIntents, delta, this.ai, time);
    this.updateFighter(this.ai, aIntents, delta, this.player, time);

    if (this.player.state !== 'ko' && this.ai.state !== 'ko') {
      const sep = Math.abs(this.player.x - this.ai.x);
      if (sep < MIN_SEP) {
        const overlap = MIN_SEP - sep;
        const dir = this.player.x < this.ai.x ? -1 : 1;
        this.player.x += dir * overlap / 2;
        this.ai.x -= dir * overlap / 2;
        this.player.x = Phaser.Math.Clamp(this.player.x, ARENA_LEFT, ARENA_RIGHT);
        this.ai.x = Phaser.Math.Clamp(this.ai.x, ARENA_LEFT, ARENA_RIGHT);
      }
    }

    this.updateProjectiles(delta);
    this.updateHUD();
  }
}

export default function PhaserFightingGame() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Destroy previous instance to prevent double-canvas in React StrictMode
    if ((window as any)._phaserGame) {
      (window as any)._phaserGame.destroy(true);
    }
    
    const config = {
      type: Phaser.AUTO,
      width: WIDTH,
      height: HEIGHT,
      parent: containerRef.current,
      backgroundColor: '#01030a',
      pixelArt: true,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: [ArenaScene]
    };
    
    const game = new Phaser.Game(config);
    (window as any)._phaserGame = game;
    
    return () => {
      game.destroy(true);
      (window as any)._phaserGame = null;
    };
  }, []);

  return <div ref={containerRef} style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }} />;
}
