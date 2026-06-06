"use strict";

const canvas = document.getElementById("swarm"); 
const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
if (!gl) throw new Error("WebGL is required for this demo.");

const DRONE_COUNT = 500;
const WORLD = 220;
const HOME = [-78, 0, -40];
const TARGET = [78, 0, 42];
const HOME_TO_TARGET_MILES = 25;
const MISSION_MINUTES_PER_SIM_SECOND = 2.0;
const WEEK_MINUTES = 7 * 24 * 60;
const TARGET_RADIUS = 24;
const HOME_RADIUS = 18;
const PLATFORM_MIX = { quad: 330, fixed: 120, ground: 50 };
const RELAY_QUADS = 0;
const RELAY_FIXED = 8;
const PACKAGE_QUADS = 46;
const TERRAIN_DOTS = 260;
const RELAY_BELT = [-18, 9, 2];
const FIELD_GROUND_TARGET = 10;
const PRESTAGE_QUADS_PER_NODE = 8;
const PRESTAGE_GROUND_PER_NODE = 2;
const REPLENISH_RATE = { quad: 0.42, fixed: 0.24, ground: 0.30 };
const MAX_FORWARD_SWAP_PROGRESS = 0.68;
const OBSTACLES = [
  { p: [-52, 0, -6], r: 10, h: 4.8 },
  { p: [-18, 0, 24], r: 8, h: 5.5 },
  { p: [26, 0, -42], r: 12, h: 4.2 },
  { p: [48, 0, 18], r: 11, h: 6.0 },
  { p: [82, 0, 58], r: 9, h: 4.6 }
];
const FORWARD_SWAP_RADIUS = 13;
const FINAL_SWAP_RELEASE_RADIUS = 34;
const FINAL_SWAP_TARGET_COMMIT_BATTERY = 0.72;
const FORWARD_SWAP_NODES = OBSTACLES
  .map((obstacle, index) => ({ index, p: [obstacle.p[0], 0, obstacle.p[2]], r: Math.max(8, obstacle.r * 0.92) }))
  .filter((node) => routeProgress(node.p) <= MAX_FORWARD_SWAP_PROGRESS && flatDistance(node.p, TARGET) > TARGET_RADIUS * 1.8)
  .sort((a, b) => routeProgress(a.p) - routeProgress(b.p));
const TERRAIN_X_MIN = -130;
const TERRAIN_X_MAX = 130;
const TERRAIN_Z_MIN = -110;
const TERRAIN_Z_MAX = 110;
const TERRAIN_GRID_STEP = 10;
const ARTILLERY = [
  [-118, 0, 72],
  [-108, 0, 88],
  [-96, 0, 74],
  [-88, 0, 92]
];
const TMP_A = [0, 0, 0];
const TMP_B = [0, 0, 0];

const hud = Object.fromEntries([
  "phase", "cycle", "elapsed", "count", "mix", "arrived", "returned", "battery", "batteryMeter",
  "losses", "effects", "supportCalls", "coverage", "cohesion", "cohesionMeter", "comms", "commsMeter", "gps", "gpsMeter",
  "weekAttrition", "weekReplenish", "weekNet", "forwardStage", "beliefMission", "beliefRegroup", "beliefReturn", "action", "log"
].map((id) => [id, document.getElementById(id)]));

const vertexSource = `
attribute vec3 a_position;
attribute vec3 a_color;
attribute float a_size;
uniform mat4 u_matrix;
varying vec3 v_color;
void main() {
  gl_Position = u_matrix * vec4(a_position, 1.0);
  gl_PointSize = a_size;
  v_color = a_color;
}`;

const fragmentSource = `
precision mediump float;
varying vec3 v_color;
void main() {
  vec2 p = gl_PointCoord - vec2(0.5);
  float d = length(p);
  if (d > 0.5) discard;
  float glow = smoothstep(0.5, 0.05, d);
  gl_FragColor = vec4(v_color * (0.55 + glow * 0.85), 1.0);
}`;

function shader(type, source) {
  const s = gl.createShader(type);
  gl.shaderSource(s, source);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

function program(vs, fs) {
  const p = gl.createProgram();
  gl.attachShader(p, shader(gl.VERTEX_SHADER, vs));
  gl.attachShader(p, shader(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
  return p;
}

const pointProgram = program(vertexSource, fragmentSource);
const aPosition = gl.getAttribLocation(pointProgram, "a_position");
const aColor = gl.getAttribLocation(pointProgram, "a_color");
const aSize = gl.getAttribLocation(pointProgram, "a_size");
const uMatrix = gl.getUniformLocation(pointProgram, "u_matrix");
const pointBuffer = gl.createBuffer();
const pointStride = 7;
const pointData = new Float32Array((DRONE_COUNT + 18 + 360 + TERRAIN_DOTS + OBSTACLES.length * 28) * pointStride);
const lineBuffer = gl.createBuffer();
const lineStride = 6;
const lineData = new Float32Array(12000 * lineStride);
const lineMeta = { baseVertices: 0, supportStarts: [] };

function rnd(min, max) { return min + Math.random() * (max - min); }
function hashNoise(seed) { return Math.sin(seed * 127.1) * 43758.5453 % 1; }
function terrainNoise(index, salt = 0) { return Math.abs(hashNoise(index + salt)); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function len3(a) { return Math.hypot(a[0], a[1], a[2]); }
function dist3(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); }
function sub3(out, a, b) { out[0] = a[0] - b[0]; out[1] = a[1] - b[1]; out[2] = a[2] - b[2]; return out; }
function norm3(out) { const l = len3(out) || 1; out[0] /= l; out[1] /= l; out[2] /= l; return out; }
function addScaled(out, a, s) { out[0] += a[0] * s; out[1] += a[1] * s; out[2] += a[2] * s; return out; }

function terrainHeight(x, z) {
  const farRidge = Math.max(0, (z - 28) / 82);
  const ridge = farRidge * (
    2.2 +
    Math.sin(x * 0.052 + z * 0.018) * 2.6 +
    Math.cos(x * 0.031 - z * 0.041) * 1.8
  );
  const valley = -Math.exp(-Math.pow((z + 4) / 18, 2)) * 1.9;
  let y = -3 + valley + ridge + Math.sin(x * 0.045) * 1.35 + Math.cos(z * 0.052) * 1.05 + Math.sin((x + z) * 0.032) * 0.75;
  for (const obstacle of OBSTACLES) {
    const d = Math.hypot(x - obstacle.p[0], z - obstacle.p[2]);
    if (d < obstacle.r) y += Math.cos(d / obstacle.r * Math.PI * 0.5) * obstacle.h;
  }
  return y;
}

function groundY(x, z) {
  return terrainHeight(x, z) + 0.45;
}

function settleGroundUnit(drone) {
  if (drone.platform === "ground") drone.p[1] = groundY(drone.p[0], drone.p[2]);
}

function obstacleAvoidance(drone, steer) {
  if (drone.platform !== "ground") return;
  for (const obstacle of OBSTACLES) {
    const dx = drone.p[0] - obstacle.p[0];
    const dz = drone.p[2] - obstacle.p[2];
    const d = Math.hypot(dx, dz);
    const margin = obstacle.r + 6;
    if (d > 0.01 && d < margin) {
      const push = (margin - d) / margin;
      steer[0] += dx / d * push * 0.9;
      steer[2] += dz / d * push * 0.9;
    }
  }
}

function missionMinutes() {
  return sim.t * MISSION_MINUTES_PER_SIM_SECOND;
}

function formatMissionClock(minutes) {
  const total = Math.max(0, Math.floor(minutes));
  const days = Math.floor(total / 1440);
  const hours = Math.floor((total % 1440) / 60);
  const mins = total % 60;
  if (days > 0) return `${days}d ${hours}h ${mins}m`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}

function emptyLogistics() {
  return { quad: 0, fixed: 0, ground: 0 };
}

function logisticsText(counts) {
  return `${counts.quad}Q ${counts.fixed}F ${counts.ground}G`;
}

function registerAttrition(drone) {
  if (drone.attritionLogged) return;
  sim.weekAttrition[drone.platform] += 1;
  drone.attritionLogged = true;
}

function registerReplenish(drone) {
  sim.weekReplenish[drone.platform] += 1;
  drone.attritionLogged = false;
}

function roleBoids(drone, inTargetArea) {
  if (drone.platform === "ground") return { perception: 12, separation: 2.0, alignment: 0.05, cohesion: 0.10, target: 0.42 };
  if (drone.platform === "fixed") {
    if (drone.fixedRelay) return { perception: 34, separation: 1.2, alignment: 0.42, cohesion: 0.10, target: 0.72 };
    return drone.packageCarrier
      ? { perception: 24, separation: 1.05, alignment: 0.22, cohesion: 0.04, target: 1.32 }
      : { perception: 32, separation: 1.15, alignment: 0.36, cohesion: 0.16, target: 0.88 };
  }
  if (drone.packageCarrier) return { perception: 20, separation: 1.85, alignment: 0.12, cohesion: 0.06, target: inTargetArea ? 1.18 : 1.05 };
  if (drone.relay) return { perception: 28, separation: 1.55, alignment: 0.26, cohesion: 0.20, target: 0.76 };
  return { perception: 26, separation: 1.7, alignment: 0.18, cohesion: 0.28, target: inTargetArea ? 0.70 : 0.86 };
}

function glyphColor(drone) {
  if (!drone.launched) return [0.12, 0.20, 0.24];
  if (drone.expended) return [1, 0.48, 0.85];
  if (drone.landed) return [0.54, 0.70, 1];
  if (drone.lost) return [0.30, 0.02, 0.03];
  if (drone.mode === "return" || drone.battery < 0.28) return [1, 0.38, 0.45];
  if (drone.battery < 0.48) return [1, 0.72, 0.28];
  if (drone.fixedRelay || drone.relay) return [0.46, 1, 0.92];
  if (drone.packageCarrier) return [1, 0.48, 0.20];
  if (drone.platform === "fixed") return [0.38, 0.82, 1];
  if (drone.platform === "ground") return [0.72, 1, 0.36];
  return [0.36, 1, 0.62];
}

function lineSegment(offset, a, b, color) {
  pushLineVertex(offset, a, color);
  offset += lineStride;
  pushLineVertex(offset, b, color);
  return offset + lineStride;
}

function identity() {
  return [1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1];
}

function multiply(a, b) {
  const out = new Array(16);
  for (let c = 0; c < 4; c += 1) {
    for (let r = 0; r < 4; r += 1) {
      out[c * 4 + r] =
        a[0 * 4 + r] * b[c * 4 + 0] +
        a[1 * 4 + r] * b[c * 4 + 1] +
        a[2 * 4 + r] * b[c * 4 + 2] +
        a[3 * 4 + r] * b[c * 4 + 3];
    }
  }
  return out;
}

function perspective(fovy, aspect, near, far) {
  const f = 1 / Math.tan(fovy / 2);
  const nf = 1 / (near - far);
  return [f / aspect,0,0,0, 0,f,0,0, 0,0,(far + near) * nf,-1, 0,0,(2 * far * near) * nf,0];
}

function lookAt(eye, center, up) {
  const z = norm3(sub3([0,0,0], eye, center));
  const x = norm3([up[1] * z[2] - up[2] * z[1], up[2] * z[0] - up[0] * z[2], up[0] * z[1] - up[1] * z[0]]);
  const y = [z[1] * x[2] - z[2] * x[1], z[2] * x[0] - z[0] * x[2], z[0] * x[1] - z[1] * x[0]];
  return [x[0],y[0],z[0],0, x[1],y[1],z[1],0, x[2],y[2],z[2],0, -(x[0]*eye[0]+x[1]*eye[1]+x[2]*eye[2]), -(y[0]*eye[0]+y[1]*eye[1]+y[2]*eye[2]), -(z[0]*eye[0]+z[1]*eye[1]+z[2]*eye[2]),1];
}

const sim = {
  t: 0,
  phase: "launch",
  battery: 1,
  comms: 1,
  gps: 1,
  cohesion: 1,
  targetBehavior: "efficient",
  cycle: 1,
  cyclePhaseStart: 0,
  arrived: 0,
  returned: 0,
  coverage: 0,
  effects: 0,
  supportCalls: 0,
  supportEvents: [],
  nextRollingLaunch: 0,
  weekIndex: 0,
  weekAttrition: emptyLogistics(),
  weekReplenish: emptyLogistics(),
  log: [],
  camera: { yaw: -0.75, pitch: 0.72, distance: 265, dragging: false, x: 0, y: 0 },
  drones: []
};

function event(message) {
  const stamp = formatMissionClock(missionMinutes()).padStart(8, " ");
  sim.log.unshift(`${stamp}  ${message}`);
  sim.log = sim.log.slice(0, 9);
  hud.log.textContent = sim.log.join("\n");
}

function setPhase(phase, message) {
  if (sim.phase === phase) return;
  sim.phase = phase;
  sim.cyclePhaseStart = sim.t;
  if (message) event(message);
}

function reset() {
  sim.t = 0;
  sim.phase = "launch";
  sim.battery = 1;
  sim.comms = 1;
  sim.gps = 1;
  sim.cohesion = 1;
  sim.cycle = 1;
  sim.cyclePhaseStart = 0;
  sim.arrived = 0;
  sim.returned = 0;
  sim.coverage = 0;
  sim.effects = 0;
  sim.supportCalls = 0;
  sim.supportEvents = [];
  sim.nextRollingLaunch = 0;
  sim.weekIndex = 0;
  sim.weekAttrition = emptyLogistics();
  sim.weekReplenish = emptyLogistics();
  sim.log = [];
  sim.drones = [];
  for (let i = 0; i < DRONE_COUNT; i += 1) {
    const platform = i < PLATFORM_MIX.quad ? "quad" : i < PLATFORM_MIX.quad + PLATFORM_MIX.fixed ? "fixed" : "ground";
    const relay = platform === "quad" && i < RELAY_QUADS;
    const fixedRelay = platform === "fixed" && i < PLATFORM_MIX.quad + RELAY_FIXED;
    const packageCarrier = (platform === "fixed" && !fixedRelay) || (platform === "quad" && i >= RELAY_QUADS && i < RELAY_QUADS + PACKAGE_QUADS);
    sim.drones.push({
      platform,
      relay,
      fixedRelay,
      packageCarrier,
      launched: false,
      launchDelay: platform === "ground" || relay || fixedRelay ? rnd(0, 5) : platform === "quad" ? rnd(12, 24) : rnd(24, 36),
      p: [HOME[0] + rnd(-9, 9), platform === "ground" ? 0 : rnd(-4, 11), HOME[2] + rnd(-9, 9)],
      v: [rnd(.15, .8), platform === "ground" ? 0 : rnd(-.12, .12), rnd(.05, .55)],
      battery: platform === "fixed" ? rnd(.93, 1) : platform === "ground" ? rnd(.86, .96) : rnd(.88, 1),
      mode: "outbound",
      alive: true,
      arrived: false,
      returned: false,
      lost: false,
      landed: false,
      expended: false,
      attritionLogged: false,
      swapCommit: false,
      assignedSwapIndex: -1,
      logisticsRole: "",
      targetCommit: false,
      finalSwapCharged: false,
      serviceNodeIndex: -1,
      serviceCooldownUntil: 0,
      serviceReturnIntent: false,
      supplies: 1,
      targetEntry: 0,
      serviceUntil: 0,
      slot: [0, 0, 0],
      jitter: rnd(.8, 1.35)
    });
    const drone = sim.drones[sim.drones.length - 1];
    const ring = Math.floor(i / 72);
    const angle = (i % 72) / 72 * Math.PI * 2 + ring * 0.42;
    const radius = platform === "fixed" ? 24 + (i % 4) * 7 : platform === "ground" ? 16 + (i % 5) * 4 : 7 + ring * 4.4;
    drone.slot = [TARGET[0] + Math.cos(angle) * radius, platform === "ground" ? 0 : platform === "fixed" ? rnd(16, 27) : rnd(3, 13), TARGET[2] + Math.sin(angle) * radius];
    if (platform === "ground") {
      drone.slot[1] = groundY(drone.slot[0], drone.slot[2]);
      settleGroundUnit(drone);
    }
    if (relay || fixedRelay) {
      const relayAngle = (i % 60) / 60 * Math.PI * 2;
      const relayRadius = fixedRelay ? 24 + (i % 4) * 5 : 12 + (i % 5) * 2.6;
      drone.slot = [RELAY_BELT[0] + Math.cos(relayAngle) * relayRadius, fixedRelay ? 18 + (i % 3) * 3 : 8 + (i % 4), RELAY_BELT[2] + Math.sin(relayAngle) * relayRadius];
    }
  }
  prestageForwardLogistics();
  event("mission reset: launch from home base");
  event(`${PRESTAGE_QUADS_PER_NODE * FORWARD_SWAP_NODES.length} X units and ${PRESTAGE_GROUND_PER_NODE * FORWARD_SWAP_NODES.length} ground units pre-staged on forward cache chain`);
  event(`${PLATFORM_MIX.ground} ground units and ${RELAY_FIXED} fixed-wing RF relays launch first`);
}

function prestageForwardLogistics() {
  const quadPool = sim.drones.filter((d) => d.platform === "quad" && !d.relay && !d.packageCarrier);
  const groundPool = sim.drones.filter((d) => d.platform === "ground");
  let qi = 0;
  let gi = 0;
  for (let nodeIndex = 0; nodeIndex < FORWARD_SWAP_NODES.length; nodeIndex += 1) {
    for (let n = 0; n < PRESTAGE_QUADS_PER_NODE && qi < quadPool.length; n += 1) {
      stageAtForwardNode(quadPool[qi], nodeIndex, n, PRESTAGE_QUADS_PER_NODE, "quad-cache");
      qi += 1;
    }
    for (let n = 0; n < PRESTAGE_GROUND_PER_NODE && gi < groundPool.length; n += 1) {
      stageAtForwardNode(groundPool[gi], nodeIndex, n, PRESTAGE_GROUND_PER_NODE, "ground-cache");
      gi += 1;
    }
  }
}

function stageAtForwardNode(drone, nodeIndex, offsetIndex, offsetTotal, role) {
  const node = FORWARD_SWAP_NODES[nodeIndex];
  const angle = offsetIndex / Math.max(1, offsetTotal) * Math.PI * 2 + nodeIndex * 0.58;
  const spread = drone.platform === "ground" ? node.r * 0.58 : node.r * 0.82;
  drone.launched = true;
  drone.launchDelay = 0;
  drone.mode = drone.platform === "ground" ? "staged-ground" : "staged";
  drone.logisticsRole = role;
  drone.assignedSwapIndex = nodeIndex;
  drone.returned = false;
  drone.landed = false;
  drone.alive = true;
  drone.battery = drone.platform === "ground" ? 0.92 : 0.96;
  drone.supplies = 1;
  drone.p[0] = node.p[0] + Math.cos(angle) * spread;
  drone.p[2] = node.p[2] + Math.sin(angle) * spread;
  drone.p[1] = drone.platform === "ground" ? groundY(drone.p[0], drone.p[2]) : groundY(node.p[0], node.p[2]) + 5 + (offsetIndex % 3);
  drone.v[0] = Math.cos(angle) * 0.08;
  drone.v[1] = 0;
  drone.v[2] = Math.sin(angle) * 0.08;
}

function phaseTarget(drone) {
  if (!drone.launched) return HOME;
  if (drone.mode === "field-service" && drone.serviceNodeIndex >= 0) {
    const node = FORWARD_SWAP_NODES[drone.serviceNodeIndex];
    return [node.p[0], groundY(node.p[0], node.p[2]) + 0.9, node.p[2]];
  }
  if (drone.platform === "quad" && drone.targetCommit && drone.mode !== "return" && sim.phase !== "return") return drone.slot;
  const logistics = logisticsTarget(drone);
  if (logistics) return logistics;
  if (drone.platform === "quad") {
    const pony = quadPonyTarget(drone);
    if (pony) return pony;
  }
  if (drone.platform === "ground") {
    const groundBase = groundForwardBaseTarget(drone);
    if (groundBase) return groundBase;
  }
  if (drone.mode === "return") return HOME;
  if (sim.phase === "return") return HOME;
  if (drone.platform === "quad") {
    const swap = quadSwapTarget(drone);
    if (swap) return swap;
  }
  if ((drone.relay || drone.fixedRelay) && (sim.phase === "outbound" || sim.phase === "target" || sim.phase === "regroup")) return drone.slot;
  if (sim.phase === "regroup" && sim.coverage > 0.50 && drone.arrived) return [0, 8, 0];
  if ((sim.phase === "target" || drone.mode === "loiter") && (sim.targetBehavior === "efficient" || drone.platform !== "quad")) return drone.slot;
  return TARGET;
}

function updateDrone(drone, idx, dt) {
  if (!drone.launched) {
    if (sim.t >= drone.launchDelay) {
      drone.launched = true;
      if (drone.platform === "fixed" && idx === PLATFORM_MIX.quad) event("fixed-wing packet entered stream");
      if (drone.platform === "quad" && !drone.relay && idx === RELAY_QUADS) event("quadcopter packet entered stream");
    } else {
      return;
    }
  }
  if (!drone.alive || drone.landed) return;
  if (drone.mode === "field-service") return;
  const target = phaseTarget(drone);
  const inTargetArea = (sim.phase === "target" || drone.mode === "loiter") && drone.arrived;
  const inRelayArea = (drone.relay || drone.fixedRelay) && drone.launched && drone.mode !== "return";
  const boids = roleBoids(drone, inTargetArea);
  const perception = boids.perception * (0.55 + sim.comms * 0.45);
  const separation = [0, 0, 0];
  const alignment = [0, 0, 0];
  const cohesion = [0, 0, 0];
  let neighbors = 0;

  for (let step = 0; step < 10; step += 1) {
    const other = sim.drones[(idx + 1 + step * 47) % DRONE_COUNT];
    if (!other.alive || other === drone) continue;
    const d = dist3(drone.p, other.p);
    if (d < perception) {
      neighbors += 1;
      addScaled(cohesion, other.p, 1);
      addScaled(alignment, other.v, 1);
      if (d < 8) addScaled(separation, norm3(sub3(TMP_A, drone.p, other.p)), 1 / Math.max(d, 1));
    }
  }

  const steer = [0, 0, 0];
  addScaled(steer, norm3(sub3(TMP_A, target, drone.p)), drone.mode === "return" ? 1.35 : boids.target);
  if (neighbors) {
    cohesion[0] = cohesion[0] / neighbors - drone.p[0];
    cohesion[1] = cohesion[1] / neighbors - drone.p[1];
    cohesion[2] = cohesion[2] / neighbors - drone.p[2];
    addScaled(steer, norm3(cohesion), boids.cohesion * sim.comms);
    addScaled(steer, norm3(alignment), boids.alignment * sim.comms);
    addScaled(steer, separation, boids.separation);
  }

  const gpsNoise = (1 - sim.gps) * 0.45;
  steer[0] += Math.sin(sim.t * 1.7 + idx) * gpsNoise;
  steer[2] += Math.cos(sim.t * 1.35 + idx * 0.7) * gpsNoise;
  steer[1] += Math.sin(sim.t * 1.1 + idx * 0.31) * 0.03;
  if (inTargetArea) applyTargetBehavior(drone, idx, steer);
  if (inRelayArea) applyRelayBehavior(drone, idx, steer);
  obstacleAvoidance(drone, steer);
  applyPackageDeliveryEffect(drone, dt);
  applyGroundKineticEffect(drone, dt);
  if (!drone.alive) return;

  addScaled(drone.v, steer, dt * drone.jitter);
  const speed = len3(drone.v);
  const maxSpeed = platformMaxSpeed(drone, inTargetArea);
  if (speed > maxSpeed) {
    drone.v[0] = drone.v[0] / speed * maxSpeed;
    drone.v[1] = drone.v[1] / speed * maxSpeed;
    drone.v[2] = drone.v[2] / speed * maxSpeed;
  }

  if (drone.mode === "return" && flatDistance(drone.p, HOME) < 44) {
    addScaled(drone.v, norm3(sub3(TMP_B, HOME, drone.p)), dt * 2.1);
    drone.v[1] -= dt * 0.95;
  }

  addScaled(drone.p, drone.v, dt * 28);
  drone.p[1] = drone.platform === "ground" ? groundY(drone.p[0], drone.p[2]) : clamp(drone.p[1], -3, 30);
  const behaviorBurn = platformBurn(drone, inTargetArea);
  drone.battery -= dt * (0.0016 + speed * behaviorBurn + (drone.mode === "return" ? 0.0004 : 0));
  applyAttrition(drone, dt);
  if (!drone.alive) return;
  if (drone.battery < 0.23 && drone.mode !== "return") {
    if (drone.platform === "quad" && FORWARD_SWAP_NODES.length) {
      drone.swapCommit = true;
      drone.targetCommit = false;
    } else {
      drone.mode = "return";
    }
  }
  if (drone.battery <= 0) {
    drone.alive = false;
    drone.lost = true;
    registerAttrition(drone);
    drone.serviceUntil = sim.t + rnd(10, 22);
    return;
  }
  if (!drone.arrived && !(drone.relay || drone.fixedRelay) && dist3(drone.p, TARGET) < TARGET_RADIUS) {
    drone.arrived = true;
    drone.targetEntry = sim.t;
    drone.targetCommit = false;
    if (sim.phase === "outbound") drone.mode = "loiter";
  }
  if (drone.mode === "return" && (dist3(drone.p, HOME) < HOME_RADIUS || flatDistance(drone.p, HOME) < (drone.platform === "fixed" ? 34 : 24))) landDrone(drone);
}

function applyPackageDeliveryEffect(drone, dt) {
  if (!drone.packageCarrier || drone.expended || drone.supplies <= 0 || sim.phase !== "target" || !drone.arrived) return;
  const base = drone.platform === "fixed" ? 0.036 : 0.014;
  const effectRate = sim.targetBehavior === "wtf" ? base * 1.8 : sim.targetBehavior === "random" ? base * 1.35 : base;
  if (Math.random() < effectRate * dt) {
    drone.expended = true;
    drone.supplies = 0;
    drone.alive = false;
    drone.lost = true;
    registerAttrition(drone);
    drone.serviceUntil = sim.t + rnd(12, 24);
    sim.effects += 1;
    if (sim.effects <= 5 || sim.effects % 10 === 0) event(`expendable package delivery effect recorded: ${sim.effects}`);
  }
}

function applyGroundKineticEffect(drone, dt) {
  if (drone.platform !== "ground" || drone.mode === "return" || !drone.arrived || drone.supplies <= 0.15) return;
  const rate = sim.cycle <= 2 ? 0.010 : 0.004;
  if (Math.random() < rate * dt) {
    drone.supplies = Math.max(0, drone.supplies - 0.18);
    sim.effects += 1;
    sim.supportEvents.push({ age: 0, duration: 1.8, gun: [drone.p[0], 0, drone.p[2]], relay: [drone.p[0], 2, drone.p[2]], impact: [drone.p[0] + rnd(-10, 10), 0, drone.p[2] + rnd(-10, 10)], local: true });
    sim.supportEvents = sim.supportEvents.slice(-18);
    if (sim.effects <= 5 || sim.effects % 12 === 0) event(`ground station kinetic effect recorded: ${sim.effects}`);
  }
}

function maybeCallSupport(dt) {
  if (sim.phase !== "target" || sim.arrived < 0.35) return;
  const rate = 0.09 + sim.arrived * 0.08 + (1 - sim.comms) * 0.04;
  if (Math.random() >= rate * dt) return;
  const gun = ARTILLERY[Math.floor(Math.random() * ARTILLERY.length)];
  const relay = activeRelayPoint();
  const impact = [TARGET[0] + rnd(-TARGET_RADIUS, TARGET_RADIUS), 0, TARGET[2] + rnd(-TARGET_RADIUS, TARGET_RADIUS)];
  sim.supportCalls += 1;
  sim.effects += 1;
  sim.supportEvents.push({ age: 0, duration: 2.8, gun, relay, impact });
  sim.supportEvents = sim.supportEvents.slice(-18);
  if (sim.supportCalls <= 5 || sim.supportCalls % 8 === 0) event(`support call resolved: ${sim.supportCalls}`);
}

function activeRelayPoint() {
  const relays = sim.drones.filter((d) => (d.relay || d.fixedRelay) && d.alive && d.launched && d.mode !== "return");
  if (!relays.length) return RELAY_BELT;
  const chosen = relays[Math.floor(Math.random() * relays.length)];
  return [chosen.p[0], chosen.p[1], chosen.p[2]];
}

function updateSupportEvents(dt) {
  for (const support of sim.supportEvents) support.age += dt;
  sim.supportEvents = sim.supportEvents.filter((support) => support.age < support.duration);
}

function serviceFleet(dt) {
  for (const d of sim.drones) {
    settleGroundUnit(d);
    const swapNode = d.platform === "quad" || d.platform === "ground" ? nearestForwardSwap(d.p) : null;
    const atForwardSwap = swapNode && d.alive && d.launched && flatDistance(d.p, swapNode.p) < FORWARD_SWAP_RADIUS;
    const atHome = d.landed || d.returned || d.lost || d.expended || flatDistance(d.p, HOME) < 38 || atForwardSwap;
    if (!atHome) continue;
    d.battery = clamp(d.battery + dt * (atForwardSwap ? d.platform === "ground" ? 0.10 : 0.42 : d.platform === "ground" ? 0.16 : d.platform === "fixed" ? 0.22 : 0.26), 0, 1);
    d.supplies = clamp(d.supplies + dt * (atForwardSwap ? d.platform === "ground" ? 0.16 : 0.42 : 0.34), 0, 1);
    if (atForwardSwap) {
      const finalSwap = swapNode === FORWARD_SWAP_NODES[FORWARD_SWAP_NODES.length - 1];
      const nodeIndex = FORWARD_SWAP_NODES.indexOf(swapNode);
      const canEnterFieldService = d.mode === "field-service" || sim.t >= d.serviceCooldownUntil || d.swapCommit || d.logisticsRole;
      if (d.platform === "quad" && d.mode !== "return" && !d.targetCommit && canEnterFieldService) {
        if (d.mode !== "field-service") {
          d.serviceReturnIntent = d.mode === "return" || sim.phase === "return";
          d.mode = "field-service";
          d.serviceNodeIndex = nodeIndex;
          d.serviceUntil = Math.max(d.serviceUntil, sim.t + rnd(2.2, 5.2));
          const padAngle = d.jitter * 9.1 + nodeIndex;
          const padRadius = 2.8 + (d.jitter % 1) * 6.5;
          d.p[0] = swapNode.p[0] + Math.cos(padAngle) * padRadius;
          d.p[2] = swapNode.p[2] + Math.sin(padAngle) * padRadius;
          d.p[1] = groundY(d.p[0], d.p[2]) + 0.9;
          d.v[0] = 0;
          d.v[1] = 0;
          d.v[2] = 0;
        }
        if (sim.t >= d.serviceUntil && d.battery > (finalSwap ? 0.92 : 0.86)) {
          const wasReturning = d.serviceReturnIntent || sim.phase === "return";
          d.mode = "outbound";
          d.serviceNodeIndex = -1;
          d.serviceReturnIntent = false;
          d.serviceCooldownUntil = sim.t + (finalSwap ? 10 : 7);
          d.swapCommit = false;
          if (wasReturning) {
            d.mode = "staged";
            d.logisticsRole = "quad-cache";
            d.assignedSwapIndex = nodeIndex;
            d.targetCommit = false;
            d.finalSwapCharged = finalSwap;
          } else if (finalSwap) {
            d.finalSwapCharged = true;
            d.targetCommit = true;
            d.logisticsRole = "";
            addScaled(d.v, norm3(sub3(TMP_B, d.slot, d.p)), 0.85);
          } else {
            const nextNode = FORWARD_SWAP_NODES[Math.min(nodeIndex + 1, FORWARD_SWAP_NODES.length - 1)].p;
            addScaled(d.v, norm3(sub3(TMP_B, [nextNode[0], groundY(nextNode[0], nextNode[2]) + 6, nextNode[2]], d.p)), 0.75);
          }
        }
      }
      const releaseReady = finalSwap && d.platform === "quad" && d.battery > 0.84 && d.mode !== "return";
      if (!releaseReady && d.mode !== "field-service") addScaled(d.v, d.v, d.platform === "ground" ? -0.08 : -0.18);
      if (d.battery > 0.90) d.swapCommit = false;
      if (finalSwap && d.platform === "quad" && d.battery > 0.92) d.finalSwapCharged = true;
    }
    if ((d.lost || d.expended) && Math.random() < dt * REPLENISH_RATE[d.platform]) {
      d.lost = false;
      d.expended = false;
      d.returned = true;
      d.landed = true;
      d.alive = false;
      registerReplenish(d);
      d.p[0] = HOME[0] + rnd(-12, 12);
      d.p[2] = HOME[2] + rnd(-12, 12);
      d.p[1] = d.platform === "ground" ? groundY(d.p[0], d.p[2]) : rnd(-1.4, 1);
      d.battery = Math.max(d.battery, 0.72);
      d.supplies = 1;
    }
  }
}

function fleetReady() {
  const ready = sim.drones.filter((d) => (d.landed || d.returned) && d.battery > 0.82 && d.supplies > 0.8).length;
  return ready / DRONE_COUNT > 0.78;
}

function redeployUnit(d, index, delayMax = 10) {
  d.launched = false;
  d.launchDelay = sim.t + rnd(0, delayMax);
  d.mode = "outbound";
  d.alive = true;
  d.arrived = false;
  d.returned = false;
  d.lost = false;
  d.landed = false;
  d.expended = false;
  d.attritionLogged = false;
  d.swapCommit = false;
  d.assignedSwapIndex = -1;
  d.logisticsRole = "";
  d.targetCommit = false;
  d.finalSwapCharged = false;
  d.serviceCooldownUntil = 0;
  d.serviceReturnIntent = false;
  d.supplies = 1;
  d.targetEntry = 0;
  d.serviceUntil = 0;
  d.battery = Math.max(d.battery, d.platform === "fixed" ? 0.94 : d.platform === "ground" ? 0.88 : 0.9);
  d.p[0] = HOME[0] + rnd(-9, 9);
  d.p[2] = HOME[2] + rnd(-9, 9);
  d.p[1] = d.platform === "ground" ? groundY(d.p[0], d.p[2]) : rnd(-4, 11);
  d.v[0] = rnd(.15, .8);
  d.v[1] = d.platform === "ground" ? 0 : rnd(-.12, .12);
  d.v[2] = rnd(.05, .55);
  d.relay = d.platform === "quad" && index < RELAY_QUADS;
  d.fixedRelay = d.platform === "fixed" && index < PLATFORM_MIX.quad + RELAY_FIXED;
  d.packageCarrier = (d.platform === "fixed" && !d.fixedRelay) || (d.platform === "quad" && index >= RELAY_QUADS && index < RELAY_QUADS + PACKAGE_QUADS);
}

function redeployCycle() {
  sim.cycle += 1;
  sim.arrived = 0;
  sim.returned = 0;
  sim.supportEvents = [];
  for (let i = 0; i < sim.drones.length; i += 1) {
    const d = sim.drones[i];
    const relay = d.platform === "quad" && i < RELAY_QUADS;
    const fixedRelay = d.platform === "fixed" && i < PLATFORM_MIX.quad + RELAY_FIXED;
    d.relay = relay;
    d.fixedRelay = fixedRelay;
    redeployUnit(d, i, d.platform === "ground" || relay || fixedRelay ? 5 : d.platform === "quad" ? 24 : 36);
  }
  setPhase("launch", `cycle ${sim.cycle}: redeploying replenished swarm`);
  event(`${PLATFORM_MIX.ground} ground units and ${RELAY_FIXED} fixed-wing RF relays launch first`);
}

function rollingReplenishment() {
  if (sim.phase !== "target" && sim.phase !== "regroup") return;
  if (sim.t < sim.nextRollingLaunch && sim.coverage > 0.24) return;
  const ready = [];
  for (let i = 0; i < sim.drones.length; i += 1) {
    const d = sim.drones[i];
    if ((d.landed || d.returned || d.lost || d.expended) && d.battery > 0.82 && d.supplies > 0.82 && sim.t >= d.serviceUntil) ready.push([d, i]);
  }
  if (!ready.length) return;
  ready.sort((a, b) => platformPriority(a[0]) - platformPriority(b[0]) || Math.random() - 0.5);
  const batch = rollingBatch(ready);
  for (const [d, i] of batch) redeployUnit(d, i, 18);
  sim.cycle += 1;
  sim.nextRollingLaunch = sim.t + rnd(5, 11);
  event(`rolling replenishment packet launched: ${batch.length}`);
}

function forceTargetReseed() {
  if (sim.phase !== "target" && sim.phase !== "regroup") return;
  if (sim.coverage > 0.08) return;
  const candidates = [];
  for (let i = 0; i < sim.drones.length; i += 1) {
    const d = sim.drones[i];
    if (!d.relay && !d.fixedRelay && (d.landed || d.returned || d.lost || d.expended) && d.battery > 0.55) candidates.push([d, i]);
  }
  const batch = candidates.slice(0, 36);
  for (const [d, i] of batch) redeployUnit(d, i, 8);
  if (batch.length) event(`target memory reseed packet launched: ${batch.length}`);
}

function platformPriority(d) {
  if (d.fixedRelay) return 0;
  if (d.platform === "fixed") return 1;
  if (d.relay) return 2;
  if (d.packageCarrier) return 3;
  if (d.platform === "quad") return 4;
  return 5;
}

function rollingBatch(ready) {
  const air = ready.filter(([d]) => d.platform !== "ground");
  const ground = ready.filter(([d]) => d.platform === "ground");
  const airCount = sim.coverage < 0.20 ? 28 + Math.floor(Math.random() * 16) : 9 + Math.floor(Math.random() * 13);
  const groundNeeded = Math.max(0, FIELD_GROUND_TARGET - groundUnitsInField());
  const groundCount = sim.cycle <= 2 ? 8 : Math.min(ground.length, Math.max(groundNeeded, sim.coverage < 0.20 ? 4 : 1 + Math.floor(Math.random() * 2)));
  return air.slice(0, airCount).concat(ground.slice(0, groundCount));
}

function platformMaxSpeed(drone, inTargetArea) {
  if (drone.platform === "ground") return drone.mode === "return" ? 0.29 : 0.20;
  if (drone.platform === "fixed") {
    if (drone.fixedRelay) return drone.mode === "return" ? 1.55 : 1.02;
    if (drone.packageCarrier) return drone.mode === "return" ? 1.92 : inTargetArea ? 1.40 : 1.68;
    return drone.mode === "return" ? 1.74 : inTargetArea ? 1.18 : 1.48;
  }
  if (drone.packageCarrier) return drone.mode === "return" ? 1.42 : inTargetArea ? 0.82 : 1.22;
  if (drone.relay) return drone.mode === "return" ? 1.28 : 0.74;
  return drone.mode === "return" ? 1.45 : inTargetArea && sim.targetBehavior === "efficient" ? 0.54 : 1.18;
}

function platformBurn(drone, inTargetArea) {
  if (drone.platform === "ground") return 0.00018;
  if (drone.platform === "fixed") return drone.fixedRelay ? 0.00030 : drone.packageCarrier ? 0.00064 : inTargetArea ? 0.00036 : 0.00052;
  if (drone.packageCarrier) return inTargetArea ? 0.00074 : 0.00105;
  if (drone.relay) return 0.00046;
  return inTargetArea && sim.targetBehavior === "efficient" ? 0.00042 : inTargetArea && sim.targetBehavior === "bird" ? 0.00085 : inTargetArea && sim.targetBehavior === "random" ? 0.00115 : inTargetArea && sim.targetBehavior === "wtf" ? 0.0017 : 0.0009;
}

function applyTargetBehavior(drone, idx, steer) {
  if (drone.platform === "fixed") {
    const radial = norm3(sub3(TMP_B, drone.p, TARGET));
    const tangent = [-radial[2], 0, radial[0]];
    const desiredRadius = drone.packageCarrier ? 14 + (idx % 4) * 5 : 30 + (idx % 6) * 7;
    addScaled(steer, tangent, drone.packageCarrier ? 0.28 : 0.72);
    addScaled(steer, radial, (desiredRadius - flatDistance(drone.p, TARGET)) * (drone.packageCarrier ? 0.010 : 0.018));
    if (drone.packageCarrier) addScaled(steer, norm3(sub3(TMP_A, drone.slot, drone.p)), 0.80);
    steer[1] += (drone.slot[1] - drone.p[1]) * 0.035;
    return;
  }
  if (drone.platform === "ground") {
    const hold = sub3(TMP_B, drone.slot, drone.p);
    const d = len3(hold);
    if (d < 4) addScaled(steer, drone.v, -0.5);
    else addScaled(steer, norm3(hold), 0.38);
    steer[1] = 0;
    return;
  }
  if (drone.packageCarrier) {
    const movingSlot = [drone.slot[0] + Math.sin(sim.t * 0.32 + idx) * 2.2, drone.slot[1], drone.slot[2] + Math.cos(sim.t * 0.28 + idx) * 2.2];
    addScaled(steer, norm3(sub3(TMP_B, movingSlot, drone.p)), 0.82);
    addScaled(steer, drone.v, -0.10);
    return;
  }
  if (sim.targetBehavior === "efficient") {
    const orbit = 2.8 + (idx % 5) * 0.55;
    const slow = sim.t * 0.16 + idx * 0.73;
    const movingSlot = [drone.slot[0] + Math.cos(slow) * orbit, drone.slot[1] + Math.sin(slow * 0.7) * 1.6, drone.slot[2] + Math.sin(slow) * orbit];
    const hold = sub3(TMP_B, movingSlot, drone.p);
    const d = len3(hold);
    if (d < 5) {
      addScaled(steer, drone.v, -0.38);
      steer[1] += (movingSlot[1] - drone.p[1]) * 0.05;
    } else {
      addScaled(steer, norm3(hold), 0.55);
    }
    return;
  }
  if (sim.targetBehavior === "bird") {
    const radial = norm3(sub3(TMP_B, drone.p, TARGET));
    const tangent = [-radial[2], 0, radial[0]];
    addScaled(steer, tangent, 0.46);
    addScaled(steer, radial, (TARGET_RADIUS * 0.72 - flatDistance(drone.p, TARGET)) * 0.012);
    return;
  }
  if (sim.targetBehavior === "random") {
    steer[0] += Math.sin(sim.t * 2.7 + idx * 1.9) * 0.35;
    steer[2] += Math.cos(sim.t * 2.2 + idx * 2.1) * 0.35;
    return;
  }
  steer[0] += Math.sin(sim.t * 7.0 + idx) * 0.85;
  steer[2] += Math.cos(sim.t * 6.1 + idx * 0.37) * 0.85;
  steer[1] += Math.sin(sim.t * 5.3 + idx * 0.2) * 0.22;
}

function applyRelayBehavior(drone, idx, steer) {
  if (drone.fixedRelay) {
    const radial = norm3(sub3(TMP_B, drone.p, RELAY_BELT));
    const tangent = [-radial[2], 0, radial[0]];
    const desiredRadius = 24 + (idx % 4) * 5;
    addScaled(steer, tangent, 0.58);
    addScaled(steer, radial, (desiredRadius - flatDistance(drone.p, RELAY_BELT)) * 0.016);
    steer[1] += (drone.slot[1] - drone.p[1]) * 0.04;
    return;
  }
  const slow = sim.t * 0.12 + idx * 0.41;
  const hold = [drone.slot[0] + Math.cos(slow) * 3.5, drone.slot[1] + Math.sin(slow * 0.6) * 1.2, drone.slot[2] + Math.sin(slow) * 3.5];
  const delta = sub3(TMP_B, hold, drone.p);
  if (len3(delta) < 4) addScaled(steer, drone.v, -0.32);
  else addScaled(steer, norm3(delta), 0.42);
}

function flatDistance(a, b) {
  return Math.hypot(a[0] - b[0], a[2] - b[2]);
}

function routeProgress(p) {
  const ax = TARGET[0] - HOME[0];
  const az = TARGET[2] - HOME[2];
  const bx = p[0] - HOME[0];
  const bz = p[2] - HOME[2];
  return clamp((ax * bx + az * bz) / (ax * ax + az * az), 0, 1);
}

function nearestForwardSwap(p) {
  let best = FORWARD_SWAP_NODES[0];
  let bestD = Infinity;
  for (const node of FORWARD_SWAP_NODES) {
    const d = flatDistance(p, node.p);
    if (d < bestD) {
      best = node;
      bestD = d;
    }
  }
  return best;
}

function swapLoiterPoint(node, drone, radiusScale = 1.0) {
  const angle = drone.jitter * 8.7 + node.index * 1.9 + sim.t * (drone.platform === "ground" ? 0.035 : 0.11);
  const radius = node.r * radiusScale * (0.72 + (drone.jitter % 0.45));
  const x = node.p[0] + Math.cos(angle) * radius;
  const z = node.p[2] + Math.sin(angle) * radius;
  return [x, groundY(x, z) + (drone.platform === "ground" ? 0.45 : 6), z];
}

function swapServicePoint(node, drone) {
  const padAngle = drone.jitter * 7.3 + node.index * 0.7;
  const padRadius = drone.platform === "ground" ? node.r * 0.45 : node.r * 0.34;
  const x = node.p[0] + Math.cos(padAngle) * padRadius;
  const z = node.p[2] + Math.sin(padAngle) * padRadius;
  return [x, groundY(x, z) + (drone.platform === "ground" ? 0.45 : 0.9), z];
}

function quadSwapTarget(drone) {
  if (drone.targetCommit && drone.mode !== "return" && sim.phase !== "return") return null;
  const progress = routeProgress(drone.p);
  const direction = drone.mode === "return" || sim.phase === "return" ? -1 : 1;
  if (drone.battery < 0.72 || drone.swapCommit) {
    const candidates = direction > 0
      ? FORWARD_SWAP_NODES.filter((node) => routeProgress(node.p) > progress - 0.04)
      : [...FORWARD_SWAP_NODES].reverse().filter((node) => routeProgress(node.p) < progress + 0.04);
    const chosen = candidates[0] || nearestForwardSwap(drone.p);
    drone.swapCommit = true;
    return swapLoiterPoint(chosen, drone, chosen === FORWARD_SWAP_NODES[FORWARD_SWAP_NODES.length - 1] ? 1.65 : 1.0);
  }
  const next = FORWARD_SWAP_NODES.find((node) => routeProgress(node.p) > progress + 0.18);
  if (next && !drone.arrived && drone.battery < 0.90) {
    return swapLoiterPoint(next, drone);
  }
  return null;
}

function quadPonyTarget(drone) {
  if (drone.platform !== "quad" || drone.relay || !FORWARD_SWAP_NODES.length) return null;
  if (drone.targetCommit && drone.mode !== "return" && sim.phase !== "return") return null;
  const progress = routeProgress(drone.p);
  const last = FORWARD_SWAP_NODES[FORWARD_SWAP_NODES.length - 1];
  const returning = drone.mode === "return" || sim.phase === "return";
  if (returning) {
    return swapServicePoint(nearestForwardSwap(drone.p), drone);
  }
  if (drone.arrived) return null;
  if (flatDistance(drone.p, last.p) < FINAL_SWAP_RELEASE_RADIUS && drone.finalSwapCharged && drone.battery > FINAL_SWAP_TARGET_COMMIT_BATTERY && sim.phase !== "launch") {
    drone.targetCommit = true;
    drone.logisticsRole = "";
    drone.swapCommit = false;
    return null;
  }
  const next = FORWARD_SWAP_NODES.find((node) => routeProgress(node.p) > progress + 0.035);
  if (next) return swapServicePoint(next, drone);
  if (flatDistance(drone.p, last.p) < FINAL_SWAP_RELEASE_RADIUS && drone.finalSwapCharged && drone.battery > FINAL_SWAP_TARGET_COMMIT_BATTERY && sim.phase !== "launch") {
    drone.targetCommit = true;
    drone.logisticsRole = "";
    drone.swapCommit = false;
    return null;
  }
  return swapServicePoint(last, drone);
}

function logisticsTarget(drone) {
  if (drone.assignedSwapIndex < 0 || !drone.logisticsRole) return null;
  const current = FORWARD_SWAP_NODES[drone.assignedSwapIndex];
  const currentProgress = routeProgress(current.p);
  const finalNode = drone.assignedSwapIndex >= FORWARD_SWAP_NODES.length - 1;
  const advanceDelay = drone.platform === "ground" ? 24 : 9;
  const canAdvance = sim.phase !== "launch" && sim.t > 10 + drone.assignedSwapIndex * advanceDelay && drone.battery > (drone.platform === "ground" ? 0.72 : 0.88);
  if (!finalNode && canAdvance && flatDistance(drone.p, current.p) < current.r + 8) {
    drone.assignedSwapIndex += 1;
    drone.swapCommit = false;
  }
  if (finalNode && drone.platform === "quad" && drone.finalSwapCharged && drone.battery > FINAL_SWAP_TARGET_COMMIT_BATTERY && sim.phase !== "launch") {
    drone.logisticsRole = "";
    drone.targetCommit = true;
    drone.mode = "outbound";
    return null;
  }
  const node = FORWARD_SWAP_NODES[drone.assignedSwapIndex];
  const phase = sim.t * (drone.platform === "ground" ? 0.07 : 0.22) + currentProgress * 12 + drone.jitter;
  const orbit = drone.platform === "ground" ? node.r * 0.35 : finalNode ? node.r * 1.15 : node.r * 0.55;
  const x = node.p[0] + Math.cos(phase) * orbit;
  const z = node.p[2] + Math.sin(phase) * orbit;
  const y = drone.platform === "ground" ? groundY(x, z) : groundY(node.p[0], node.p[2]) + 5.8;
  return [x, y, z];
}

function groundForwardBaseTarget(drone) {
  if (drone.platform !== "ground" || !FORWARD_SWAP_NODES.length) return null;
  const returning = drone.mode === "return" || sim.phase === "return";
  if (!returning) return null;
  const node = nearestForwardSwap(drone.p);
  const d = flatDistance(drone.p, node.p);
  if (d < node.r + 7) {
    drone.mode = "staged-ground";
    drone.logisticsRole = "ground-cache";
    drone.assignedSwapIndex = FORWARD_SWAP_NODES.indexOf(node);
    drone.returned = false;
    drone.landed = false;
    drone.battery = Math.max(drone.battery, 0.55);
    return swapLoiterPoint(node, drone, 0.62);
  }
  if (flatDistance(drone.p, HOME) < 30 && routeProgress(drone.p) < routeProgress(FORWARD_SWAP_NODES[0].p) * 0.45) return null;
  return swapLoiterPoint(node, drone, 0.72);
}

function groundUnitsInField() {
  return sim.drones.filter((d) =>
    d.platform === "ground" &&
    d.alive &&
    d.launched &&
    d.mode !== "return" &&
    flatDistance(d.p, HOME) > 35
  ).length;
}

function landDrone(drone) {
  drone.returned = true;
  drone.landed = true;
  drone.alive = false;
  drone.serviceUntil = sim.t + rnd(8, 18);
  drone.p[0] = HOME[0] + rnd(-10, 10);
  drone.p[2] = HOME[2] + rnd(-10, 10);
  drone.p[1] = drone.platform === "ground" ? groundY(drone.p[0], drone.p[2]) : -1.6 + rnd(0, 1.2);
  drone.v[0] = 0;
  drone.v[1] = 0;
  drone.v[2] = 0;
}

function applyAttrition(drone, dt) {
  if (drone.mode === "return") return;
  const distanceToTarget = dist3(drone.p, TARGET);
  const targetExposure = clamp(1 - distanceToTarget / 62, 0, 1);
  const routeExposure = drone.arrived ? 0.5 : clamp((drone.p[0] - HOME[0]) / (TARGET[0] - HOME[0]), 0, 1) * 0.22;
  const degradation = (1 - sim.comms) * 0.45 + (1 - sim.gps) * 0.28 + (1 - sim.cohesion) * 0.27;
  const packageRisk = drone.packageCarrier ? (drone.platform === "fixed" ? 0.010 : 0.005) : 0;
  const risk = (0.0008 + targetExposure * (0.010 + packageRisk) + routeExposure * 0.004) * (0.45 + degradation);
  if (Math.random() < risk * dt) {
    drone.alive = false;
    drone.lost = true;
    registerAttrition(drone);
    drone.serviceUntil = sim.t + rnd(10, 22);
    drone.v[0] = 0;
    drone.v[1] = 0;
    drone.v[2] = 0;
  }
}

function updateWorld(dt) {
  sim.t += dt;
  const week = Math.floor(missionMinutes() / WEEK_MINUTES);
  if (week !== sim.weekIndex) {
    sim.weekIndex = week;
    sim.weekAttrition = emptyLogistics();
    sim.weekReplenish = emptyLogistics();
    event(`weekly logistics window rolled: week ${week + 1}`);
  }
  updateSupportEvents(dt);
  sim.comms = clamp(0.82 + Math.sin(sim.t * 0.09) * 0.16 - Math.max(0, sim.t - 52) * 0.002, 0.25, 1);
  sim.gps = clamp(0.88 + Math.cos(sim.t * 0.07) * 0.11 - (sim.phase === "target" ? 0.12 : 0), 0.35, 1);
  serviceFleet(dt);
  if (sim.t - sim.cyclePhaseStart > 4 && sim.phase === "launch") setPhase("outbound", "phase shift: outbound to target area");
  if (sim.phase === "service") {
    if (fleetReady() && sim.t - sim.cyclePhaseStart > 10) redeployCycle();
  }

  for (let i = 0; i < sim.drones.length; i += 1) updateDrone(sim.drones[i], i, dt);
  maintainContinuousCoverage();
  rollingReplenishment();
  forceTargetReseed();
  maybeCallSupport(dt);

  const active = sim.drones.filter((d) => d.alive && d.launched);
  const arrived = sim.drones.filter((d) => d.arrived).length;
  const returned = sim.drones.filter((d) => d.returned).length;
  sim.arrived = arrived / DRONE_COUNT;
  sim.returned = returned / DRONE_COUNT;
  sim.coverage = estimateTargetCoverage(active);
  sim.battery = active.length ? active.reduce((s, d) => s + d.battery, 0) / active.length : 0;
  sim.cohesion = estimateCohesion(active);

  if (sim.phase === "outbound" && sim.arrived > 0.62) setPhase("target", "target area saturated: begin loiter/survey");
  if ((sim.phase === "target" || sim.phase === "regroup") && (sim.t > 58 || sim.arrived > 0.78)) {
    let ordered = 0;
    let groundFieldCount = groundUnitsInField();
    for (const d of sim.drones) {
      const rotateGround = d.platform === "ground" && groundFieldCount > FIELD_GROUND_TARGET && d.supplies < 0.35;
      const rotateRelay = d.relay && d.alive && d.mode !== "return";
      if ((rotateGround || rotateRelay) && d.alive && d.mode !== "return") {
        d.mode = "return";
        if (d.platform === "ground") groundFieldCount -= 1;
        ordered += 1;
      }
    }
    if (ordered) event(`surface/relay rotation starts early return: ${ordered}`);
  }
  if (sim.phase === "target" && (sim.battery < 0.42 || sim.comms < 0.38)) setPhase("regroup", "belief action: thin coverage and rotate units");
  if (sim.phase === "regroup" && sim.coverage > 0.42 && sim.comms > 0.45) setPhase("target", "coverage restored: continuous target pressure");
  if ((sim.phase === "target" || sim.phase === "regroup") && sim.battery < 0.24 && sim.coverage < 0.18) { setPhase("return", "belief action: emergency recovery"); for (const d of sim.drones) d.mode = "return"; }
  if (sim.phase === "return" && (sim.returned > 0.86 || active.length <= DRONE_COUNT * 0.08)) setPhase("service", "regroup/recharge/reload: mission cycle service");
}

function estimateTargetCoverage(active) {
  const onTarget = active.filter((d) => d.arrived && d.mode !== "return" && dist3(d.p, TARGET) < TARGET_RADIUS * 2.7).length;
  return clamp(onTarget / 210, 0, 1);
}

function maintainContinuousCoverage() {
  if (sim.phase !== "target" && sim.phase !== "regroup") return;
  const groundFieldCount = groundUnitsInField();
  for (const d of sim.drones) {
    if (!d.alive || !d.launched || d.mode === "return" || !d.arrived) continue;
    const dwell = sim.t - d.targetEntry;
    const maxDwell = d.platform === "ground" ? 34 : d.platform === "fixed" ? 46 : d.relay ? 42 : 54;
    const low = d.battery < (d.platform === "fixed" ? 0.35 : 0.42) || d.supplies < 0.2;
    const coverageThin = sim.coverage < 0.34;
    const preserveGround = d.platform === "ground" && groundFieldCount <= FIELD_GROUND_TARGET;
    if (low || (!preserveGround && !coverageThin && dwell > maxDwell + rnd(-5, 7))) d.mode = "return";
  }
}

function estimateCohesion(active) {
  if (!active.length) return 0;
  const center = [0, 0, 0];
  for (const d of active) addScaled(center, d.p, 1 / active.length);
  const avg = active.reduce((sum, d) => sum + dist3(d.p, center), 0) / active.length;
  return clamp(1 - avg / 92, 0, 1);
}

function belief() {
  const riskBattery = 1 - sim.battery;
  const riskCohesion = 1 - sim.cohesion;
  const riskComms = 1 - sim.comms;
  const riskGps = 1 - sim.gps;
  const returnNeed = clamp(riskBattery * 0.72 + riskComms * 0.18 + riskCohesion * 0.10, 0, 1);
  const regroupNeed = clamp(riskCohesion * 0.48 + riskComms * 0.34 + riskGps * 0.18, 0, 1);
  const missionViable = clamp(1 - (returnNeed * 0.62 + regroupNeed * 0.22 + riskGps * 0.16), 0, 1);
  let action = "continue mission";
  if (sim.phase === "service") action = "recharge reload redeploy";
  else if (sim.phase === "launch" && sim.cycle > 1) action = "seed rolling pressure";
  else if (returnNeed > 0.54) action = "return low-battery units";
  else if ((sim.phase === "target" || sim.phase === "regroup") && sim.coverage < 0.25) action = "reseed target area";
  else if (regroupNeed > 0.48) action = "rotate coverage packets";
  else if (sim.phase === "target") action = "continuous harassment";
  else if (sim.phase === "return") action = "recover at home base";
  return { missionViable, regroupNeed, returnNeed, action };
}

function qualityLabel(value) {
  if (value > 0.72) return ["good", "good"];
  if (value > 0.45) return ["degraded", "warn"];
  return ["critical", "bad"];
}

function setMeter(el, value) {
  el.style.width = `${Math.round(value * 100)}%`;
  el.style.background = value > 0.72 ? "var(--green)" : value > 0.45 ? "var(--amber)" : "var(--red)";
}

function updateHud() {
  const active = sim.drones.filter((d) => d.alive && d.launched).length;
  const b = belief();
  hud.phase.textContent = sim.phase;
  hud.cycle.textContent = String(sim.cycle);
  hud.elapsed.textContent = `${formatMissionClock(missionMinutes())} / ${HOME_TO_TARGET_MILES} mi`;
  hud.count.textContent = `${active} mobile`;
  hud.mix.textContent = `${PLATFORM_MIX.quad}Q ${PLATFORM_MIX.fixed}F ${PLATFORM_MIX.ground}G`;
  hud.arrived.textContent = `${Math.round(sim.arrived * 100)}%`;
  hud.returned.textContent = `${Math.round(sim.returned * 100)}%`;
  hud.losses.textContent = `${Math.round(sim.drones.filter((d) => d.lost).length / DRONE_COUNT * 100)}%`;
  hud.weekAttrition.textContent = logisticsText(sim.weekAttrition);
  hud.weekReplenish.textContent = logisticsText(sim.weekReplenish);
  hud.weekNet.textContent = logisticsText({
    quad: sim.weekReplenish.quad - sim.weekAttrition.quad,
    fixed: sim.weekReplenish.fixed - sim.weekAttrition.fixed,
    ground: sim.weekReplenish.ground - sim.weekAttrition.ground
  });
  const stagedQuad = sim.drones.filter((d) => d.platform === "quad" && d.logisticsRole && d.alive && d.launched).length;
  const stagedGround = sim.drones.filter((d) => d.platform === "ground" && d.logisticsRole && d.alive && d.launched).length;
  hud.forwardStage.textContent = `${stagedQuad}X ${stagedGround}G`;
  hud.effects.textContent = String(sim.effects);
  hud.supportCalls.textContent = String(sim.supportCalls);
  hud.coverage.textContent = `${Math.round(sim.coverage * 100)}%`;
  hud.battery.textContent = `${Math.round(sim.battery * 100)}%`;
  hud.beliefMission.textContent = `${Math.round(b.missionViable * 100)}%`;
  hud.beliefRegroup.textContent = `${Math.round(b.regroupNeed * 100)}%`;
  hud.beliefReturn.textContent = `${Math.round(b.returnNeed * 100)}%`;
  hud.action.textContent = b.action;
  sim.targetBehavior = document.getElementById("targetBehavior").value;
  for (const [key, value] of [["cohesion", sim.cohesion], ["comms", sim.comms], ["gps", sim.gps]]) {
    const [label, cls] = qualityLabel(value);
    hud[key].textContent = label;
    hud[key].className = cls;
  }
  setMeter(hud.batteryMeter, sim.battery);
  setMeter(hud.cohesionMeter, sim.cohesion);
  setMeter(hud.commsMeter, sim.comms);
  setMeter(hud.gpsMeter, sim.gps);
}

function pushPoint(offset, p, color, size) {
  pointData[offset] = p[0];
  pointData[offset + 1] = p[1];
  pointData[offset + 2] = p[2];
  pointData[offset + 3] = color[0];
  pointData[offset + 4] = color[1];
  pointData[offset + 5] = color[2];
  pointData[offset + 6] = size;
}

function pushLineVertex(offset, p, color) {
  lineData[offset] = p[0];
  lineData[offset + 1] = p[1];
  lineData[offset + 2] = p[2];
  lineData[offset + 3] = color[0];
  lineData[offset + 4] = color[1];
  lineData[offset + 5] = color[2];
}

function arcPoint(start, end, t, height) {
  return [
    start[0] + (end[0] - start[0]) * t,
    start[1] + (end[1] - start[1]) * t + Math.sin(t * Math.PI) * height,
    start[2] + (end[2] - start[2]) * t
  ];
}

function quadraticPoint(a, b, c, t) {
  const u = 1 - t;
  return [
    u * u * a[0] + 2 * u * t * b[0] + t * t * c[0],
    u * u * a[1] + 2 * u * t * b[1] + t * t * c[1],
    u * u * a[2] + 2 * u * t * b[2] + t * t * c[2]
  ];
}

function buildPoints() {
  let o = 0;
  for (let i = 0; i < TERRAIN_DOTS; i += 1) {
    const x = -126 + terrainNoise(i, 1.7) * 252;
    const z = -106 + terrainNoise(i, 9.3) * 212;
    const y = terrainHeight(x, z) - 0.18;
    const shade = 0.11 + terrainNoise(i, 4.1) * 0.08;
    const green = 0.17 + terrainNoise(i, 6.4) * 0.10;
    pushPoint(o, [x, y, z], [shade, green, 0.12], 1.8 + terrainNoise(i, 2.2) * 1.8);
    o += pointStride;
  }
  for (const obstacle of OBSTACLES) {
    const centerY = terrainHeight(obstacle.p[0], obstacle.p[2]);
    pushPoint(o, [obstacle.p[0], centerY + obstacle.h * 0.18, obstacle.p[2]], [0.28, 0.39, 0.22], 10);
    o += pointStride;
    for (let i = 0; i < 12; i += 1) {
      const a = i / 12 * Math.PI * 2;
      const x = obstacle.p[0] + Math.cos(a) * obstacle.r;
      const z = obstacle.p[2] + Math.sin(a) * obstacle.r;
      pushPoint(o, [x, terrainHeight(x, z) + 0.2, z], [0.19, 0.31, 0.17], 4.8);
      o += pointStride;
    }
  }
  for (const node of FORWARD_SWAP_NODES) {
    const y = groundY(node.p[0], node.p[2]) + 0.45;
    pushPoint(o, [node.p[0], y, node.p[2]], [0.44, 1.0, 0.72], 9);
    o += pointStride;
    for (let i = 0; i < 8; i += 1) {
      const a = i / 8 * Math.PI * 2;
      pushPoint(o, [node.p[0] + Math.cos(a) * node.r, groundY(node.p[0] + Math.cos(a) * node.r, node.p[2] + Math.sin(a) * node.r) + 0.2, node.p[2] + Math.sin(a) * node.r], [0.20, 0.78, 0.48], 3.8);
      o += pointStride;
    }
  }
  for (const d of sim.drones) {
    const color = glyphColor(d);
    pushPoint(o, d.p, color, d.landed ? 4.4 : d.lost ? 2.2 : d.platform === "ground" ? 4.2 : d.platform === "fixed" ? 5 : 5.5);
    o += pointStride;
  }
  for (let i = 0; i < 9; i += 1) {
    const a = i / 9 * Math.PI * 2;
    pushPoint(o, [HOME[0] + Math.cos(a) * HOME_RADIUS, 0, HOME[2] + Math.sin(a) * HOME_RADIUS], [0.22, 0.85, 1], 7);
    o += pointStride;
    pushPoint(o, [TARGET[0] + Math.cos(a) * TARGET_RADIUS, 0, TARGET[2] + Math.sin(a) * TARGET_RADIUS], [0.22, 0.85, 1], 7);
    o += pointStride;
  }
  for (const gun of ARTILLERY) {
    pushPoint(o, gun, [1, 0.88, 0.43], 10);
    o += pointStride;
  }
  for (const support of sim.supportEvents) {
    const progress = clamp(support.age / support.duration, 0, 1);
    if (support.relay && progress < 0.72) {
      const relayPulse = 8 * (1 - progress) + 3;
      pushPoint(o, support.relay, [0.46, 1, 0.92], relayPulse);
      o += pointStride;
    }
    if (progress > 0.62) {
      const pulse = 16 * (1 - progress) + 5;
      pushPoint(o, [support.impact[0], 2, support.impact[2]], [1, 0.42, 0.16], pulse);
      o += pointStride;
    }
  }
  return o / pointStride;
}

function buildLines() {
  let o = 0;
  lineMeta.supportStarts = [];
  const gridColor = [0.07, 0.24, 0.22];
  for (let x = TERRAIN_X_MIN; x < TERRAIN_X_MAX; x += TERRAIN_GRID_STEP) {
    for (let z = TERRAIN_Z_MIN; z <= TERRAIN_Z_MAX; z += TERRAIN_GRID_STEP) {
      const a = [x, terrainHeight(x, z) - 0.10, z];
      const b = [x + TERRAIN_GRID_STEP, terrainHeight(x + TERRAIN_GRID_STEP, z) - 0.10, z];
      o = lineSegment(o, a, b, gridColor);
    }
  }
  for (let z = TERRAIN_Z_MIN; z < TERRAIN_Z_MAX; z += TERRAIN_GRID_STEP) {
    for (let x = TERRAIN_X_MIN; x <= TERRAIN_X_MAX; x += TERRAIN_GRID_STEP) {
      const a = [x, terrainHeight(x, z) - 0.10, z];
      const b = [x, terrainHeight(x, z + TERRAIN_GRID_STEP) - 0.10, z + TERRAIN_GRID_STEP];
      o = lineSegment(o, a, b, gridColor);
    }
  }
  const swapColor = [0.18, 0.70, 0.48];
  for (let i = 0; i < FORWARD_SWAP_NODES.length - 1; i += 1) {
    const a = FORWARD_SWAP_NODES[i].p;
    const b = FORWARD_SWAP_NODES[i + 1].p;
    o = lineSegment(o, [a[0], groundY(a[0], a[2]) + 0.35, a[2]], [b[0], groundY(b[0], b[2]) + 0.35, b[2]], swapColor);
  }
  for (const d of sim.drones) {
    if (!d.launched || d.landed) continue;
    const color = glyphColor(d);
    const s = d.platform === "ground" ? 2.3 : d.platform === "fixed" ? 2.55 : 2.15;
    const p = d.p;
    if (d.platform === "fixed") {
      const forward = norm3([d.v[0], 0, d.v[2]]);
      const right = [-forward[2], 0, forward[0]];
      const nose = [p[0] + forward[0] * s * 1.2, p[1], p[2] + forward[2] * s * 1.2];
      const leftWing = [p[0] - forward[0] * s * 0.65 - right[0] * s, p[1], p[2] - forward[2] * s * 0.65 - right[2] * s];
      const rightWing = [p[0] - forward[0] * s * 0.65 + right[0] * s, p[1], p[2] - forward[2] * s * 0.65 + right[2] * s];
      o = lineSegment(o, leftWing, nose, color);
      o = lineSegment(o, nose, rightWing, color);
    } else if (d.platform === "ground") {
      const y = p[1] + 0.25;
      const a = [p[0] - s, y, p[2] - s];
      const b = [p[0] + s, y, p[2] - s];
      const c = [p[0] + s, y, p[2] + s];
      const e = [p[0] - s, y, p[2] + s];
      o = lineSegment(o, a, b, color);
      o = lineSegment(o, b, c, color);
      o = lineSegment(o, c, e, color);
      o = lineSegment(o, e, a, color);
    } else {
      const y = p[1];
      o = lineSegment(o, [p[0] - s, y, p[2] - s], [p[0] + s, y, p[2] + s], color);
      o = lineSegment(o, [p[0] - s, y, p[2] + s], [p[0] + s, y, p[2] - s], color);
    }
  }
  lineMeta.baseVertices = o / lineStride;
  for (const support of sim.supportEvents) {
    const progress = clamp(support.age / support.duration, 0, 1);
    const color = [1, 0.86, 0.38];
    const visible = Math.max(2, Math.floor(progress * 26));
    const start = support.gun;
    const relay = support.relay || RELAY_BELT;
    const control = [relay[0], relay[1] + 70, relay[2]];
    lineMeta.supportStarts.push({ start: o / lineStride, vertices: visible });
    for (let i = 0; i < visible; i += 1) {
      const t = i / 25;
      pushLineVertex(o, quadraticPoint(start, control, support.impact, t), color);
      o += lineStride;
    }
  }
  return o / lineStride;
}

function render() {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  gl.viewport(0, 0, width, height);
  gl.clearColor(0.01, 0.015, 0.025, 1);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
  gl.lineWidth(2);

  const cam = sim.camera;
  const cp = Math.cos(cam.pitch);
  const eye = [
    Math.sin(cam.yaw) * cp * cam.distance,
    Math.sin(cam.pitch) * cam.distance,
    Math.cos(cam.yaw) * cp * cam.distance
  ];
  const matrix = multiply(perspective(Math.PI / 4, width / height, 1, 900), lookAt(eye, [0, 4, 0], [0, 1, 0]));

  const count = buildPoints();
  gl.useProgram(pointProgram);
  gl.uniformMatrix4fv(uMatrix, false, new Float32Array(matrix));
  gl.bindBuffer(gl.ARRAY_BUFFER, pointBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, pointData, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(aPosition);
  gl.enableVertexAttribArray(aColor);
  gl.enableVertexAttribArray(aSize);
  gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, pointStride * 4, 0);
  gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, pointStride * 4, 3 * 4);
  gl.vertexAttribPointer(aSize, 1, gl.FLOAT, false, pointStride * 4, 6 * 4);
  gl.drawArrays(gl.POINTS, 0, count);

  const lineCount = buildLines();
  if (lineCount) {
    gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, lineData, gl.DYNAMIC_DRAW);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, lineStride * 4, 0);
    gl.vertexAttribPointer(aColor, 3, gl.FLOAT, false, lineStride * 4, 3 * 4);
    gl.disableVertexAttribArray(aSize);
    gl.vertexAttrib1f(aSize, 1);
    gl.drawArrays(gl.LINES, 0, lineMeta.baseVertices);
    for (const supportLine of lineMeta.supportStarts) gl.drawArrays(gl.LINE_STRIP, supportLine.start, supportLine.vertices);
    gl.enableVertexAttribArray(aSize);
  }
}

let last = performance.now();
function frame(now) {
  const dt = Math.min(0.05, (now - last) / 1000);
  last = now;
  updateWorld(dt);
  updateHud();
  render();
  requestAnimationFrame(frame);
}

canvas.addEventListener("pointerdown", (event) => {
  sim.camera.dragging = true;
  sim.camera.x = event.clientX;
  sim.camera.y = event.clientY;
  canvas.setPointerCapture(event.pointerId);
});
canvas.addEventListener("pointermove", (event) => {
  if (!sim.camera.dragging) return;
  const dx = event.clientX - sim.camera.x;
  const dy = event.clientY - sim.camera.y;
  sim.camera.x = event.clientX;
  sim.camera.y = event.clientY;
  sim.camera.yaw -= dx * 0.006;
  sim.camera.pitch = clamp(sim.camera.pitch + dy * 0.004, 0.18, 1.32);
});
canvas.addEventListener("pointerup", () => { sim.camera.dragging = false; });
canvas.addEventListener("wheel", (event) => {
  event.preventDefault();
  sim.camera.distance = clamp(sim.camera.distance + event.deltaY * 0.18, 120, 430);
}, { passive: false });

document.getElementById("reset").addEventListener("click", reset);
document.getElementById("targetBehavior").addEventListener("change", (change) => {
  sim.targetBehavior = change.target.value;
  event(`target behavior set: ${sim.targetBehavior}`);
});
reset();
requestAnimationFrame(frame);
