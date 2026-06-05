"use strict";

const canvas = document.getElementById("swarm"); 
const gl = canvas.getContext("webgl", { antialias: true, alpha: false });
if (!gl) throw new Error("WebGL is required for this demo.");

const DRONE_COUNT = 500;
const WORLD = 220;
const HOME = [-78, 0, -40];
const TARGET = [78, 0, 42];
const TARGET_RADIUS = 24;
const HOME_RADIUS = 18;
const PLATFORM_MIX = { quad: 330, fixed: 120, ground: 50 };
const RELAY_QUADS = 14;
const RELAY_FIXED = 6;
const RELAY_BELT = [-18, 9, 2];
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
  "beliefMission", "beliefRegroup", "beliefReturn", "action", "log"
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
const pointData = new Float32Array((DRONE_COUNT + 18 + 360) * pointStride);
const lineBuffer = gl.createBuffer();
const lineStride = 6;
const lineData = new Float32Array(2400 * lineStride);

function rnd(min, max) { return min + Math.random() * (max - min); }
function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
function len3(a) { return Math.hypot(a[0], a[1], a[2]); }
function dist3(a, b) { return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); }
function sub3(out, a, b) { out[0] = a[0] - b[0]; out[1] = a[1] - b[1]; out[2] = a[2] - b[2]; return out; }
function norm3(out) { const l = len3(out) || 1; out[0] /= l; out[1] /= l; out[2] /= l; return out; }
function addScaled(out, a, s) { out[0] += a[0] * s; out[1] += a[1] * s; out[2] += a[2] * s; return out; }

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
  log: [],
  camera: { yaw: -0.75, pitch: 0.72, distance: 265, dragging: false, x: 0, y: 0 },
  drones: []
};

function event(message) {
  const stamp = sim.t.toFixed(1).padStart(5, " ");
  sim.log.unshift(`${stamp}s  ${message}`);
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
  sim.log = [];
  sim.drones = [];
  for (let i = 0; i < DRONE_COUNT; i += 1) {
    const platform = i < PLATFORM_MIX.quad ? "quad" : i < PLATFORM_MIX.quad + PLATFORM_MIX.fixed ? "fixed" : "ground";
    const relay = platform === "quad" && i < RELAY_QUADS;
    const fixedRelay = platform === "fixed" && i < PLATFORM_MIX.quad + RELAY_FIXED;
    sim.drones.push({
      platform,
      relay,
      fixedRelay,
      launched: false,
      launchDelay: platform === "ground" || relay ? rnd(0, 5) : platform === "quad" ? rnd(12, 24) : rnd(24, 36),
      p: [HOME[0] + rnd(-9, 9), platform === "ground" ? -2.4 : rnd(-4, 11), HOME[2] + rnd(-9, 9)],
      v: [rnd(.15, .8), platform === "ground" ? 0 : rnd(-.12, .12), rnd(.05, .55)],
      battery: platform === "fixed" ? rnd(.93, 1) : platform === "ground" ? rnd(.86, .96) : rnd(.88, 1),
      mode: "outbound",
      alive: true,
      arrived: false,
      returned: false,
      lost: false,
      landed: false,
      expended: false,
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
    drone.slot = [TARGET[0] + Math.cos(angle) * radius, platform === "ground" ? -2.2 : platform === "fixed" ? rnd(16, 27) : rnd(3, 13), TARGET[2] + Math.sin(angle) * radius];
    if (relay || fixedRelay) {
      const relayAngle = (i % 60) / 60 * Math.PI * 2;
      const relayRadius = fixedRelay ? 24 + (i % 4) * 5 : 12 + (i % 5) * 2.6;
      drone.slot = [RELAY_BELT[0] + Math.cos(relayAngle) * relayRadius, fixedRelay ? 18 + (i % 3) * 3 : 8 + (i % 4), RELAY_BELT[2] + Math.sin(relayAngle) * relayRadius];
    }
  }
  event("mission reset: launch from home base");
  event(`${PLATFORM_MIX.ground} ground units and ${RELAY_QUADS} RF relay quads launch first`);
}

function phaseTarget(drone) {
  if (!drone.launched) return HOME;
  if (drone.mode === "return") return HOME;
  if (sim.phase === "return") return HOME;
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
  const target = phaseTarget(drone);
  const perception = drone.platform === "ground" ? 10 + sim.comms * 8 : 18 + sim.comms * 18;
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
  const inTargetArea = (sim.phase === "target" || drone.mode === "loiter") && drone.arrived;
  const inRelayArea = (drone.relay || drone.fixedRelay) && drone.launched && drone.mode !== "return";
  addScaled(steer, norm3(sub3(TMP_A, target, drone.p)), drone.mode === "return" ? 1.35 : inTargetArea && (sim.targetBehavior === "efficient" || drone.platform !== "quad") ? 1.05 : 0.85);
  if (neighbors) {
    cohesion[0] = cohesion[0] / neighbors - drone.p[0];
    cohesion[1] = cohesion[1] / neighbors - drone.p[1];
    cohesion[2] = cohesion[2] / neighbors - drone.p[2];
    addScaled(steer, norm3(cohesion), 0.22 * sim.comms);
    addScaled(steer, norm3(alignment), 0.18 * sim.comms);
    addScaled(steer, separation, 1.6);
  }

  const gpsNoise = (1 - sim.gps) * 0.45;
  steer[0] += Math.sin(sim.t * 1.7 + idx) * gpsNoise;
  steer[2] += Math.cos(sim.t * 1.35 + idx * 0.7) * gpsNoise;
  steer[1] += Math.sin(sim.t * 1.1 + idx * 0.31) * 0.03;
  if (inTargetArea) applyTargetBehavior(drone, idx, steer);
  if (inRelayArea) applyRelayBehavior(drone, idx, steer);
  applyFixedWingEffect(drone, dt);
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
  drone.p[1] = drone.platform === "ground" ? -2.4 : clamp(drone.p[1], -3, 30);
  const behaviorBurn = platformBurn(drone, inTargetArea);
  drone.battery -= dt * (0.0016 + speed * behaviorBurn + (drone.mode === "return" ? 0.0004 : 0));
  applyAttrition(drone, dt);
  if (!drone.alive) return;
  if (drone.battery < 0.23 && drone.mode !== "return") drone.mode = "return";
  if (drone.battery <= 0) {
    drone.alive = false;
    drone.lost = true;
    drone.serviceUntil = sim.t + rnd(10, 22);
    return;
  }
  if (!drone.arrived && !(drone.relay || drone.fixedRelay) && dist3(drone.p, TARGET) < TARGET_RADIUS) {
    drone.arrived = true;
    drone.targetEntry = sim.t;
    if (sim.phase === "outbound") drone.mode = "loiter";
  }
  if (drone.mode === "return" && (dist3(drone.p, HOME) < HOME_RADIUS || flatDistance(drone.p, HOME) < (drone.platform === "fixed" ? 34 : 24))) landDrone(drone);
}

function applyFixedWingEffect(drone, dt) {
  if (drone.platform !== "fixed" || drone.expended || drone.supplies <= 0 || sim.phase !== "target" || !drone.arrived) return;
  const effectRate = sim.targetBehavior === "wtf" ? 0.028 : sim.targetBehavior === "random" ? 0.018 : 0.012;
  if (Math.random() < effectRate * dt) {
    drone.expended = true;
    drone.supplies = 0;
    drone.alive = false;
    drone.lost = true;
    drone.serviceUntil = sim.t + rnd(8, 18);
    sim.effects += 1;
    if (sim.effects <= 5 || sim.effects % 10 === 0) event(`fixed-wing expendable effect recorded: ${sim.effects}`);
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
    if (d.platform === "ground") d.p[1] = -2.4;
    const atHome = d.landed || d.returned || d.lost || d.expended || flatDistance(d.p, HOME) < 38;
    if (!atHome) continue;
    d.battery = clamp(d.battery + dt * (d.platform === "ground" ? 0.16 : d.platform === "fixed" ? 0.22 : 0.26), 0, 1);
    d.supplies = clamp(d.supplies + dt * 0.34, 0, 1);
    if ((d.lost || d.expended) && Math.random() < dt * 0.35) {
      d.lost = false;
      d.expended = false;
      d.returned = true;
      d.landed = true;
      d.alive = false;
      d.p[0] = HOME[0] + rnd(-12, 12);
      d.p[1] = d.platform === "ground" ? -2.4 : rnd(-1.4, 1);
      d.p[2] = HOME[2] + rnd(-12, 12);
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
  d.supplies = 1;
  d.targetEntry = 0;
  d.serviceUntil = 0;
  d.battery = Math.max(d.battery, d.platform === "fixed" ? 0.94 : d.platform === "ground" ? 0.88 : 0.9);
  d.p[0] = HOME[0] + rnd(-9, 9);
  d.p[1] = d.platform === "ground" ? -2.4 : rnd(-4, 11);
  d.p[2] = HOME[2] + rnd(-9, 9);
  d.v[0] = rnd(.15, .8);
  d.v[1] = d.platform === "ground" ? 0 : rnd(-.12, .12);
  d.v[2] = rnd(.05, .55);
  d.relay = d.platform === "quad" && index < RELAY_QUADS;
  d.fixedRelay = d.platform === "fixed" && index < PLATFORM_MIX.quad + RELAY_FIXED;
}

function redeployCycle() {
  sim.cycle += 1;
  sim.arrived = 0;
  sim.returned = 0;
  sim.supportEvents = [];
  for (let i = 0; i < sim.drones.length; i += 1) {
    const d = sim.drones[i];
    const relay = d.platform === "quad" && i < RELAY_QUADS;
    d.relay = relay;
    redeployUnit(d, i, d.platform === "ground" || relay ? 5 : d.platform === "quad" ? 24 : 36);
  }
  setPhase("launch", `cycle ${sim.cycle}: redeploying replenished swarm`);
  event(`${PLATFORM_MIX.ground} ground units and ${RELAY_QUADS} RF relay quads launch first`);
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
  const batchSize = sim.coverage < 0.20 ? 32 + Math.floor(Math.random() * 20) : 10 + Math.floor(Math.random() * 16);
  const batch = ready.slice(0, batchSize);
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
  if (d.platform === "fixed") return 0;
  if (d.relay) return 1;
  if (d.platform === "quad") return 2;
  return 3;
}

function platformMaxSpeed(drone, inTargetArea) {
  if (drone.platform === "ground") return drone.mode === "return" ? 0.34 : 0.26;
  if (drone.platform === "fixed") return drone.mode === "return" ? 1.7 : inTargetArea ? 1.05 : 1.35;
  return drone.mode === "return" ? 1.45 : inTargetArea && sim.targetBehavior === "efficient" ? 0.54 : 1.18;
}

function platformBurn(drone, inTargetArea) {
  if (drone.platform === "ground") return 0.00028;
  if (drone.platform === "fixed") return inTargetArea ? 0.00036 : 0.00052;
  return inTargetArea && sim.targetBehavior === "efficient" ? 0.00042 : inTargetArea && sim.targetBehavior === "bird" ? 0.00085 : inTargetArea && sim.targetBehavior === "random" ? 0.00115 : inTargetArea && sim.targetBehavior === "wtf" ? 0.0017 : 0.0009;
}

function applyTargetBehavior(drone, idx, steer) {
  if (drone.platform === "fixed") {
    const radial = norm3(sub3(TMP_B, drone.p, TARGET));
    const tangent = [-radial[2], 0, radial[0]];
    const desiredRadius = 28 + (idx % 5) * 6;
    addScaled(steer, tangent, 0.66);
    addScaled(steer, radial, (desiredRadius - flatDistance(drone.p, TARGET)) * 0.018);
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

function landDrone(drone) {
  drone.returned = true;
  drone.landed = true;
  drone.alive = false;
  drone.serviceUntil = sim.t + rnd(8, 18);
  drone.p[0] = HOME[0] + rnd(-10, 10);
  drone.p[1] = -1.6 + rnd(0, 1.2);
  drone.p[2] = HOME[2] + rnd(-10, 10);
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
  const risk = (0.0008 + targetExposure * 0.010 + routeExposure * 0.004) * (0.45 + degradation);
  if (Math.random() < risk * dt) {
    drone.alive = false;
    drone.lost = true;
    drone.serviceUntil = sim.t + rnd(10, 22);
    drone.v[0] = 0;
    drone.v[1] = 0;
    drone.v[2] = 0;
  }
}

function updateWorld(dt) {
  sim.t += dt;
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
    for (const d of sim.drones) {
      if ((d.platform === "ground" || d.relay) && d.alive && d.mode !== "return") {
        d.mode = "return";
        ordered += 1;
      }
    }
    if (ordered) event(`ground units plus relay quads start early return: ${ordered}`);
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
  for (const d of sim.drones) {
    if (!d.alive || !d.launched || d.mode === "return" || !d.arrived) continue;
    const dwell = sim.t - d.targetEntry;
    const maxDwell = d.platform === "ground" ? 34 : d.platform === "fixed" ? 46 : d.relay ? 42 : 54;
    const low = d.battery < (d.platform === "fixed" ? 0.35 : 0.42) || d.supplies < 0.2;
    const coverageThin = sim.coverage < 0.34;
    if (low || (!coverageThin && dwell > maxDwell + rnd(-5, 7))) d.mode = "return";
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
  hud.elapsed.textContent = `${sim.t.toFixed(1)} s`;
  hud.count.textContent = `${active} mobile`;
  hud.mix.textContent = `${PLATFORM_MIX.quad}Q ${PLATFORM_MIX.fixed}F ${PLATFORM_MIX.ground}G`;
  hud.arrived.textContent = `${Math.round(sim.arrived * 100)}%`;
  hud.returned.textContent = `${Math.round(sim.returned * 100)}%`;
  hud.losses.textContent = `${Math.round(sim.drones.filter((d) => d.lost).length / DRONE_COUNT * 100)}%`;
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
  for (const d of sim.drones) {
    const healthy = !d.launched ? [0.12, 0.20, 0.24] : d.platform === "fixed" ? [0.38, 0.82, 1] : d.platform === "ground" ? [0.72, 1, 0.36] : d.relay ? [0.46, 1, 0.92] : [0.36, 1, 0.62];
    const color = d.expended ? [1, 0.48, 0.85] : d.landed ? [0.54, 0.70, 1] : d.lost ? [0.30, 0.02, 0.03] : d.mode === "return" || d.battery < 0.28 ? [1, 0.38, 0.45] : d.battery < 0.48 ? [1, 0.72, 0.28] : healthy;
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
  for (const support of sim.supportEvents) {
    const progress = clamp(support.age / support.duration, 0, 1);
    const color = [1, 0.86, 0.38];
    const visible = Math.max(2, Math.floor(progress * 26));
    const start = support.gun;
    const relay = support.relay || RELAY_BELT;
    const control = [relay[0], relay[1] + 70, relay[2]];
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
    let start = 0;
    for (const support of sim.supportEvents) {
      const progress = clamp(support.age / support.duration, 0, 1);
      const vertices = Math.max(2, Math.floor(progress * 26));
      gl.drawArrays(gl.LINE_STRIP, start, vertices);
      start += vertices;
    }
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
