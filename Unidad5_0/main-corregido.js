import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

// ------------------------------------------------------------
// Boceto conceptual — Unidad 5
// No busca ser el acabado final: sirve para evaluar ritmo, narrativa
// y relaciones antes de invertir tiempo en shaders/modelado/pulido.
// ------------------------------------------------------------

const canvas = document.querySelector('#scene');
const app = document.querySelector('#app');
const copyEl = document.querySelector('#copy');
const numberEl = document.querySelector('#momentNumber');
const kickerEl = document.querySelector('#kicker');
const titleEl = document.querySelector('#title');
const subtitleEl = document.querySelector('#subtitle');
const momentAssetEl = document.querySelector('#momentAsset');
const momentImageEl = document.querySelector('#momentImage');
const qrLayerEl = document.querySelector('#qrLayer');
const dotsEl = document.querySelector('#dots');

const moments = [
  {
    kicker: 'Future Leaders Forum · Fórum UPB',
    title: 'RELEVO GENERACIONAL: LA VENTAJA QUE NADIE ESTÁ APROVECHANDO',
    subtitle: '@centrodeeventosupb',
    camera: [0.4, 1.8, 21], target: [0, 0, 0], singularity: .18, wormhole: 0, memory: 0, trust: 0
  },
  {
    kicker: 'Espacio',
    title: '¿Un gran auditorio solo para hacer grados?',
    subtitle: '',
    asset: 'https://juanferfranco.github.io/ForumTEDTALK/assets/slide-02-grados.webp',
    camera: [1.3, 5.1, 15], target: [0, 0, 0], singularity: .88, wormhole: 0, memory: 0, trust: 0
  },
  {
    kicker: 'Encuentro',
    title: 'Los eventos no llegaron a la Universidad. La Universidad decidió encontrarse con el mundo.',
    subtitle: '',
    camera: [-1.5, 3.2, 14.5], target: [0, .2, 0], singularity: 1, wormhole: 0, memory: 0, trust: 0
  },
  {
    kicker: 'Tres fuerzas',
    title: 'Academia + Industria + Ciudad',
    subtitle: '',
    asset: 'https://juanferfranco.github.io/ForumTEDTALK/assets/slide-04-actores.webp',
    camera: [0, 1.2, 19], target: [0, .2, 0], singularity: .62, wormhole: 0, memory: 0, trust: 0
  },
  {
    kicker: 'Impacto',
    title: 'Los eventos nunca fueron el objetivo. El impacto sí.',
    subtitle: '',
    asset: 'https://juanferfranco.github.io/ForumTEDTALK/assets/slide-05-impacto.webp',
    camera: [4.2, 4.2, 14], target: [0, 0, 0], singularity: .95, wormhole: 0, memory: .15, trust: 0
  },
  {
    kicker: 'Comunidad',
    title: 'Un evento trae personas. Una comunidad trae transformación.',
    subtitle: '',
    camera: [-4.5, 4.8, 14.5], target: [0, 0, 0], singularity: .68, wormhole: 0, memory: 1, trust: .05
  },
  {
    kicker: 'Confianza',
    title: 'El talento crece a la velocidad de la confianza.',
    subtitle: '',
    camera: [3.1, 2.5, 12.8], target: [0, 0, 0], singularity: .58, wormhole: 0, memory: .45, trust: 1
  },
  {
    kicker: 'Rutas',
    title: 'La experiencia construye el camino. Las nuevas generaciones descubren nuevas rutas.',
    subtitle: '',
    asset: 'https://juanferfranco.github.io/ForumTEDTALK/assets/slide-08-rutas.webp',
    camera: [-2.7, 5.8, 13.5], target: [0, 0, -.5], singularity: .52, wormhole: 0, memory: 1, trust: .15
  },
  {
    kicker: 'Relevo',
    title: 'Una visión. Dos generaciones.',
    subtitle: '',
    camera: [0, .2, 17], target: [0, 0, 0], singularity: .18, wormhole: 1, memory: .1, trust: 0
  },
  {
    kicker: 'Composición',
    title: 'El crecimiento no ocurre cuando una generación reemplaza a otra. Ocurre cuando trabajan juntas.',
    subtitle: '',
    camera: [0, .1, 13.5], target: [0, 0, -4], singularity: .08, wormhole: 1, memory: 0, trust: 0
  },
  {
    kicker: 'Presente',
    title: 'Los jóvenes no son el futuro. Son el presente que muchas organizaciones aún no ven.',
    subtitle: '',
    camera: [.35, .12, 5.7], target: [0, 0, -8], singularity: .04, wormhole: .86, memory: 0, trust: 0
  },
  {
    kicker: 'Futuro construido',
    title: 'El futuro no se hereda. Se construye.',
    subtitle: '',
    asset: 'https://juanferfranco.github.io/ForumTEDTALK/assets/slide-12-futuro.webp',
    camera: [-8, 6.5, 17], target: [3, 0, -1], singularity: .28, wormhole: .28, memory: 1, trust: .22
  },
  {
    kicker: 'Continuidad',
    title: '@centrodeeventosupb',
    subtitle: '',
    asset: 'https://juanferfranco.github.io/ForumTEDTALK/assets/slide-13-cierre.webp',
    camera: [12.5, 9.5, 24], target: [0, 0, -1], singularity: .58, wormhole: .55, memory: .8, trust: .5
  }
];

// ---------- Renderer / scene ----------
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
renderer.setSize(window.innerWidth, window.innerHeight, false);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x02030a);
scene.fog = new THREE.FogExp2(0x02030a, 0.018);

const camera = new THREE.PerspectiveCamera(48, window.innerWidth / window.innerHeight, .05, 120);
camera.position.set(...moments[0].camera);
const cameraTarget = new THREE.Vector3(...moments[0].target);
const desiredCamera = camera.position.clone();
const desiredTarget = cameraTarget.clone();

const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), .86, .52, .72);
composer.addPass(bloom);
composer.addPass(new OutputPass());

// ---------- Utility ----------
const clock = new THREE.Clock();
const tmp = new THREE.Vector3();
const tmp2 = new THREE.Vector3();
const TAU = Math.PI * 2;
const GROUP_CENTERS = [
  new THREE.Vector3(-5.2, 2.3, -.8),
  new THREE.Vector3(5.0, 1.8, -1.3),
  new THREE.Vector3(.4, -4.1, .6)
];
const clamp01 = v => Math.max(0, Math.min(1, v));
const lerp = THREE.MathUtils.lerp;

function seeded(i, salt = 0) {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
}

function mixVec(out, a, b, t) {
  out.set(lerp(a.x, b.x, t), lerp(a.y, b.y, t), lerp(a.z, b.z, t));
  return out;
}

// ---------- Particle cloud ----------
const COUNT = 1700;
const pos = new Float32Array(COUNT * 3);
const colors = new Float32Array(COUNT * 3);
const current = Array.from({ length: COUNT }, () => new THREE.Vector3());
const previousDesired = Array.from({ length: COUNT }, () => new THREE.Vector3());
const desired = Array.from({ length: COUNT }, () => new THREE.Vector3());

const colorA = new THREE.Color(0xdbe5ff);
const colorB = new THREE.Color(0x9cb8ff);
const colorC = new THREE.Color(0xf1d9bd);

for (let i = 0; i < COUNT; i++) {
  const r = 7 + seeded(i, 1) * 16;
  const theta = seeded(i, 2) * TAU;
  const phi = Math.acos(2 * seeded(i, 3) - 1);
  current[i].set(
    r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
  desired[i].copy(current[i]);
  previousDesired[i].copy(current[i]);
  pos[i * 3] = current[i].x;
  pos[i * 3 + 1] = current[i].y;
  pos[i * 3 + 2] = current[i].z;

  const c = seeded(i, 7) < .17 ? colorB : (seeded(i, 8) > .88 ? colorC : colorA);
  colors[i * 3] = c.r;
  colors[i * 3 + 1] = c.g;
  colors[i * 3 + 2] = c.b;
}

const particlesGeo = new THREE.BufferGeometry();
particlesGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
const particlesMat = new THREE.PointsMaterial({
  size: .075,
  sizeAttenuation: true,
  transparent: true,
  opacity: .78,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
  vertexColors: true
});
const particles = new THREE.Points(particlesGeo, particlesMat);
scene.add(particles);

// ---------- Ambient stars ----------
const STAR_COUNT = 900;
const starPos = new Float32Array(STAR_COUNT * 3);
for (let i = 0; i < STAR_COUNT; i++) {
  const r = 26 + seeded(i, 33) * 46;
  const theta = seeded(i, 34) * TAU;
  const phi = Math.acos(2 * seeded(i, 35) - 1);
  starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
  starPos[i * 3 + 1] = r * Math.cos(phi);
  starPos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
}
const starGeo = new THREE.BufferGeometry();
starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
  color: 0x92a6d8, size: .025, transparent: true, opacity: .28, depthWrite: false
}));
scene.add(stars);

// ---------- Singularity / accretion visual ----------
const singularity = new THREE.Group();
scene.add(singularity);

const core = new THREE.Mesh(
  new THREE.SphereGeometry(1.02, 48, 32),
  new THREE.MeshBasicMaterial({ color: 0x000000 })
);
singularity.add(core);

function makeGlowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 8, 128, 128, 126);
  g.addColorStop(0, 'rgba(255,255,255,.9)');
  g.addColorStop(.12, 'rgba(150,185,255,.5)');
  g.addColorStop(.38, 'rgba(105,140,255,.12)');
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
}
const glow = new THREE.Sprite(new THREE.SpriteMaterial({
  map: makeGlowTexture(), transparent: true, opacity: .65, blending: THREE.AdditiveBlending, depthWrite: false
}));
glow.scale.setScalar(6.2);
singularity.add(glow);

const ringMat = new THREE.MeshBasicMaterial({ color: 0xa8bdff, transparent: true, opacity: .22, blending: THREE.AdditiveBlending, depthWrite: false });
const ring1 = new THREE.Mesh(new THREE.TorusGeometry(2.55, .035, 8, 220), ringMat.clone());
const ring2 = new THREE.Mesh(new THREE.TorusGeometry(3.55, .025, 8, 220), ringMat.clone());
ring1.rotation.x = Math.PI * .48;
ring1.rotation.z = -.22;
ring2.rotation.x = Math.PI * .54;
ring2.rotation.z = .34;
singularity.add(ring1, ring2);

// ---------- Wormhole ----------
const wormhole = new THREE.Group();
scene.add(wormhole);
const WORM_RINGS = 28;
const wormRings = [];
for (let i = 0; i < WORM_RINGS; i++) {
  const z = lerp(8.2, -11.2, i / (WORM_RINGS - 1));
  const radius = 1.65 + Math.sin(i * .58) * .26 + Math.abs(z + 1.5) * .018;
  const m = new THREE.MeshBasicMaterial({
    color: i % 4 === 0 ? 0xc8d4ff : 0x839fff,
    transparent: true,
    opacity: .12,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, .018, 6, 96), m);
  ring.position.z = z;
  ring.rotation.z = i * .33;
  wormhole.add(ring);
  wormRings.push(ring);
}
wormhole.visible = false;

// ---------- Memory paths ----------
const memoryGroup = new THREE.Group();
scene.add(memoryGroup);
const memoryMaterials = [];
function addPath(points, opacity = .16) {
  const g = new THREE.BufferGeometry().setFromPoints(points);
  const m = new THREE.LineBasicMaterial({ color: 0xaac1ff, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false });
  memoryMaterials.push(m);
  const line = new THREE.Line(g, m);
  memoryGroup.add(line);
}

for (let p = 0; p < 15; p++) {
  const pts = [];
  const radius = 2.4 + p * .28;
  const tilt = (seeded(p, 90) - .5) * .7;
  for (let j = 0; j < 70; j++) {
    const a = (j / 69) * TAU * (1.1 + seeded(p, 91) * .5) + p;
    pts.push(new THREE.Vector3(
      Math.cos(a) * radius,
      Math.sin(a * .72 + tilt) * (1.0 + p * .045),
      Math.sin(a) * radius * .45 + Math.sin(a * 2.1) * .3
    ));
  }
  addPath(pts);
}

for (let p = 0; p < 7; p++) {
  const pts = [];
  for (let j = 0; j < 55; j++) {
    const t = j / 54;
    const x = -1 + t * 12;
    pts.push(new THREE.Vector3(x, Math.sin(t * TAU * (1.2 + p * .09) + p) * (1.2 + p * .08), -1.5 + Math.cos(t * TAU + p) * 1.4));
  }
  addPath(pts, .11);
}

// ---------- Trust relation segments ----------
const trustGeo = new THREE.BufferGeometry();
const trustPos = new Float32Array(160 * 2 * 3);
trustGeo.setAttribute('position', new THREE.BufferAttribute(trustPos, 3));
const trustMat = new THREE.LineBasicMaterial({ color: 0xd6e0ff, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
const trustLines = new THREE.LineSegments(trustGeo, trustMat);
scene.add(trustLines);

// ---------- State / transitions ----------
let momentIndex = 0;
let previousMomentIndex = 0;
let transitionStart = 0;
const TRANSITION_DURATION = 1.35;
let uiHidden = false;

moments.forEach((_, i) => {
  const dot = document.createElement('span');
  dot.className = 'dot' + (i === 0 ? ' active' : '');
  dotsEl.appendChild(dot);
});

function updateUI(index) {
  const m = moments[index];
  // Actualización inmediata: nunca desaparece el texto al cambiar de escena.
  numberEl.textContent = String(index + 1).padStart(2, '0');
  kickerEl.textContent = m.kicker;
  titleEl.textContent = m.title;
  subtitleEl.textContent = m.subtitle;

  // Evitar mostrar la imagen del momento anterior mientras carga la nueva.
  momentAssetEl.classList.remove('visible');
  if (m.asset) {
    const url = m.asset;
    momentImageEl.onload = () => {
      if (moments[momentIndex].asset === url) momentAssetEl.classList.add('visible');
    };
    momentImageEl.onerror = () => {
      momentAssetEl.classList.remove('visible');
      console.warn('Imagen no disponible:', url);
    };
    momentImageEl.alt = m.title;
    momentImageEl.src = url;
    if (momentImageEl.complete && momentImageEl.naturalWidth > 0) {
      momentAssetEl.classList.add('visible');
    }
  } else {
    momentImageEl.onload = null;
    momentImageEl.onerror = null;
    momentImageEl.removeAttribute('src');
    momentImageEl.alt = '';
  }

  qrLayerEl.classList.toggle('visible', index === moments.length - 1);
  [...dotsEl.children].forEach((d, i) => d.classList.toggle('active', i === index));

  // Reiniciar animación CSS sin ocultar la sección entre momentos.
  copyEl.classList.remove('is-changing');
  void copyEl.offsetWidth;
  copyEl.classList.add('is-changing');
}

function setMoment(index) {
  const next = Math.max(0, Math.min(moments.length - 1, index));
  if (next === momentIndex) return;
  previousMomentIndex = momentIndex;
  momentIndex = next;
  transitionStart = clock.elapsedTime;
  desiredCamera.set(...moments[momentIndex].camera);
  desiredTarget.set(...moments[momentIndex].target);
  updateUI(momentIndex);
}

function resetPresentation() {
  uiHidden = false;
  app.classList.remove('ui-hidden');
  previousMomentIndex = momentIndex;
  momentIndex = 0;
  transitionStart = clock.elapsedTime;
  desiredCamera.set(...moments[0].camera);
  desiredTarget.set(...moments[0].target);
  updateUI(0);
}

// ---------- Position grammar ----------
function statePosition(state, i, t, out) {
  const s1 = seeded(i, 1), s2 = seeded(i, 2), s3 = seeded(i, 3), s4 = seeded(i, 4), s5 = seeded(i, 5);
  const phase = s2 * TAU;
  const speed = .18 + s3 * .22;
  const g = i % 3;

  if (state === 0) { // latent — distant potential, subtle attraction
    const radius = 7 + s1 * 15;
    const a = phase + t * (.025 + s4 * .035);
    const y = (s3 - .5) * 12 + Math.sin(t * .1 + phase) * .25;
    return out.set(Math.cos(a) * radius, y, Math.sin(a) * radius * .7 - 3);
  }

  if (state === 1) { // stable orbit
    const r = 2.4 + s1 * 5.8;
    const a = phase + t * speed;
    const inclination = (s4 - .5) * .85;
    const x = Math.cos(a) * r;
    const y = Math.sin(a * .7 + phase) * r * .18 + inclination;
    const z = Math.sin(a) * r * .48;
    const rz = inclination * .25;
    const cr = Math.cos(rz), sr = Math.sin(rz);
    return out.set(x * cr - y * sr, x * sr + y * cr, z);
  }

  if (state === 2) { // incoming + orbital disturbance
    if (s5 < .34) {
      const cycle = (t * (.085 + s3 * .05) + s1) % 1;
      const startR = 15 + s2 * 7;
      const ang = phase + cycle * 2.7;
      const r = lerp(startR, 1.7 + s4 * 4.2, Math.pow(cycle, .7));
      return out.set(Math.cos(ang) * r, (s3 - .5) * 8 * (1 - cycle) + Math.sin(ang * 2) * .5, Math.sin(ang) * r * .55 + lerp(8, -1, cycle));
    }
    const r = 2.6 + s1 * 5.3;
    const a = phase + t * speed + Math.sin(t * .45 + phase) * .16;
    return out.set(Math.cos(a) * r, Math.sin(a * .74) * 1.25, Math.sin(a) * r * .52);
  }

  if (state === 3) { // three systems
    const c = GROUP_CENTERS[g];
    const r = 1.4 + s1 * 2.7;
    const a = phase + t * (.12 + g * .035 + s3 * .08);
    return out.set(c.x + Math.cos(a) * r, c.y + Math.sin(a * (1 + g * .13)) * r * .55, c.z + Math.sin(a) * r * .44);
  }

  if (state === 4) { // impact / propagated bend
    const u = ((s1 + t * (.035 + s3 * .02)) % 1);
    const side = s2 < .5 ? -1 : 1;
    const x = lerp(-12 * side, 12 * side, u);
    const bend = Math.exp(-Math.pow(x * .24, 2));
    const y = (s3 - .5) * 5 + side * bend * (2.2 + s4 * 2.2);
    const z = (s4 - .5) * 6 - bend * 2.4;
    return out.set(x, y, z);
  }

  if (state === 5) { // memory / routes
    const branch = i % 6;
    const u = (s1 + t * (.025 + s4 * .018)) % 1;
    const a = u * TAU * (1.0 + branch * .035) + branch;
    const r = 2.2 + branch * .58 + s3 * .6;
    return out.set(Math.cos(a) * r, Math.sin(a * .7 + branch) * (1.1 + branch * .17), Math.sin(a) * r * .48 + Math.sin(a * 2) * .22);
  }

  if (state === 6) { // trust — companion pairs share orbit
    const pair = Math.floor(i / 2);
    const mate = i % 2 === 0 ? -1 : 1;
    const pr = 2.6 + seeded(pair, 18) * 5.0;
    const pPhase = seeded(pair, 19) * TAU;
    const a = pPhase + t * (.12 + seeded(pair, 20) * .12);
    const cx = Math.cos(a) * pr;
    const cy = Math.sin(a * .68) * 1.7;
    const cz = Math.sin(a) * pr * .45;
    const nx = -Math.sin(a), nz = Math.cos(a);
    return out.set(cx + nx * mate * .12, cy + mate * .06, cz + nz * mate * .12);
  }

  if (state === 7) { // established route + exploration branches
    const u = (s1 + t * (.02 + s3 * .018)) % 1;
    const stable = s5 < .68;
    const x = lerp(-10, 10, u);
    const lane = Math.floor(s2 * 5) - 2;
    if (stable) return out.set(x, lane * .72 + Math.sin(u * TAU * 1.4 + lane) * .23, -2 + Math.sin(u * TAU + lane) * 1.1);
    const branch = Math.pow(clamp01((u - .38) / .62), 1.3);
    return out.set(x, lane * .72 + branch * (2 + s3 * 6) * (s4 < .5 ? -1 : 1), -2 + Math.sin(u * TAU) * 1.2 + branch * (s2 - .5) * 5);
  }

  if (state === 8) { // duality around wormhole ends
    const side = s5 < .5 ? 1 : -1;
    const centerZ = side > 0 ? 9.4 : -12.5;
    const r = 1.8 + s1 * 4.0;
    const a = phase + t * (.08 + s3 * .13) * side;
    return out.set(Math.cos(a) * r, Math.sin(a * .83) * r * .55, centerZ + Math.sin(a) * r * .45);
  }

  if (state === 9 || state === 10) { // bidirectional exchange through tunnel
    const dir = s5 < .5 ? 1 : -1;
    let u = (s1 + t * (.055 + s3 * .055)) % 1;
    if (dir < 0) u = 1 - u;
    const z = lerp(9.8, -12.7, u);
    const tunnelRadius = 1.1 + Math.sin(u * Math.PI) * .38;
    const a = phase + u * TAU * (1.8 + s4 * 1.4) + t * .42 * dir;
    const spiral = state === 10 ? .74 : 1;
    return out.set(Math.cos(a) * tunnelRadius * spiral, Math.sin(a) * tunnelRadius * spiral, z);
  }

  if (state === 11) { // construction into empty region
    const route = i % 7;
    const u = (s1 + t * (.018 + s3 * .022)) % 1;
    const x = lerp(-7, 15, u);
    const growth = Math.pow(clamp01((u - .32) / .68), 1.4);
    const sign = route % 2 ? 1 : -1;
    const y = Math.sin(u * TAU * (1.05 + route * .045) + route) * .55 + growth * sign * (route * .43 + s4 * 2.5);
    const z = -2 + Math.cos(u * TAU + route) * .9 + growth * (s2 - .5) * 6;
    return out.set(x, y, z);
  }

  // final continuity: combine orbit, exchange and growth according to particle family
  const family = i % 4;
  if (family === 0) {
    const r = 2.8 + s1 * 5.6, a = phase + t * speed;
    return out.set(Math.cos(a) * r, Math.sin(a * .7) * 1.7, Math.sin(a) * r * .48);
  }
  if (family === 1) {
    const dir = s5 < .5 ? 1 : -1;
    let u = (s1 + t * (.04 + s3 * .04)) % 1; if (dir < 0) u = 1 - u;
    const z = lerp(9, -11.5, u), a = phase + u * TAU * 2 + t * .25 * dir;
    return out.set(Math.cos(a) * 1.15, Math.sin(a) * 1.15, z);
  }
  if (family === 2) {
    const u = (s1 + t * .018) % 1;
    return out.set(lerp(-6, 14, u), Math.sin(u * TAU + phase) * (1 + u * 3.4), -3 + (s3 - .5) * 4 * u);
  }
  const r = 9 + s1 * 9, a = phase + t * .035;
  return out.set(Math.cos(a) * r, (s3 - .5) * 9, Math.sin(a) * r * .7);
}

function updateTrustLines(amount) {
  trustMat.opacity = amount * .14;
  if (amount < .01) return;
  const a = trustGeo.attributes.position.array;
  let k = 0;
  for (let p = 0; p < 160; p++) {
    const i0 = (p * 8) % (COUNT - 1);
    const i1 = i0 + 1;
    const p0 = current[i0], p1 = current[i1];
    a[k++] = p0.x; a[k++] = p0.y; a[k++] = p0.z;
    a[k++] = p1.x; a[k++] = p1.y; a[k++] = p1.z;
  }
  trustGeo.attributes.position.needsUpdate = true;
}

function updateSceneVisuals(t, transition) {
  const m0 = moments[previousMomentIndex];
  const m1 = moments[momentIndex];
  const singularityAmount = lerp(m0.singularity, m1.singularity, transition);
  const wormAmount = lerp(m0.wormhole, m1.wormhole, transition);
  const memoryAmount = lerp(m0.memory, m1.memory, transition);
  const trustAmount = lerp(m0.trust, m1.trust, transition);

  singularity.scale.setScalar(.75 + singularityAmount * .28);
  core.material.opacity = singularityAmount;
  glow.material.opacity = singularityAmount * .6;
  ring1.material.opacity = singularityAmount * .24;
  ring2.material.opacity = singularityAmount * .15;
  singularity.visible = singularityAmount > .02;
  ring1.rotation.z += .0008;
  ring2.rotation.z -= .00055;

  wormhole.visible = wormAmount > .015;
  wormRings.forEach((ring, i) => {
    ring.material.opacity = wormAmount * (.07 + .11 * (0.5 + 0.5 * Math.sin(t * 1.3 + i * .48)));
    ring.rotation.z += (i % 2 ? 1 : -1) * .0008 * wormAmount;
    const pulse = 1 + Math.sin(t * 1.2 - i * .3) * .045 * wormAmount;
    ring.scale.setScalar(pulse);
  });

  memoryMaterials.forEach((mat, i) => { mat.opacity = memoryAmount * (.045 + (i % 4) * .018); });
  memoryGroup.visible = memoryAmount > .01;
  updateTrustLines(trustAmount);

  // More bloom during tunnel moments, softer elsewhere.
  bloom.strength = .72 + wormAmount * .34 + singularityAmount * .1;
  bloom.radius = .48 + wormAmount * .08;
}

function renderFrame() {
  requestAnimationFrame(renderFrame);
  const dt = Math.min(clock.getDelta(), .033);
  const t = clock.elapsedTime;
  const transition = clamp01((t - transitionStart) / TRANSITION_DURATION);
  const smooth = transition * transition * (3 - 2 * transition);

  // Camera choreography: preset poses with soft interpolation.
  camera.position.lerp(desiredCamera, 1 - Math.pow(.0007, dt));
  cameraTarget.lerp(desiredTarget, 1 - Math.pow(.0012, dt));

  // Slight living camera drift, but never enough to compete with content.
  const drift = momentIndex === 10 ? .018 : .035;
  camera.position.x += Math.sin(t * .18) * drift * dt;
  camera.position.y += Math.cos(t * .15) * drift * dt;
  camera.lookAt(cameraTarget);

  // Particle grammar: interpolate between the previous and current moment.
  for (let i = 0; i < COUNT; i++) {
    const a = previousDesired[i];
    const b = desired[i];
    statePosition(previousMomentIndex, i, t, a);
    statePosition(momentIndex, i, t, b);
    mixVec(tmp, a, b, smooth);

    // Organic lag: particles don't teleport when a slide changes.
    current[i].lerp(tmp, 1 - Math.pow(.0035, dt));

    pos[i * 3] = current[i].x;
    pos[i * 3 + 1] = current[i].y;
    pos[i * 3 + 2] = current[i].z;
  }
  particlesGeo.attributes.position.needsUpdate = true;

  particles.rotation.y = Math.sin(t * .035) * .06;
  stars.rotation.y += .000025;
  stars.rotation.x = Math.sin(t * .013) * .04;

  updateSceneVisuals(t, smooth);
  composer.render();
}

// ---------- Input ----------
function toggleFullscreen() {
  if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
  else document.exitFullscreen?.();
}

window.addEventListener('keydown', (e) => {
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) { e.preventDefault(); setMoment(momentIndex + 1); }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) { e.preventDefault(); setMoment(momentIndex - 1); }
  if (e.key.toLowerCase() === 'f') toggleFullscreen();
  if (e.key.toLowerCase() === 'r') resetPresentation();
  if (e.key.toLowerCase() === 'h') { uiHidden = !uiHidden; app.classList.toggle('ui-hidden', uiHidden); }
});

document.querySelector('#prev').addEventListener('click', () => setMoment(momentIndex - 1));
document.querySelector('#next').addEventListener('click', () => setMoment(momentIndex + 1));

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7));
  renderer.setSize(innerWidth, innerHeight, false);
  composer.setSize(innerWidth, innerHeight);
});

// First state and render.
transitionStart = clock.elapsedTime;
updateUI(0);
renderFrame();
