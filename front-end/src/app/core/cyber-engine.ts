export interface Hub {
  id: string;
  name: string;
  tag: string;
  lon: number;
  lat: number;
}

export interface Origin {
  id: string;
  lon: number;
  lat: number;
  cat: string;
  category: string;
  severity: string;
  region: string;
  desc: string;
  measures: string[];
}

export interface LandDot {
  u: number;
  v: number;
  ph: number;
}

export interface Arc {
  o: Origin;
  h: Hub;
  p: number;
  speed: number;
  lift: number;
}

export interface Ripple {
  lon: number;
  lat: number;
  start: number;
  max: number;
  col: 'g' | 'a';
  life: number;
}

export interface CanvasWrapper {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  w: number;
  h: number;
  dpr: number;
  resize: () => boolean;
  onResize: (() => void) | null;
}

export interface LoopTask {
  fn: (dt: number, t: number) => void;
  active: boolean;
}

export const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const rand = (a: number, b: number) => a + Math.random() * (b - a);
export const pick = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
export const smooth = (t: number) => t * t * (3 - 2 * t);
export const easeOut = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
export const easeInOut = (t: number) => {
  const c = clamp(t, 0, 1);
  return c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2;
};
export const quad = (p0: [number, number], c: [number, number], p2: [number, number], t: number): [number, number] => {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * c[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * c[1] + t * t * p2[1]
  ];
};

export const CYAN: [number, number, number] = [0, 229, 255];
export const RED: [number, number, number] = [255, 21, 61];
export const accent = (mix: number): [number, number, number] => [
  Math.round(lerp(CYAN[0], RED[0], mix)),
  Math.round(lerp(CYAN[1], RED[1], mix)),
  Math.round(lerp(CYAN[2], RED[2], mix))
];
export const rgba = (c: [number, number, number], a: number) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;

export const env = {
  reduced: false,
  fine: true,
  mobile: false
};

if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
  const mqReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const mqFine = window.matchMedia('(hover: hover) and (pointer: fine)');
  const mqMobile = window.matchMedia('(max-width: 820px)');
  env.reduced = mqReduced.matches;
  env.fine = mqFine.matches;
  env.mobile = mqMobile.matches;
  mqReduced.addEventListener?.('change', (e) => { env.reduced = e.matches; });
  mqMobile.addEventListener?.('change', (e) => { env.mobile = e.matches; });
}

export const pointer = {
  x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
  y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  nx: 0,
  ny: 0,
  sx: 0,
  sy: 0,
  moved: false
};

if (typeof window !== 'undefined') {
  window.addEventListener('pointermove', (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.nx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ny = (e.clientY / window.innerHeight) * 2 - 1;
    pointer.moved = true;
  }, { passive: true });
}

export class AnimationLoop {
  private tasks = new Set<LoopTask>();
  private last = typeof performance !== 'undefined' ? performance.now() : 0;
  private raf = 0;
  public mix = 0;
  public targetMix = 0;
  public scrollVel = 0;

  private frame = (now: number) => {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;

    this.mix += (this.targetMix - this.mix) * Math.min(1, dt * 3.2);
    if (Math.abs(this.targetMix - this.mix) < 0.002) this.mix = this.targetMix;

    pointer.sx += (pointer.nx - pointer.sx) * Math.min(1, dt * 4);
    pointer.sy += (pointer.ny - pointer.sy) * Math.min(1, dt * 4);
    this.scrollVel *= Math.pow(0.001, dt);

    let anyActive = false;
    this.tasks.forEach((t) => {
      if (t.active) {
        anyActive = true;
        t.fn(dt, now / 1000);
      }
    });
    this.raf = anyActive ? requestAnimationFrame(this.frame) : 0;
  };

  wake(): void {
    if (!this.raf && typeof requestAnimationFrame !== 'undefined') {
      this.last = performance.now();
      this.raf = requestAnimationFrame(this.frame);
    }
  }

  add(fn: (dt: number, t: number) => void, opts?: { active?: boolean }): LoopTask {
    const task: LoopTask = { fn, active: !(opts && opts.active === false) };
    this.tasks.add(task);
    this.wake();
    return task;
  }

  remove(task: LoopTask): void {
    this.tasks.delete(task);
  }

  stopAll(): void {
    if (this.raf) {
      cancelAnimationFrame(this.raf);
      this.raf = 0;
    }
    this.tasks.clear();
  }
}

export const Loop = new AnimationLoop();

export function gate(el: HTMLElement, task: LoopTask, margin?: string): void {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    task.active = true;
    return;
  }
  task.active = false;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      task.active = en.isIntersecting;
      if (en.isIntersecting) Loop.wake();
    });
  }, { rootMargin: margin || '120px 0px' });
  io.observe(el);
}

export function makeCanvas(canvas: HTMLCanvasElement, maxDpr?: number): CanvasWrapper {
  const ctx = (canvas && canvas.getContext ? canvas.getContext('2d') : null) as CanvasRenderingContext2D;
  const c: CanvasWrapper = {
    canvas,
    ctx,
    w: 0,
    h: 0,
    dpr: 1,
    onResize: null,
    resize: () => false
  };

  c.resize = function () {
    if (!ctx) return false;
    const w = Math.max(1, canvas.clientWidth);
    const h = Math.max(1, canvas.clientHeight);
    const dpr = Math.min(window.devicePixelRatio || 1, env.mobile ? 1.5 : (maxDpr || 2));
    if (w === c.w && h === c.h && dpr === c.dpr) return false;
    c.w = w;
    c.h = h;
    c.dpr = dpr;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return true;
  };

  c.resize();
  if (typeof ResizeObserver !== 'undefined') {
    new ResizeObserver(() => {
      if (c.resize() && c.onResize) c.onResize();
    }).observe(canvas);
  } else if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      if (c.resize() && c.onResize) c.onResize();
    });
  }
  return c;
}

export function animateCanvas(
  c: CanvasWrapper,
  draw: (dt: number, t: number, still: boolean) => void,
  opts?: { alwaysAnimate?: boolean; margin?: string; staticTime?: number }
): LoopTask | null {
  if (!c || !c.ctx) return null;
  opts = opts || {};
  const prev = c.onResize;
  if (env.reduced && !opts.alwaysAnimate) {
    const still = () => {
      if (prev) prev();
      draw(0, opts?.staticTime || 6, true);
    };
    c.onResize = still;
    still();
    return null;
  }
  const task = Loop.add((dt, t) => draw(dt, t, false));
  c.onResize = () => {
    if (prev) prev();
    if (!task.active) draw(0, performance.now() / 1000, false);
  };
  gate(c.canvas, task, opts.margin);
  return task;
}

const GLOW: Record<string, HTMLCanvasElement> = {};
export function glowSprite(name: string, rgb: string): HTMLCanvasElement {
  if (GLOW[name]) return GLOW[name];
  if (typeof document === 'undefined') return {} as HTMLCanvasElement;
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext ? c.getContext('2d') : null;
  if (!x) return (GLOW[name] = c);
  const g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, `rgba(${rgb},0.95)`);
  g.addColorStop(0.3, `rgba(${rgb},0.35)`);
  g.addColorStop(1, `rgba(${rgb},0)`);
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  return (GLOW[name] = c);
}

export function glow(ctx: CanvasRenderingContext2D, name: 'cyan' | 'red' | 'green' | 'white' | 'amber', x: number, y: number, r: number, a: number): void {
  const rgbMap: Record<string, string> = {
    cyan: '0,229,255',
    red: '255,21,61',
    green: '0,255,136',
    white: '255,255,255',
    amber: '255,184,0'
  };
  const rgb = rgbMap[name] || '0,229,255';
  ctx.globalAlpha = clamp(a, 0, 1);
  ctx.drawImage(glowSprite(name, rgb), x - r, y - r, r * 2, r * 2);
  ctx.globalAlpha = 1;
}

export function glowAccent(ctx: CanvasRenderingContext2D, mix: number, x: number, y: number, r: number, a: number): void {
  if (mix < 0.99) glow(ctx, 'cyan', x, y, r, a * (1 - mix));
  if (mix > 0.01) glow(ctx, 'red', x, y, r, a * mix);
}

export const LAT_MAX = 84;
export const LAT_MIN = -58;
export const MAP_ASPECT = (LAT_MAX - LAT_MIN) / 360;

export const LAND: Array<Array<[number, number]>> = [
  // América do Norte + Central
  [[-168,65.5],[-166,68.5],[-162,70.2],[-156,71.3],[-148,70.4],[-141,69.7],[-135,69],[-128,70.2],[-122,69.5],[-115,68.5],[-108,68.3],[-102,67.8],[-96,68],[-94.5,71],[-90,69],[-85,69.5],[-82.5,67],[-86,66],[-89,64],[-93,61.5],[-94.5,59],[-92.5,57],[-88.5,56.5],[-85,55.3],[-82.3,52.8],[-80,51.4],[-79,53],[-78.5,56],[-77.5,59],[-78,62],[-74,62.3],[-70,61],[-66,59.5],[-64.5,60.3],[-62,57.5],[-60,55.5],[-57,53.5],[-55.8,52],[-59,50.3],[-65,50],[-66.5,49.2],[-64.2,48.8],[-65,47.2],[-64.8,45.8],[-62,45.2],[-60,46.2],[-61,45],[-64.5,43.8],[-66,43.5],[-67,45],[-70,43.8],[-70.7,42.4],[-70,41.7],[-72,41.1],[-74,40.5],[-74,39.5],[-75.5,38],[-76,36.8],[-75.5,35.2],[-77,34.5],[-78.7,33.8],[-80.8,32],[-81.4,30.2],[-80.4,28],[-80,26.5],[-80.3,25.2],[-81.3,25.3],[-82.2,26.8],[-82.8,28.3],[-83.7,29.9],[-85.3,29.7],[-86.8,30.4],[-89,30.3],[-89.5,29.2],[-91,29.2],[-93.8,29.7],[-95.5,28.8],[-97.2,27.5],[-97.6,25.5],[-97.8,22.5],[-97.2,20.3],[-96.2,19],[-94.8,18.2],[-92.3,18.6],[-91,19.2],[-90.4,21],[-88,21.6],[-86.8,21.3],[-87.6,19.5],[-87.8,17.5],[-88.2,16],[-85.5,15.9],[-83.3,15.1],[-83.5,12.5],[-83.8,10.8],[-82.8,9.6],[-81.2,8.8],[-79.8,9.5],[-77.9,9.2],[-77.4,8.6],[-77.3,7.8],[-78.5,7.3],[-80,7.2],[-81.5,7.4],[-83,8.3],[-85.5,9.8],[-85.8,11],[-87.5,13],[-90.5,13.8],[-93,15.2],[-95.5,16],[-97.5,15.8],[-100,16.7],[-102.5,18],[-105,19.7],[-105.7,21.5],[-106,23.2],[-108.3,25.2],[-109.8,27],[-111.6,29],[-113.2,31],[-114.7,31.7],[-114.7,30.2],[-113.2,28.5],[-111.8,26.5],[-110.5,24.5],[-109.6,23.2],[-110.2,23.6],[-112,24.8],[-114.1,27],[-115,28.3],[-115.8,30],[-116.6,31.5],[-117.1,32.6],[-118.5,34],[-120.6,34.6],[-121.9,36.6],[-122.5,37.7],[-123.8,39.4],[-124.3,40.4],[-124.1,42.7],[-124,44.5],[-124,46.3],[-124.7,48.3],[-123,48.8],[-124.5,50],[-127,50.9],[-128.5,52.5],[-130,54],[-131.5,55.3],[-133,57],[-135.5,58.3],[-137.5,58.8],[-140,59.8],[-144,60.2],[-147,60.8],[-149.5,60],[-151.5,59.2],[-152,58],[-154,57.2],[-157.5,56.7],[-160.5,55.5],[-163,54.8],[-164.8,54.5],[-163,55.8],[-161,58],[-162,59.5],[-164.5,60.5],[-165.5,62],[-164.5,63.2],[-161,63.8],[-161,64.6],[-165.5,64.5]],
  // América do Sul
  [[-77.5,8.5],[-75.5,10.8],[-72,12],[-71.5,10.5],[-68,10.6],[-64,10.6],[-61.5,10.7],[-60,8.5],[-57,6],[-54,5.7],[-51.5,4.2],[-50,1.8],[-50,0],[-48,-1],[-44.5,-2.4],[-41,-2.9],[-38,-4],[-35.2,-5.8],[-34.8,-8],[-36.5,-10.5],[-39,-13.5],[-39.2,-17.5],[-40.5,-20.5],[-42,-23],[-45,-23.8],[-48.5,-26],[-48.7,-28.5],[-51,-31],[-53.5,-34],[-56,-34.9],[-58.5,-34.2],[-57.2,-36.5],[-57.5,-38.2],[-62,-39],[-65,-41],[-63.5,-42.8],[-65.5,-45],[-67.5,-46.5],[-66,-48],[-69,-51],[-68.5,-52.5],[-65,-54.8],[-68.5,-55.3],[-72,-54],[-74,-50.5],[-75.5,-46.5],[-73.8,-43],[-73.5,-38],[-71.8,-33],[-71.5,-29],[-70.3,-23],[-70.2,-18.5],[-75,-15],[-76.5,-13],[-79,-8],[-81,-5.5],[-80,-3],[-80.5,-1],[-78.8,1.8],[-77.5,4],[-77.3,7]],
  // Eurásia
  [[-9.4,37.1],[-8.9,38.7],[-9.5,39.4],[-8.8,41.5],[-9.3,43],[-8,43.7],[-5,43.5],[-1.8,43.4],[-1.2,46],[-2.2,47.2],[-4.7,48],[-3,48.8],[-1.6,48.7],[-1.2,49.7],[0.2,49.5],[1.7,50.8],[3.5,51.4],[4.6,52.9],[6.8,53.4],[8.7,53.9],[8.5,55.5],[8.1,56.8],[10.5,57.7],[10.4,56.1],[9.8,55],[10.9,54.4],[12.5,54.4],[14.2,53.9],[16.5,54.5],[18.7,54.7],[19.8,54.4],[21,55.2],[21.1,56.8],[23.1,57.1],[24.3,57.3],[24.4,58.4],[23.6,59.2],[25.5,59.6],[28,59.5],[29.8,59.9],[30.3,59.9],[28.5,60.5],[25,60.2],[22.9,59.9],[21.3,60.8],[21.4,62.6],[22.8,63.8],[24.7,65],[25.4,65.5],[24,65.8],[22,65.7],[21.5,64.6],[19.3,63.2],[17.4,62.2],[17.2,61],[17.8,60.3],[18.9,59.6],[18.2,59],[16.8,58.5],[16.5,57.2],[15.8,56.1],[14.2,55.4],[12.9,55.4],[12.5,56.3],[11.8,57.5],[11.2,58.8],[10.7,59.8],[9.6,58.9],[8,58.1],[6.4,58.2],[5.5,59],[5,60.5],[5.2,62],[7.2,63],[9.8,63.8],[12.4,65.5],[14,67.3],[16,68.3],[18.8,69.6],[21,70.2],[25,71],[28.5,71],[31,70],[33,69.4],[36.5,69],[40.5,67.9],[41.5,67.5],[41,66.2],[37,66],[34.8,65],[37.5,64],[40.5,64.7],[43,66.2],[44.2,66.4],[44.1,68],[46,68.2],[53,68.4],[58,68.9],[60.5,69.8],[66,69.5],[68.5,68.2],[68,70.5],[67.5,72],[69.5,73],[72.5,72.8],[73,71],[74.5,72.4],[76,72],[80,72.7],[80.5,73.7],[86,74.3],[87,75.2],[94,76],[100,76.5],[104,77.7],[108,76.7],[112,76],[113.5,73.7],[118,73.5],[123,73.2],[128.5,73.2],[131,71],[135,71.5],[139,72.5],[141,72.8],[147,72.3],[150.5,71.4],[155,71],[160,70],[165,69.5],[170,70],[176,69.9],[180,68.9],[180,65.5],[178,64.5],[177,62.5],[173,61.5],[170,60],[166,60],[163.5,59.7],[162.5,57],[163.2,56],[162,54.7],[160,53],[158,51.5],[156.7,51],[156,53],[155.7,55.5],[156.5,57],[158.5,58.5],[160.5,61],[158,61.8],[154,59.2],[150,59.5],[146,59.3],[142.5,59.2],[140,58],[137.5,56.5],[135,54.8],[137,53.8],[140.5,53],[141,51],[140.5,48.5],[138,46.5],[135.5,43.8],[132,43],[130.8,42.4],[129.8,40.8],[128.3,39.5],[127.5,38.5],[129.4,36.8],[129.2,35.3],[127.5,34.6],[126.3,34.8],[126.5,36.7],[125.2,37.6],[125,39.2],[124.2,39.8],[122,39],[121.2,38.8],[121.5,40.8],[119,39.1],[118,38.2],[118.8,37.3],[120.7,37.7],[122.5,37.2],[120.5,36.2],[119.3,35],[120.8,32.5],[121.9,31.5],[121.8,29.8],[120.7,28],[119.5,25.8],[117.5,23.8],[115,22.6],[113.5,22.2],[111.5,21.5],[110.3,20.4],[109.8,21.5],[108.3,21.7],[107,20.5],[105.8,19],[106.6,17.2],[108.2,15.5],[109.3,13],[109.2,11.5],[107.5,10.5],[106,9.6],[105,8.7],[104.8,10.2],[103.2,10.6],[102.5,12],[100.9,13.4],[100,13.2],[99.9,11],[100.5,9],[100.4,7.5],[101.4,6.8],[102.6,5.6],[103.4,4.2],[103.5,2.6],[104.2,1.4],[103.4,1.3],[102,2.4],[100.8,3.9],[100.2,5.5],[98.5,8],[98.3,10],[98.8,12.5],[98.1,14.5],[97.6,16.6],[96.3,16.7],[95.3,15.7],[94.3,16],[94.2,18.5],[93.5,19.8],[92.4,21],[91.9,22.4],[90.6,22.4],[89.3,21.8],[87.5,21.4],[86.8,20.3],[85,19.4],[83,17.5],[81.5,16.3],[80.3,15.2],[80.1,13],[79.9,11],[79.3,10.2],[78.1,8.9],[77.5,8.1],[76.7,9],[75.9,11],[75,12.5],[74.4,14.5],[73.7,16.8],[73,19],[72.8,20.8],[72.5,21.8],[70.8,20.7],[69,22.2],[68.5,23.5],[67,24.7],[66.5,25.4],[64,25.2],[61.5,25.1],[58.5,25.6],[57.3,25.7],[56.4,27],[54.8,26.6],[53,26.8],[51.5,27.9],[50.2,29.5],[48.9,30],[48,29.9],[48.5,28.2],[49.5,27],[50.2,26],[50.5,25],[51,24.5],[51.6,24.3],[53,24.1],[54.5,24.3],[55.5,25.2],[56.3,26.2],[56.5,24.8],[57.5,23.8],[58.7,23.5],[59.8,22.5],[59.3,21.4],[58.5,20.4],[57.8,19.1],[56.5,18.2],[55,17],[52.5,16.2],[50,15],[48,14],[45,12.8],[43.5,12.7],[43,13.8],[42.7,15.5],[42.2,16.8],[41.2,18.8],[40,20.5],[39.2,21.5],[38.5,23.2],[37.3,25.5],[36,27.5],[35,28.3],[34.6,28.1],[33.6,28],[32.7,29.6],[32.4,30.3],[32.3,31.2],[34.2,31.3],[34.9,32.8],[35.5,34.2],[35.9,35.7],[35.8,36.7],[34.5,36.8],[33,36.2],[31,36.8],[29.5,36.2],[28,36.8],[27.2,37.5],[26.5,38.4],[26.8,39.5],[26.2,40.1],[26,40.8],[24.5,40.9],[23.8,40.2],[22.9,40.4],[22.6,39.3],[23.2,38.6],[24,38],[23.1,36.5],[22.5,36.5],[21.7,36.9],[21.5,38],[20.4,39.5],[19.5,40.5],[19.4,41.8],[18.5,42.5],[17,43.3],[15.5,44.2],[14.5,45.3],[13.7,45.6],[12.4,45.3],[12.4,44.2],[13.6,43.4],[14.8,42],[16.2,41.8],[18.5,40.2],[17.2,40.4],[16.5,39.5],[17.1,38.9],[16.1,38],[15.7,38.5],[16,39.8],[15.2,40.3],[14.3,40.8],[12.3,41.6],[11,42.5],[10.2,43.5],[8.8,44.4],[7.5,43.8],[6,43.1],[4,43.5],[3.1,42.9],[3.2,41.9],[1,41.1],[0.1,40],[-0.3,39],[0.2,38.7],[-0.7,37.6],[-2,36.8],[-4.5,36.7],[-5.4,36],[-6.3,36.7],[-7.4,37.2],[-8.9,37]],
  // África
  [[-5.9,35.8],[-2.5,35.2],[1,36.5],[3,36.8],[6,37],[9.8,37.3],[10.9,36.9],[11,35.3],[10.1,34.2],[11.5,33.2],[13,32.8],[15.2,32.3],[15.5,31.2],[18.5,30.5],[19.8,30.3],[20.1,31.7],[21.5,32.9],[23,32.6],[25,31.6],[27.5,31.2],[29.7,31.1],[31,31.6],[32.3,31.2],[32.4,30.3],[32.7,29.6],[33.2,28],[34,26.8],[35.2,24.3],[35.7,23],[36.8,21.2],[37.3,19.2],[38.3,18],[39,16],[39.8,15.3],[41,14.3],[42.5,13],[43.3,12.5],[44.2,11.5],[45.5,10.6],[47.5,11.1],[49.5,11.5],[51.2,11.8],[51,10.4],[50,8.5],[49,6],[48,4.5],[46.5,2.5],[44.5,1.2],[43,-0.5],[41.6,-1.8],[40.4,-2.7],[39.6,-4.5],[39.2,-6.3],[39.5,-8.6],[40.3,-10.3],[40.6,-12.5],[40.7,-15],[39.6,-16.5],[37,-17.5],[35.3,-19.5],[35.2,-21.8],[35.5,-24],[33,-25.3],[32.8,-26.8],[32.5,-28.5],[30.5,-30.8],[28.6,-32.3],[26.5,-33.7],[25.3,-34],[22.5,-34.1],[20.2,-34.8],[18.5,-34.2],[18.2,-32.8],[17.5,-30.5],[16.5,-28.7],[15,-26.8],[14.5,-23.5],[13.2,-21],[12.2,-18.5],[11.8,-16],[13.2,-12.8],[13.8,-10.8],[13,-8.5],[12.3,-6.2],[12,-5],[9.8,-2.5],[9.3,-0.5],[9.6,1.2],[9.9,3.2],[8.8,4.3],[7,4.4],[5.5,5],[4.4,6.2],[2.5,6.3],[0.5,5.8],[-1.8,4.8],[-4,5.2],[-7,4.4],[-9,5.1],[-10.9,6.2],[-12.8,7.6],[-13.3,9.3],[-14.8,10.6],[-16.7,12.3],[-17.5,14.7],[-16.5,16.5],[-16.3,19.5],[-17,21.2],[-16,23.5],[-14.8,25.2],[-13.5,27.5],[-11.5,28.5],[-9.8,29.9],[-9.8,31.8],[-8.5,33.4],[-6.8,34.2]],
  // Austrália
  [[114,-22],[114,-26],[115,-30],[115,-34],[118,-35],[123,-34],[126,-32.3],[131,-31.5],[135,-34.5],[137.5,-33],[138,-35.5],[140,-37.7],[144,-38.5],[147,-38.3],[150,-37.5],[151.5,-33],[153.5,-28.5],[153,-25],[150,-22],[147,-19],[145.5,-14.5],[143.5,-14],[142.5,-10.8],[141.5,-12.8],[141,-17],[139.5,-17.5],[136,-15.3],[136.8,-12.2],[132,-11.3],[130.5,-12.5],[129.5,-15],[127,-14],[125,-15.2],[123,-17],[121,-19.5],[118.5,-20.3],[116,-21]],
  // Groenlândia
  [[-73,78.5],[-66,81],[-40,83.5],[-20,82],[-18,78],[-20,74],[-22,70.5],[-26,68.5],[-35,66],[-40,65],[-43,60],[-48,61],[-51,64.5],[-54,67],[-54,70],[-60,75],[-68,76.5]],
  // Ilhas Britânicas
  [[-5.5,50],[-3,50.6],[1.4,51.2],[1.7,52.8],[0,53.5],[-1.5,55],[-2.2,56.5],[-1.8,57.6],[-3.3,58.5],[-5,58.6],[-6,57],[-5.5,55.5],[-3,54.8],[-3,53.3],[-4.5,53.2],[-4.2,52],[-5.2,51.7],[-3,51.4],[-4.5,50.5]],
  [[-10,51.7],[-6.2,52.2],[-6,54],[-5.8,55],[-8,55.3],[-10,54],[-9.7,52.5]],
  [[-24,65.5],[-22,66.4],[-16,66.5],[-13.5,65],[-15,64.2],[-19,63.4],[-22.5,63.8]],
  // Japão e adjacências
  [[130.9,34],[132.5,35.5],[135.5,35.7],[137,37],[139,38],[140,40.5],[141.5,41],[142,39.5],[141,37],[140.8,35.7],[139.8,35],[137.5,34.6],[135.3,33.7],[133,33.8],[131.5,34]],
  [[140,42],[141.5,45.4],[145.5,43.5],[143,42],[141,42.5]],
  [[129.7,33],[131.8,33.5],[131.5,31.3],[130.2,31.2]],
  [[142,46],[143.5,49],[143,54],[142.2,54],[142,50]],
  [[120.2,23],[121.5,25.2],[122,24.5],[120.8,22]],
  [[79.8,9.5],[81.8,7.5],[81,6],[80,6.2]],
  // Sudeste Asiático insular
  [[95.3,5.6],[98.5,4],[104,-1],[106,-3],[105.8,-5.8],[103,-4.5],[100.4,-1.5],[98.5,1.5]],
  [[109,1.5],[111,1.8],[113,3.3],[115.5,5],[117.5,6.5],[119,5.2],[117.7,1],[116.5,-2.5],[114.5,-4],[111.5,-3.2],[110,-1.8]],
  [[105.2,-6.8],[108,-6.3],[111,-6.5],[114.5,-7.8],[114.4,-8.7],[108,-7.9],[106,-7.2]],
  [[119.5,-5.5],[121,-3],[121,1],[125,1.5],[123,-0.7],[122.5,-4],[121,-5]],
  [[131,-1],[135,-3.5],[138.5,-8],[141,-9],[143.5,-9],[147,-10.2],[150,-10.6],[147,-7.5],[145,-4.5],[141,-2.6],[138,-1.8],[134,-0.8]],
  [[120,18.5],[122.2,18.4],[122,14],[124,12.7],[121,13.5],[120,14.5]],
  [[122,7],[126,9.5],[126.5,7],[125,5.8],[123,7]],
  // Madagascar, Nova Zelândia
  [[49.3,-12],[50.4,-15.5],[49.3,-18.5],[47.2,-24.8],[45,-25.5],[43.3,-22.5],[44.4,-20],[44,-17],[46,-15.7],[48,-13.5]],
  [[172.7,-34.4],[174.5,-36.5],[176,-37.5],[178.5,-37.7],[177,-39.5],[175.2,-41.5],[174.8,-39.5],[173.8,-39.2],[174.6,-37]],
  [[172.7,-40.5],[174.3,-41.7],[173,-43.5],[171,-44.5],[169.5,-46.3],[166.5,-46],[168.5,-44],[170.5,-42.8],[172,-41]],
  // Caribe e Ilhas
  [[-85,22],[-82,23.2],[-77,21.8],[-74,20.3],[-77.5,19.8],[-81,21.5]],
  [[-74.5,18.4],[-72,19.9],[-69,19.5],[-68.4,18.5],[-71,17.7]],
  [[-59.3,47.7],[-55,51.5],[-52.8,47.5],[-56,46.8]],
  [[-80,73.5],[-72,71.5],[-62,67],[-65,63],[-72,63.5],[-78,64.5],[-74,68],[-85,70]],
  [[-118,72],[-105,73],[-100,72],[-102,69.5],[-114,69],[-118,71]],
  [[-90,76.5],[-75,78.7],[-62,82],[-80,83],[-92,81],[-90,77]],
  [[52,71.5],[56,74],[60,76.5],[68,76.8],[60,74],[56,71]],
  [[11,78.5],[16,80],[25,80],[27,79],[20,77],[15,77]]
];

export const LAKES: Array<Array<[number, number]>> = [
  [[28,41.9],[28.5,43.3],[28.7,44.5],[30,45.4],[31.5,46.5],[33.5,46],[33,45.2],[34.8,44.8],[36.5,45.3],[38,47],[39.3,47],[38.2,45],[37.5,44.5],[39.5,43.3],[41.5,42],[41.7,41.4],[39,41],[36,41.3],[35,42],[33,42],[31,41.2],[29,41.2]],
  [[47,42.8],[47.5,44.5],[49,46.4],[50,46.8],[53,47],[53.2,45.5],[51,44.8],[50.2,44.2],[51.2,42.7],[52.8,42],[53.7,40.5],[53.1,39],[53.8,37.6],[52,36.8],[50.5,36.9],[49.2,37.5],[49,38.6],[48.8,40],[49.5,40.4],[48.6,41.5]],
  [[-93,49],[-89,48.2],[-84.5,46.6],[-84,48],[-88,48.8]]
];

export const HUBS: Hub[] = [
  { id: 'ny',  name: 'Nova York',     tag: 'SOC-US', lon: -74.0,  lat: 40.7 },
  { id: 'sp',  name: 'São Paulo',     tag: 'SOC-BR', lon: -46.6,  lat: -23.5 },
  { id: 'lon', name: 'Londres',       tag: 'SOC-UK', lon: -0.1,   lat: 51.5 },
  { id: 'fra', name: 'Frankfurt',     tag: 'SOC-EU', lon: 8.7,    lat: 50.1 },
  { id: 'jnb', name: 'Joanesburgo',   tag: 'SOC-ZA', lon: 28.0,   lat: -26.2 },
  { id: 'dxb', name: 'Dubai',         tag: 'SOC-AE', lon: 55.3,   lat: 25.2 },
  { id: 'bom', name: 'Mumbai',        tag: 'SOC-IN', lon: 72.8,   lat: 19.1 },
  { id: 'sin', name: 'Singapura',     tag: 'SOC-SG', lon: 103.8,  lat: 1.35 },
  { id: 'tyo', name: 'Tóquio',        tag: 'SOC-JP', lon: 139.7,  lat: 35.7 },
  { id: 'syd', name: 'Sydney',        tag: 'SOC-AU', lon: 151.2,  lat: -33.9 }
];

export const ORIGINS: Origin[] = [
  { id: 'o1', lon: 33,   lat: 52,  cat: 'malware',    category: 'Malware em Mod de Jogo / Pirataria', severity: 'Risco: Alto',       region: 'Incidente Simulado: Mod de Game Infectado',        desc: 'Arquivo executável promovido em fóruns de jogos prometendo moedas virtuais grátis continha trojan infostealer.', measures: ['Baixar jogos e aplicativos apenas de lojas e fontes oficiais', 'Nunca desativar proteções de segurança para instalar mods desconhecidos'] },
  { id: 'o2', lon: 16,   lat: 35,  cat: 'golpes',     category: 'Falso Pix & Loja Virtual Falsa',     severity: 'Risco: Crítico',    region: 'Incidente Simulado: Promoção Falsa em Rede Social',desc: 'Anúncio de celular com 90% de desconto redirecionando para página clonada com chave Pix aleatória.', measures: ['Conferir o nome e CNPJ do destinatário antes de confirmar qualquer Pix', 'Desconfiar de preços muito abaixo da média de mercado'] },
  { id: 'o3', lon: 108,  lat: 13,  cat: 'phishing',   category: 'Phishing via Mensagem Escolar',      severity: 'Risco: Moderado',   region: 'Incidente Simulado: Falso Alerta de Matrícula',    desc: 'Mensagem com link falso fingindo ser da secretaria escolar solicitando confirmação urgente de dados e senha.', measures: ['Checar o endereço oficial digitando diretamente no navegador', 'Não fornecer credenciais através de links recebidos em mensagens'] },
  { id: 'o4', lon: 118,  lat: 33,  cat: 'ia',         category: 'Deepfake & Clonagem de Voz com IA',  severity: 'Risco: Crítico',    region: 'Incidente Simulado: Golpe da Falsa Emergência',    desc: 'Golpistas utilizaram trecho de áudio de rede social para clonar a voz de um parente e pedir transferência urgente.', measures: ['Confirmar o pedido ligando imediatamente para o número habitual da pessoa', 'Combinar uma palavra-chave secreta de segurança entre a família'] },
  { id: 'o5', lon: -98,  lat: 39,  cat: 'phishing',   category: 'Página Falsa de Resgate de Robux',   severity: 'Risco: Moderado',   region: 'Incidente Simulado: Falso Brinde em Plataforma',   desc: 'Página clonando a tela de login de plataforma de games com promessa de skins e moedas gratuitas.', measures: ['Plataformas oficiais jamais pedem senha para entregar presentes', 'Ativar a autenticação multifator (MFA) em todas as contas de jogos'] },
  { id: 'o6', lon: -62,  lat: -9,  cat: 'golpes',     category: 'Falso Suporte de Recuperação',       severity: 'Risco: Alto',       region: 'Incidente Simulado: Cobrança Indevida em Perfil',  desc: 'Criminoso prometeu recuperar conta invadida de estudante exigindo pagamento antecipado e senhas.', measures: ['Recuperar contas exclusivamente pelos formulários oficiais da plataforma', 'Nunca pagar a desconhecidos prometendo resgatar perfis roubados'] },
  { id: 'o7', lon: 3,    lat: 9,   cat: 'malware',    category: 'Spyware em Trabalho Escolar Falso',  severity: 'Risco: Alto',       region: 'Incidente Simulado: Arquivo Malicioso via Chat',   desc: 'Documento PDF com código malicioso embutido enviado em grupo de estudos com o objetivo de capturar senhas salvas.', measures: ['Verificar a extensão real de arquivos antes de abrir', 'Manter navegadores e antivírus sempre atualizados'] },
  { id: 'o8', lon: 134,  lat: -25, cat: 'ia',         category: 'Desinformação Viral com IA em Escola', severity: 'Risco: Moderado', region: 'Incidente Simulado: Fake News Escolar com IA',     desc: 'Boato criado com imagem falsa gerada por IA sobre suspensão de aulas e ameaças espalhado em grupos.', measures: ['Consultar os canais oficiais da escola antes de repassar qualquer boato', 'Denunciar publicações falsas e não contribuir com o pânico coletivo'] }
];

export const LINKS: Array<[string, string]> = [
  ['ny', 'lon'], ['ny', 'sp'], ['lon', 'fra'], ['fra', 'dxb'], ['fra', 'jnb'], ['dxb', 'bom'],
  ['bom', 'sin'], ['sin', 'tyo'], ['sin', 'syd'], ['sp', 'jnb'], ['dxb', 'jnb'], ['tyo', 'syd']
];

export const HUB_BY_ID: Record<string, Hub> = {};
HUBS.forEach((h) => { HUB_BY_ID[h.id] = h; });

export function buildLandDots(stepDeg: number): LandDot[] {
  if (typeof document === 'undefined') return [];
  const W = 720;
  const H = Math.round(W * MAP_ASPECT);
  const oc = document.createElement('canvas');
  oc.width = W;
  oc.height = H;
  const c = oc.getContext ? oc.getContext('2d') : null;
  if (!c) return [];
  const X = (lon: number) => ((lon + 180) / 360) * W;
  const Y = (lat: number) => ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * H;
  const trace = (poly: Array<[number, number]>) => {
    c.beginPath();
    poly.forEach((p, i) => (i ? c.lineTo(X(p[0]), Y(p[1])) : c.moveTo(X(p[0]), Y(p[1]))));
    c.closePath();
  };
  c.fillStyle = '#fff';
  LAND.forEach((poly) => { trace(poly); c.fill(); });
  c.globalCompositeOperation = 'destination-out';
  LAKES.forEach((poly) => { trace(poly); c.fill(); });

  const data = c.getImageData(0, 0, W, H).data;
  const sx = (stepDeg * W) / 360;
  const sy = sx * 0.866;
  const dots: LandDot[] = [];
  let row = 0;
  for (let gy = sy * 0.5; gy < H; gy += sy, row++) {
    const off = row % 2 ? sx * 0.5 : 0;
    for (let gx = off + sx * 0.5; gx < W; gx += sx) {
      const ix = Math.round(gx);
      const iy = Math.round(gy);
      if (ix < W && iy < H && data[(iy * W + ix) * 4 + 3] > 120) {
        dots.push({ u: gx / W, v: gy / H, ph: Math.random() });
      }
    }
  }
  return dots;
}

let CACHED_LAND_DOTS: LandDot[] | null = null;
export const landDots = () => (CACHED_LAND_DOTS = CACHED_LAND_DOTS || buildLandDots(env.mobile ? 3.4 : 2.4));

export class WorldScene {
  mode: 'hero' | 'map';
  c: CanvasWrapper;
  dots: LandDot[];
  start: number;
  arcs: Arc[] = [];
  ripples: Ripple[] = [];
  spawnT = 0.6;
  filter = 'all';
  pan = 0;
  panTarget = 0;
  hover: { x: number; y: number } | null = null;
  sweepU = 0;
  spikeUntil = 0;
  stats = { blocked: 0 };
  markerPos: Array<{ x: number; y: number; o: Origin }> = [];
  maxArcs: number;
  buckets: Int32Array[];
  counts: Int32Array;
  linkPhase: number[];
  particles: Array<{ x: number; y: number; z: number; vx: number; vy: number; a: number }> = [];
  view = { w: 0, h: 0, x: 0, y: 0 };
  dotSize = 1.6;
  onHover?: (coords: { lon: number; lat: number; inside: boolean } | null) => void;
  onMarker?: (origin: Origin) => void;

  constructor(canvas: HTMLCanvasElement, opts: { mode: 'hero' | 'map' }) {
    this.mode = opts.mode;
    this.c = makeCanvas(canvas, 2);
    this.dots = landDots();
    this.start = performance.now() / 1000;
    this.maxArcs = this.mode === 'hero' ? (env.mobile ? 5 : 9) : (env.mobile ? 7 : 14);
    this.buckets = Array.from({ length: 6 }, () => new Int32Array(this.dots.length));
    this.counts = new Int32Array(6);
    this.linkPhase = LINKS.map(() => Math.random());

    if (this.mode === 'hero') {
      const n = env.mobile ? 26 : 70;
      for (let i = 0; i < n; i++) {
        this.particles.push({
          x: Math.random(),
          y: Math.random(),
          z: rand(0.25, 1),
          vx: rand(-0.004, 0.004),
          vy: rand(-0.012, -0.003),
          a: rand(0.2, 0.7)
        });
      }
    }
    this.layout();
    this.panTarget = this.pan = this.centerPan(10);
    this.c.onResize = () => {
      this.layout();
      this.pan = this.panTarget = this.clampPan(this.panTarget);
    };
    if (this.mode === 'map') this.bindMapInput(canvas);
  }

  layout(): void {
    const { w, h } = this.c;
    let vw: number;
    if (this.mode === 'hero') {
      vw = env.mobile ? Math.max(w * 2.1, h * 1.4) : Math.max(w * 1.06, h * 1.75);
    } else {
      vw = env.mobile ? w * 2.4 : w;
    }
    let vh = vw * MAP_ASPECT;
    if (this.mode === 'map' && vh > h * 0.98) {
      vh = h * 0.98;
      vw = vh / MAP_ASPECT;
    }
    this.view = { w: vw, h: vh, x: 0, y: this.mode === 'hero' ? h * 0.52 - vh / 2 : (h - vh) / 2 };
    this.dotSize = clamp((vw / 360) * (env.mobile ? 3.4 : 2.4) * 0.4, 1.3, 3.1);
  }

  centerPan(lon: number): number {
    return this.clampPan(this.c.w / 2 - ((lon + 180) / 360) * this.view.w);
  }

  clampPan(p: number): number {
    const min = Math.min(0, this.c.w - this.view.w);
    return clamp(p, min, Math.max(0, (this.c.w - this.view.w) / 2 > 0 ? (this.c.w - this.view.w) / 2 : 0));
  }

  project(lon: number, lat: number, k?: number): [number, number] {
    const v = this.view;
    const par = this.mode === 'hero' && !env.reduced ? k || 0 : 0;
    return [
      v.x + this.pan + ((lon + 180) / 360) * v.w + pointer.sx * par * 16,
      v.y + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * v.h + pointer.sy * par * 10
    ];
  }

  unproject(x: number, y: number): { lon: number; lat: number; inside: boolean } {
    const v = this.view;
    const lon = ((x - v.x - this.pan) / v.w) * 360 - 180;
    const lat = LAT_MAX - ((y - v.y) / v.h) * (LAT_MAX - LAT_MIN);
    return { lon, lat, inside: lat <= LAT_MAX && lat >= LAT_MIN && lon >= -180 && lon <= 180 };
  }

  skipIntro(): void {
    this.start = performance.now() / 1000 - 10;
  }

  visibleOrigins(): Origin[] {
    return ORIGINS.filter((o) => this.filter === 'all' || o.cat === this.filter);
  }

  setFilter(f: string): void {
    this.filter = f;
    this.arcs = this.arcs.filter((a) => f === 'all' || a.o.cat === f);
    this.spawnT = 0.1;
  }

  spawnArc(force?: boolean): void {
    if (!force && this.arcs.length >= this.maxArcs) return;
    const origins = this.visibleOrigins();
    if (!origins.length) return;
    const o = pick(origins);
    const h = pick(HUBS);
    this.arcs.push({ o, h, p: 0, speed: rand(0.2, 0.34), lift: rand(0.22, 0.4) });
  }

  pulse(): void {
    const now = performance.now() / 1000;
    HUBS.forEach((h, i) => {
      this.ripples.push({ lon: h.lon, lat: h.lat, start: now + i * 0.09, max: 90, col: 'a', life: 1.6 });
    });
  }

  spike(n: number): void {
    for (let i = 0; i < n; i++) this.spawnArc(true);
    this.spikeUntil = performance.now() / 1000 + 8;
  }

  markerAt(x: number, y: number): Origin | null {
    let best: Origin | null = null;
    let bd = 24;
    this.markerPos.forEach((m) => {
      const d = Math.hypot(m.x - x, m.y - y);
      if (d < bd) {
        bd = d;
        best = m.o;
      }
    });
    return best;
  }

  bindMapInput(canvas: HTMLCanvasElement): void {
    let down: { x: number; pan: number; moved: boolean } | null = null;
    canvas.addEventListener('pointerdown', (e) => {
      down = { x: e.clientX, pan: this.panTarget, moved: false };
      canvas.setPointerCapture(e.pointerId);
    });
    canvas.addEventListener('pointermove', (e) => {
      const r = canvas.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      this.hover = { x, y };
      if (down) {
        const dx = e.clientX - down.x;
        if (Math.abs(dx) > 5) down.moved = true;
        this.panTarget = this.clampPan(down.pan + dx);
      }
      canvas.style.cursor = this.markerAt(x, y) ? 'pointer' : (down && down.moved ? 'grabbing' : '');
      if (this.onHover) this.onHover(this.unproject(x, y));
    });
    canvas.addEventListener('pointerleave', () => {
      this.hover = null;
      if (this.onHover) this.onHover(null);
    });
    canvas.addEventListener('pointerup', (e) => {
      const r = canvas.getBoundingClientRect();
      if (down && !down.moved && this.onMarker) {
        const m = this.markerAt(e.clientX - r.left, e.clientY - r.top);
        if (m) this.onMarker(m);
      }
      down = null;
    });
  }

  draw(dt: number, t: number, still: boolean): void {
    const { ctx, w, h } = this.c;
    const it = still ? 99 : t - this.start;
    const col = accent(Loop.mix);
    const hero = this.mode === 'hero';
    ctx.clearRect(0, 0, w, h);
    this.pan += (this.panTarget - this.pan) * Math.min(1, dt * 8);
    const v = this.view;

    // 1) Grade de coordenadas
    const gridA = easeOut((it - 0.05) / 0.8);
    if (gridA > 0) {
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(col, 0.055 * gridA);
      ctx.beginPath();
      for (let lon = -180; lon <= 180; lon += 30) {
        const a = this.project(lon, LAT_MAX, 0.3);
        const b = this.project(lon, LAT_MIN, 0.3);
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
      }
      for (let lat = -40; lat <= 80; lat += 20) {
        const a = this.project(-180, lat, 0.3);
        const b = this.project(180, lat, 0.3);
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
      }
      ctx.stroke();
    }

    // 2) Continentes em matriz de pontos
    const dots = this.dots, counts = this.counts, bk = this.buckets;
    counts.fill(0);
    const revealU = easeOut((it - 0.2) / 1.7) * 1.35 - 0.1;
    if (this.mode === 'map') this.sweepU = (this.sweepU + dt * 0.11) % 1.25;
    const ox = this.pan + (hero && !env.reduced ? pointer.sx * 0.6 * 16 : 0);
    const oy = v.y + (hero && !env.reduced ? pointer.sy * 0.6 * 10 : 0);
    for (let i = 0; i < dots.length; i++) {
      const d = dots[i];
      const rv = clamp((revealU - d.u) * 7 + (d.ph - 0.5) * 0.4, 0, 1);
      if (rv <= 0) continue;
      let a = rv * (0.5 + 0.42 * d.ph) * (0.84 + 0.16 * Math.sin(t * 1.1 + d.ph * 6.28));
      if (this.mode === 'map') {
        const dd = Math.abs(d.u - (this.sweepU - 0.1));
        if (dd < 0.06) a += (1 - dd / 0.06) * 0.55;
      }
      const lv = Math.min(5, Math.round(a * 6.5));
      if (lv > 0) bk[lv][counts[lv]++] = i;
    }
    const s = this.dotSize;
    for (let lv = 1; lv <= 5; lv++) {
      if (!counts[lv]) continue;
      ctx.fillStyle = rgba(col, lv / 6.5);
      ctx.beginPath();
      const list = bk[lv];
      for (let k = 0; k < counts[lv]; k++) {
        const d = dots[list[k]];
        ctx.rect(ox + d.u * v.w - s / 2, oy + d.v * v.h - s / 2, s, s);
      }
      ctx.fill();
    }

    if (it < 2.3 && !still) {
      const sx = ox + revealU * v.w;
      const g = ctx.createLinearGradient(sx - 90, 0, sx + 6, 0);
      g.addColorStop(0, rgba(col, 0));
      g.addColorStop(1, rgba(col, 0.22 * (1 - clamp((it - 1.6) / 0.7, 0, 1))));
      ctx.fillStyle = g;
      ctx.fillRect(sx - 90, v.y - 10, 96, v.h + 20);
    }

    // 3) Rede defensiva entre nós
    const lineP = easeOut((it - 0.9) / 1.0);
    if (lineP > 0) {
      LINKS.forEach((lk, i) => {
        const A = HUB_BY_ID[lk[0]], B = HUB_BY_ID[lk[1]];
        const p0 = this.project(A.lon, A.lat, 1), p2 = this.project(B.lon, B.lat, 1);
        const lift = Math.hypot(p2[0] - p0[0], p2[1] - p0[1]) * 0.18;
        const cp: [number, number] = [(p0[0] + p2[0]) / 2, (p0[1] + p2[1]) / 2 - lift];
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        const steps = 18, n = Math.max(1, Math.floor(steps * lineP));
        for (let k = 1; k <= n; k++) {
          const q = quad(p0, cp, p2, k / steps);
          ctx.lineTo(q[0], q[1]);
        }
        ctx.strokeStyle = `rgba(8,123,255,${0.34 * lineP})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        if (it > 2 || still) {
          this.linkPhase[i] = (this.linkPhase[i] + dt * 0.12) % 1;
          const q = quad(p0, cp, p2, this.linkPhase[i]);
          ctx.beginPath();
          ctx.arc(q[0], q[1], 1.8, 0, 6.283);
          ctx.fillStyle = 'rgba(0,255,136,0.85)';
          ctx.fill();
        }
      });
    }

    // 4) Nós defensivos
    const labelOn = !(hero && env.mobile);
    HUBS.forEach((hb, i) => {
      const k = easeOut((it - 1.1 - i * 0.07) / 0.5);
      if (k <= 0) return;
      const p = this.project(hb.lon, hb.lat, 1);
      const pr = 7 + 3 * Math.sin(t * 2 + i);
      ctx.beginPath();
      ctx.arc(p[0], p[1], pr * k, 0, 6.283);
      ctx.strokeStyle = rgba(col, 0.35 * k);
      ctx.lineWidth = 1.1;
      ctx.stroke();
      glowAccent(ctx, Loop.mix, p[0], p[1], 15 * k, 0.85);
      ctx.beginPath();
      ctx.arc(p[0], p[1], 3.2 * k, 0, 6.283);
      ctx.fillStyle = rgba(col, 1);
      ctx.fill();
      if (labelOn && k > 0.8) {
        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillText(hero ? hb.tag : hb.name, p[0] + 9, p[1] - 8);
      }
    });

    // 5) Marcadores de origens simuladas
    this.markerPos.length = 0;
    const origins = this.visibleOrigins();
    origins.forEach((o, i) => {
      const k = easeOut((it - 1.7 - i * 0.12) / 0.4);
      if (k <= 0) return;
      const p = this.project(o.lon, o.lat, 1);
      this.markerPos.push({ x: p[0], y: p[1], o });
      const ph = (t * 0.7 + i * 0.37) % 1;
      ctx.beginPath();
      ctx.arc(p[0], p[1], (4 + ph * 16) * k, 0, 6.283);
      ctx.strokeStyle = `rgba(255,21,61,${(1 - ph) * 0.5 * k})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
      glow(ctx, 'red', p[0], p[1], 15 * k, 0.9);
      ctx.beginPath();
      ctx.arc(p[0], p[1], 3.4 * k, 0, 6.283);
      ctx.fillStyle = '#FF3355';
      ctx.fill();
    });

    // 6) Arcos de ataque
    if (it > 2.1 || still) {
      const red = Loop.mix > 0.5;
      if (!still) {
        this.spawnT -= dt;
        if (this.spawnT <= 0) {
          this.spawnArc(false);
          const spiking = t < this.spikeUntil;
          this.spawnT = rand(0.7, 1.4) * (red ? 0.4 : 1) * (spiking ? 0.3 : 1);
        }
      } else if (!this.arcs.length) {
        for (let i = 0; i < 5; i++) {
          this.spawnArc(true);
          this.arcs[i].p = rand(0.25, 0.85);
        }
      }
      for (let i = this.arcs.length - 1; i >= 0; i--) {
        const a = this.arcs[i];
        a.p += a.speed * dt * (red ? 1.5 : 1);
        const p0 = this.project(a.o.lon, a.o.lat, 1), p2 = this.project(a.h.lon, a.h.lat, 1);
        const dist = Math.hypot(p2[0] - p0[0], p2[1] - p0[1]);
        const cp: [number, number] = [(p0[0] + p2[0]) / 2, (p0[1] + p2[1]) / 2 - dist * a.lift - 14];
        const head = Math.min(1, a.p);
        ctx.beginPath();
        ctx.moveTo(p0[0], p0[1]);
        ctx.quadraticCurveTo(cp[0], cp[1], p2[0], p2[1]);
        ctx.strokeStyle = 'rgba(255,21,61,0.12)';
        ctx.lineWidth = 1;
        ctx.stroke();
        const t0 = Math.max(0, head - 0.36);
        const hp = quad(p0, cp, p2, head), tp = quad(p0, cp, p2, t0);
        const g = ctx.createLinearGradient(tp[0], tp[1], hp[0], hp[1]);
        g.addColorStop(0, 'rgba(255,21,61,0)');
        g.addColorStop(1, 'rgba(255,90,110,0.95)');
        ctx.beginPath();
        for (let k = 0; k <= 12; k++) {
          const q = quad(p0, cp, p2, lerp(t0, head, k / 12));
          k ? ctx.lineTo(q[0], q[1]) : ctx.moveTo(q[0], q[1]);
        }
        ctx.strokeStyle = g;
        ctx.lineWidth = a.o.cat === 'ransomware' ? 2.2 : 1.5;
        ctx.stroke();
        if (a.p < 1) {
          glow(ctx, 'red', hp[0], hp[1], 13, 0.95);
          ctx.beginPath();
          ctx.arc(hp[0], hp[1], 2.4, 0, 6.283);
          ctx.fillStyle = '#FFD0D6';
          ctx.fill();
        } else {
          this.ripples.push({ lon: a.h.lon, lat: a.h.lat, start: t, max: 30, col: 'g', life: 0.9 });
          this.stats.blocked++;
          this.arcs.splice(i, 1);
        }
      }
    }

    // 7) Ondas de interceptação
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      const k = (t - r.start) / r.life;
      if (k < 0) continue;
      if (k >= 1) {
        this.ripples.splice(i, 1);
        continue;
      }
      const p = this.project(r.lon, r.lat, 1);
      ctx.beginPath();
      ctx.arc(p[0], p[1], 6 + r.max * easeOut(k), 0, 6.283);
      ctx.strokeStyle = r.col === 'g' ? `rgba(0,255,136,${(1 - k) * 0.85})` : rgba(col, (1 - k) * 0.7);
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }

    // 8) Retículo no cursor (modo mapa)
    if (this.mode === 'map' && this.hover) {
      const u = this.unproject(this.hover.x, this.hover.y);
      if (u.inside) {
        ctx.strokeStyle = rgba(col, 0.35);
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 5]);
        ctx.beginPath();
        ctx.moveTo(this.hover.x, 0); ctx.lineTo(this.hover.x, h);
        ctx.moveTo(0, this.hover.y); ctx.lineTo(w, this.hover.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }

    // 9) Partículas volumétricas flutuantes (modo hero)
    if (hero && this.particles.length) {
      const pa = easeOut((it - 0.2) / 1.2);
      this.particles.forEach((p) => {
        p.x += p.vx * dt * (still ? 0 : 1);
        p.y += p.vy * dt * (still ? 0 : 1);
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); }
        if (p.x < -0.02) p.x = 1.02;
        if (p.x > 1.02) p.x = -0.02;
        const px = p.x * w + pointer.sx * p.z * 26;
        const py = p.y * h + pointer.sy * p.z * 16;
        ctx.fillStyle = rgba(col, p.a * pa * p.z);
        ctx.fillRect(px, py, 1 + p.z * 1.6, 1 + p.z * 1.6);
      });
    }
  }
}
