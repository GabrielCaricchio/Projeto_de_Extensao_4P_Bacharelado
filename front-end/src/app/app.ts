import { Component, DestroyRef, afterNextRender, inject } from '@angular/core';
import { TacticalAudioService } from './services/tactical-audio.service';
import { ThemeService, CyberTheme } from './services/theme.service';
import { ChatService } from './services/chat.service';
import {
  Loop,
  WorldScene,
  makeCanvas,
  animateCanvas,
  gate,
  glow,
  glowAccent,
  accent,
  rgba,
  clamp,
  lerp,
  rand,
  pick,
  smooth,
  easeOut,
  easeInOut,
  pointer,
  env,
  HUBS
} from './core/cyber-engine';
import { TOPICS_DATA, TopicDetail, QUIZ_QUESTIONS, QuizQuestion } from './core/topics-data';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly audio = inject(TacticalAudioService);
  private readonly theme = inject(ThemeService);
  private readonly chat = inject(ChatService);
  private readonly destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      this.boot();
    });
  }

  private boot(): void {
    if (typeof document === 'undefined') return;

    const audio = this.audio;
    const theme = this.theme;

    document.documentElement.classList.add('js');

    const intervals: number[] = [];
    const eventListeners: Array<{ target: EventTarget; type: string; listener: EventListenerOrEventListenerObject; opts?: boolean | AddEventListenerOptions }> = [];

    const listen = (target: EventTarget, type: string, listener: EventListenerOrEventListenerObject, opts?: boolean | AddEventListenerOptions) => {
      target.addEventListener(type, listener, opts);
      eventListeners.push({ target, type, listener, opts });
    };

    const addInterval = (fn: () => void, ms: number): number => {
      const id = window.setInterval(fn, ms);
      intervals.push(id);
      return id;
    };

    const $ = (sel: string, root: ParentNode = document): HTMLElement | null => root.querySelector(sel);
    const $$ = (sel: string, root: ParentNode = document): HTMLElement[] => Array.from(root.querySelectorAll(sel));

    // -------------------------------------------------------------
    // 01. CURSOR RETICULAR & TEMA & HUD
    // -------------------------------------------------------------
    const initCyberCursor = () => {
      const cursor = $('#cyberCursor');
      if (!cursor) return;
      if (!env.fine) {
        cursor.style.display = 'none';
        return;
      }

      let px = pointer.x, py = pointer.y;
      listen(document, 'pointerleave', () => { cursor.style.opacity = '0'; });

      const task = Loop.add((dt) => {
        const k = Math.min(1, dt * 14);
        px += (pointer.x - px) * k;
        py += (pointer.y - py) * k;
        if (Math.abs(pointer.x - px) < 0.3 && Math.abs(pointer.y - py) < 0.3) task.active = false;
        cursor.style.transform = `translate3d(${px.toFixed(1)}px, ${py.toFixed(1)}px, 0) translate(-50%, -50%)`;
      });

      listen(window, 'pointermove', () => {
        cursor.style.opacity = '1';
        task.active = true;
        Loop.wake();
      }, { passive: true });

      const sel = 'a, button, input, select, textarea, [role="button"], .faq-trigger, .threat-card, .importance-card, .article-card, .holo-pillar-card';
      listen(document, 'pointerover', (e: Event) => {
        const t = (e.target as Element).closest && (e.target as Element).closest(sel);
        if (t) {
          cursor.classList.add('hovering');
          audio.playTone(1100, 0.04, 'sine', 0.02);
        }
      });
      listen(document, 'pointerout', (e: Event) => {
        const t = (e.target as Element).closest && (e.target as Element).closest(sel);
        if (t) cursor.classList.remove('hovering');
      });
    };

    const initHudControls = () => {
      const cyanBtn = $('#modeCyanBtn');
      const redBtn = $('#modeRedBtn');
      const audioBtn = $('#audioToggleBtn');
      const audioText = $('#audioStatusText');

      if (cyanBtn) {
        listen(cyanBtn, 'click', () => {
          theme.setTheme('cyan');
          Loop.targetMix = 0;
          cyanBtn.classList.add('active-cyan');
          cyanBtn.setAttribute('aria-pressed', 'true');
          redBtn?.classList.remove('active-red');
          redBtn?.setAttribute('aria-pressed', 'false');
        });
      }

      if (redBtn) {
        listen(redBtn, 'click', () => {
          theme.setTheme('red');
          Loop.targetMix = 1;
          redBtn.classList.add('active-red');
          redBtn.setAttribute('aria-pressed', 'true');
          cyanBtn?.classList.remove('active-cyan');
          cyanBtn?.setAttribute('aria-pressed', 'false');
        });
      }

      if (audioBtn) {
        listen(audioBtn, 'click', () => {
          const isEnabled = audio.toggleAudio();
          audioBtn.classList.toggle('is-on', isEnabled);
          audioBtn.setAttribute('aria-pressed', String(isEnabled));
          audioBtn.setAttribute('aria-label', isEnabled ? 'Desativar efeitos sonoros (ligado)' : 'Ativar efeitos sonoros (desligado)');
          if (audioText) audioText.textContent = isEnabled ? 'ON' : 'OFF';
        });
      }

      // Menu Móvel
      const toggle = $('#mobileToggle');
      const drawer = $('#mobileDrawer');
      if (toggle && drawer) {
        const setOpen = (open: boolean) => {
          drawer.classList.toggle('open', open);
          toggle.classList.toggle('is-open', open);
          toggle.setAttribute('aria-expanded', String(open));
          toggle.setAttribute('aria-label', open ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
          drawer.setAttribute('aria-hidden', String(!open));
          document.body.classList.toggle('menu-open', open);
        };
        listen(toggle, 'click', () => setOpen(!drawer.classList.contains('open')));
        $$('.mobile-link', drawer).forEach((l) => listen(l, 'click', () => setOpen(false)));
        $$('.mobile-drawer-btn', drawer).forEach((l) => listen(l, 'click', () => setOpen(false)));
        listen(document, 'keydown', (e: Event) => {
          if ((e as KeyboardEvent).key === 'Escape') setOpen(false);
        });
        listen(document, 'click', (e: Event) => {
          const target = e.target as Node;
          if (drawer.classList.contains('open') && !drawer.contains(target) && !toggle.contains(target)) {
            setOpen(false);
          }
        });
        listen(window, 'resize', () => {
          if (window.innerWidth > 1260) setOpen(false);
        });
      }
    };

    // -------------------------------------------------------------
    // 02. MOTOR DE ROLAGEM
    // -------------------------------------------------------------
    const Scroll = (() => {
      let scrubs: HTMLElement[] = [];
      let scenes: Array<{ el: HTMLElement; rgb: number[] }> = [];
      let navPairs: Array<{ el: HTMLElement; link: HTMLElement }> = [];
      let ticking = false;
      let lastY = window.scrollY || 0;
      const listeners: Array<(scrollY: number, vh: number) => void> = [];
      const root = document.documentElement;
      const progressBar = $('#scrollProgress');
      const header = $('#mainHeader');

      function collect() {
        scrubs = $$('[data-scrub]');
        scenes = $$('[data-scene]').map((el) => ({
          el,
          rgb: (el.dataset['scene'] || '0,229,255').split(',').map(Number)
        }));
        navPairs = [];
        $$('.nav-link').forEach((link) => {
          const href = link.getAttribute('href');
          if (href && href.startsWith('#') && href.length > 1) {
            const targetEl = document.getElementById(href.slice(1));
            if (targetEl) navPairs.push({ el: targetEl, link });
          }
        });
      }

      function update() {
        ticking = false;
        const vh = window.innerHeight;
        const y = window.scrollY || 0;
        const max = Math.max(1, document.documentElement.scrollHeight - vh);
        const p = clamp(y / max, 0, 1);
        if (progressBar) progressBar.style.width = (p * 100).toFixed(2) + '%';
        if (header) header.classList.toggle('scrolled', y > 40);

        Loop.scrollVel = (y - lastY) / Math.max(0.016, 0.05);
        lastY = y;

        for (let i = 0; i < scrubs.length; i++) {
          const el = scrubs[i];
          const r = el.getBoundingClientRect();
          const passage = clamp((vh - r.top) / (vh + r.height), 0, 1);
          const center = (r.top + r.height / 2 - vh / 2) / vh;
          const exit = clamp(-r.top / r.height, 0, 1);
          const enter = clamp((vh - r.top) / vh, 0, 1);
          el.style.setProperty('--p', passage.toFixed(4));
          el.style.setProperty('--c', center.toFixed(4));
          el.style.setProperty('--e', exit.toFixed(4));
          el.style.setProperty('--n', enter.toFixed(4));
        }

        // Iluminação da cena
        if (scenes.length) {
          let sumW = 0, sr = 0, sg = 0, sb = 0;
          for (let i = 0; i < scenes.length; i++) {
            const sc = scenes[i];
            const r = sc.el.getBoundingClientRect();
            const w = Math.max(0, Math.min(r.bottom, vh) - Math.max(r.top, 0));
            if (w > 0) {
              sumW += w;
              sr += sc.rgb[0] * w;
              sg += sc.rgb[1] * w;
              sb += sc.rgb[2] * w;
            }
          }
          if (sumW > 0) {
            root.style.setProperty('--scene-rgb', `${Math.round(sr / sumW)}, ${Math.round(sg / sumW)}, ${Math.round(sb / sumW)}`);
          }
        }

        // Navegação ativa
        let currentLink: HTMLElement | null = null;
        for (let i = navPairs.length - 1; i >= 0; i--) {
          const pair = navPairs[i];
          const top = pair.el.getBoundingClientRect().top;
          if (top <= vh * 0.38) {
            currentLink = pair.link;
            break;
          }
        }
        if (!currentLink && navPairs.length) currentLink = navPairs[0].link;
        navPairs.forEach((p) => p.link.classList.toggle('active', p.link === currentLink));

        listeners.forEach((fn) => fn(y, vh));
      }

      function onScroll() {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      }

      return {
        init() {
          collect();
          listen(window, 'scroll', onScroll, { passive: true });
          listen(window, 'resize', () => { collect(); update(); });
          update();
        },
        onUpdate(fn: (scrollY: number, vh: number) => void) {
          listeners.push(fn);
        },
        refresh() {
          collect();
          update();
        }
      };
    })();

    // -------------------------------------------------------------
    // 03. CANVAS DE FUNDO
    // -------------------------------------------------------------
    const initBackgroundCanvas = () => {
      const canvas = $('#bgCanvas') as HTMLCanvasElement | null;
      if (!canvas) return;
      const c = makeCanvas(canvas, 1.5);
      const count = env.mobile ? 14 : 34;
      const parts = Array.from({ length: count }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: rand(-0.012, 0.012),
        vy: rand(-0.012, 0.012),
        r: rand(0.6, 1.8),
        a: rand(0.2, 0.55)
      }));
      const LINK = 130;
      animateCanvas(c, (dt) => {
        const { ctx, w, h } = c;
        ctx.clearRect(0, 0, w, h);
        const col = accent(Loop.mix);
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i];
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          if (p.x < 0) p.x = 1;
          if (p.x > 1) p.x = 0;
          if (p.y < 0) p.y = 1;
          if (p.y > 1) p.y = 0;
          const px = p.x * w, py = p.y * h;
          ctx.fillStyle = rgba(col, p.a * 0.45);
          ctx.fillRect(px, py, p.r, p.r);
          for (let j = i + 1; j < parts.length; j++) {
            const q = parts[j];
            const dx = px - q.x * w, dy = py - q.y * h;
            const d2 = dx * dx + dy * dy;
            if (d2 < LINK * LINK) {
              ctx.strokeStyle = rgba(col, (1 - Math.sqrt(d2) / LINK) * 0.09);
              ctx.beginPath();
              ctx.moveTo(px, py);
              ctx.lineTo(q.x * w, q.y * h);
              ctx.stroke();
            }
          }
        }
      }, { alwaysAnimate: false });
    };

    // -------------------------------------------------------------
    // 04. HERO CINEMATOGRÁFICO
    // -------------------------------------------------------------
    const initHero = () => {
      const canvas = $('#heroWorldCanvas') as HTMLCanvasElement | null;
      const hero = $('#hero');
      if (!canvas || !hero) return;

      const scene = new WorldScene(canvas, { mode: 'hero' });
      animateCanvas(scene.c, (dt, t, still) => scene.draw(dt, t, still));

      const timers: number[] = [];
      const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
      const reveal = (el: HTMLElement | null) => el && el.classList.add('revealed');
      const panels = $$('.hud-panel');
      const steps: Array<[number, () => void]> = [
        [1600, () => panels.forEach((p, i) => window.setTimeout(() => p.classList.add('in'), i * 190))],
        [1700, () => reveal($('#heroBadge'))],
        [1900, () => reveal($('#heroTitle'))],
        [2600, () => reveal($('#heroDesc'))],
        [2900, () => reveal($('#heroCtas'))],
        [3200, () => $('#scrollDownIndicator')?.classList.add('in')]
      ];

      const finishNow = () => {
        timers.forEach(clearTimeout);
        steps.forEach((s) => s[1]());
        scene.skipIntro();
      };

      if (env.reduced) {
        finishNow();
      } else {
        steps.forEach((s) => at(s[0], s[1]));
        ['wheel', 'touchstart', 'keydown'].forEach((ev) => {
          listen(window, ev, () => {
            if (performance.now() / 1000 - scene.start < 3.4) finishNow();
          }, { once: true, passive: true });
        });
      }

      // Feed de eventos simulados
      const feed = $('#heroFeedList');
      const TYPES: Array<[string, string]> = [
        ['Phishing WhatsApp', 'phishing'],
        ['Fake News com IA', 'apt'],
        ['Golpe Pix Falso', 'ransom'],
        ['Malware em Game', 'ddos'],
        ['Perfil Clonado', 'phishing']
      ];
      let counter = 101;
      const clock = () => {
        const d = new Date();
        return [d.getHours(), d.getMinutes(), d.getSeconds()].map((n) => String(n).padStart(2, '0')).join(':');
      };

      function addFeed() {
        if (!feed) return;
        const red = Loop.mix > 0.5;
        const ty = pick(TYPES);
        const status = red && Math.random() < 0.5 ? 'em verificação' : pick(['bloqueado', 'alertado', 'mitigado']);
        const li = document.createElement('li');
        const mk = (cls: string, txt: string) => {
          const s = document.createElement('span');
          s.className = cls;
          s.textContent = txt;
          return s;
        };
        li.append(
          mk('f-time', clock()),
          mk('f-id', 'EDU-' + String(counter++).padStart(4, '0')),
          mk(`f-t t-${ty[1]}`, ty[0]),
          mk('f-h', pick(HUBS).name),
          mk(`f-s ${status === 'em verificação' ? 's-warn' : 's-ok'}`, status)
        );
        feed.prepend(li);
        while (feed.children.length > 5) feed.lastElementChild?.remove();
      }
      for (let i = 0; i < 5; i++) addFeed();

      // Barras de carga de sensores
      const barsBox = $('#heroBars');
      const bars: Array<{ el: HTMLElement; v: number }> = [];
      if (barsBox) {
        for (let i = 0; i < 18; i++) {
          const b = document.createElement('i');
          b.className = 'hp-bar';
          barsBox.appendChild(b);
          bars.push({ el: b, v: rand(0.25, 0.7) });
        }
      }

      function tickBars() {
        const red = Loop.mix > 0.5;
        bars.forEach((b) => {
          b.v = clamp(b.v + rand(-0.18, 0.18) + (red ? 0.03 : -0.01), 0.12, 1);
          b.el.style.setProperty('--h', b.v.toFixed(2));
          b.el.classList.toggle('hot', b.v > 0.82);
        });
      }
      tickBars();

      theme.onThemeChange(() => {
        addFeed();
        tickBars();
      });

      let heroVisible = true;
      if (typeof IntersectionObserver !== 'undefined') {
        new IntersectionObserver((en) => { heroVisible = en[0].isIntersecting; }).observe(hero);
      }
      if (!env.reduced) {
        addInterval(() => { if (heroVisible && !document.hidden) addFeed(); }, 2400);
        addInterval(() => { if (heroVisible && !document.hidden) tickBars(); }, 950);
      }
    };
    // -------------------------------------------------------------
    // 08. FAQ ACCORDION
    // -------------------------------------------------------------
    const initFaqAccordion = () => {
      const items = $$('.faq-item');
      items.forEach((item, idx) => {
        const trigger = $('.faq-trigger', item);
        const content = $('.faq-content', item);
        if (!trigger || !content) return;
        content.id = content.id || `faq-panel-${idx}`;
        trigger.setAttribute('aria-controls', content.id);
        listen(trigger, 'click', () => {
          const wasActive = item.classList.contains('active');
          items.forEach((o) => {
            o.classList.remove('active');
            const t = $('.faq-trigger', o), ch = $('.faq-chevron', o);
            if (t) t.setAttribute('aria-expanded', 'false');
            if (ch) ch.textContent = '+';
          });
          if (!wasActive) {
            item.classList.add('active');
            trigger.setAttribute('aria-expanded', 'true');
            const ch = $('.faq-chevron', item);
            if (ch) ch.textContent = '−';
            audio.playTone(820, 0.05, 'sine', 0.03);
          }
        });
      });
    };

    // -------------------------------------------------------------
    // 14. EFEITOS DE CARTÃO E BOTÕES
    // -------------------------------------------------------------
    const initCardFX = () => {
      $$('.threat-svg').forEach((svg) => {
        Array.from(svg.querySelectorAll('path, circle, rect')).forEach((p, i) => {
          if (p.hasAttribute('stroke-dasharray')) return;
          p.setAttribute('pathLength', '1');
          p.classList.add('draw');
          (p as HTMLElement).style.setProperty('--k', String(i));
        });
      });

      if (!env.fine || env.reduced) return;
      const sel = '.threat-card, .quiz-card, .help-channel-card';
      let raf = 0, last: HTMLElement | null = null;
      const reset = (el: HTMLElement) => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      };

      listen(document, 'pointermove', (e: Event) => {
        const target = e.target as Element;
        const el = (target.closest && target.closest(sel)) as HTMLElement | null;
        if (!el) {
          if (last) { reset(last); last = null; }
          return;
        }
        if (last && last !== el) reset(last);
        last = el;
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const r = el.getBoundingClientRect();
          const x = pointer.x - r.left, y = pointer.y - r.top;
          el.style.setProperty('--mx', x + 'px');
          el.style.setProperty('--my', y + 'px');
          if (el.hasAttribute('data-tilt')) {
            el.style.setProperty('--rx', ((y / r.height - 0.5) * -7).toFixed(2) + 'deg');
            el.style.setProperty('--ry', ((x / r.width - 0.5) * 7).toFixed(2) + 'deg');
          }
        });
      }, { passive: true });
    };

    const initButtons = () => {
      listen(document, 'pointerdown', (e: Event) => {
        const me = e as MouseEvent;
        const b = (me.target as Element).closest && (me.target as Element).closest('.btn');
        if (!b || env.reduced) return;
        const r = b.getBoundingClientRect();
        const s = document.createElement('i');
        s.className = 'btn-ripple';
        s.style.left = (me.clientX - r.left) + 'px';
        s.style.top = (me.clientY - r.top) + 'px';
        b.appendChild(s);
        window.setTimeout(() => s.remove(), 650);
      });

      if (!env.fine || env.reduced) return;
      $$('.btn-magnetic').forEach((b) => {
        listen(b, 'pointermove', (e: Event) => {
          const me = e as MouseEvent;
          const r = b.getBoundingClientRect();
          const dx = (me.clientX - (r.left + r.width / 2)) / r.width;
          const dy = (me.clientY - (r.top + r.height / 2)) / r.height;
          b.style.translate = `${(dx * 10).toFixed(1)}px ${(dy * 8).toFixed(1)}px`;
          b.style.setProperty('--sx', ((me.clientX - r.left) / r.width * 100).toFixed(0) + '%');
        });
        listen(b, 'pointerleave', () => { b.style.translate = ''; });
      });
    };

    // -------------------------------------------------------------
    // 16. MOTOR DE REVELAÇÕES
    // -------------------------------------------------------------
    const splitWords = (el: HTMLElement) => {
      if (!el || el.dataset['split']) return;
      const text = el.textContent?.trim() || '';
      el.setAttribute('aria-label', text);
      el.dataset['split'] = '1';
      el.textContent = '';
      text.split(/\s+/).forEach((word, i) => {
        const mask = document.createElement('span');
        mask.className = 'sw';
        mask.setAttribute('aria-hidden', 'true');
        const inner = document.createElement('span');
        inner.className = 'sw-i';
        inner.style.setProperty('--i', String(i));
        inner.textContent = word;
        mask.appendChild(inner);
        el.appendChild(mask);
        el.appendChild(document.createTextNode(' '));
      });
    };

    const prepareReveals = () => {
      $$('.section-title').forEach((el) => {
        splitWords(el);
        el.setAttribute('data-reveal', 'words');
      });

      const rules: Array<[string, string | ((el: HTMLElement, i: number) => string)]> = [
        ['.section-tag', 'tag'], ['.section-subtitle', 'up'], ['.demo-mode-badge', 'up'],
        ['.threat-card', (el, i) => ['left', 'up', 'right'][i % 3]],
        ['.faq-item', 'line'],
        ['.quiz-card', 'frame'], ['.help-channel-card', 'up']
      ];

      rules.forEach(([sel, kind]) => {
        const groups = new Map<HTMLElement, number>();
        $$(sel).forEach((el) => {
          if (el.hasAttribute('data-reveal')) return;
          const parent = el.parentElement as HTMLElement;
          const idx = groups.get(parent) || 0;
          groups.set(parent, idx + 1);
          el.setAttribute('data-reveal', typeof kind === 'function' ? kind(el, idx) : kind);
          const row = sel === '.threat-card' ? Math.floor(idx / 3) : 0;
          el.style.setProperty('--d', ((sel === '.threat-card' ? (idx % 3) * 0.1 + row * 0.05 : idx * 0.09)).toFixed(2) + 's');
        });
      });

      $$('.hero-section').forEach((el) => el.setAttribute('data-scrub', ''));
    };

    const initRevealObserver = () => {
      let pending = $$('[data-reveal]');
      if (env.reduced) {
        pending.forEach((el) => el.classList.add('in'));
        return;
      }
      const check = (y?: number, vh?: number) => {
        if (!pending.length) return;
        const h = vh || window.innerHeight;
        const rects = pending.map((el) => el.getBoundingClientRect());
        const still: HTMLElement[] = [];
        pending.forEach((el, i) => {
          const r = rects[i];
          if (r.top < h * 0.9) el.classList.add('in');
          else still.push(el);
        });
        pending = still;
      };
      Scroll.onUpdate(check);
      check();
    };

    // -------------------------------------------------------------
    // 17. EXPLORADOR DE TEMAS & GUIA DIDÁTICO MODAL
    // -------------------------------------------------------------
    const initTopicExplorer = () => {
      const filterBtns = $$('.topic-filter-btn');
      const cards = $$('.threat-card[data-cat]');
      const modal = $('#topicModal');
      const closeBtn = $('#closeTopicModalBtn');
      const dismissBtn = $('#btnDismissTopicModal');
      const goToQuizBtn = $('#btnGoToQuizFromModal');

      // Filtro de categorias
      filterBtns.forEach((btn) => {
        listen(btn, 'click', () => {
          filterBtns.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
          const cat = btn.dataset['cat'] || 'all';

          cards.forEach((c) => {
            const match = cat === 'all' || c.dataset['cat'] === cat;
            c.classList.toggle('is-hidden', !match);
          });
          audio.playTone(850, 0.05, 'sine', 0.03);
          Scroll.refresh();
        });
      });

      if (!modal) return;

      const openModal = (topicId: string) => {
        const topic = TOPICS_DATA.find((t) => t.id === topicId);
        if (!topic) return;

        const badge = $('#topicModalBadge');
        if (badge) {
          badge.textContent = `TEMA ${topic.number} // ${topic.badge}`;
          badge.className = `threat-badge ${topic.badgeClass}`;
        }

        const title = $('#topicModalTitle');
        if (title) title.textContent = topic.title;

        const entendaTitle = $('#topicModalEntendaTitle');
        if (entendaTitle) entendaTitle.textContent = topic.entenda.title;

        const entendaText = $('#topicModalEntendaText');
        if (entendaText) entendaText.textContent = topic.entenda.text;

        const entendaConcept = $('#topicModalEntendaConcept');
        if (entendaConcept) entendaConcept.textContent = `💡 DICA CHAVE: ${topic.entenda.conceitoChave}`;

        // Exemplos
        const exBox = $('#topicModalExemplos');
        if (exBox) {
          exBox.innerHTML = '';
          topic.reconheca.exemplos.forEach((ex) => {
            const d = document.createElement('div');
            d.style.marginBottom = '12px';
            d.innerHTML = `<strong style="color: #FFFFFF; display: block; margin-bottom: 2px;">• ${ex.title}:</strong> <span style="font-size: 0.88rem; color: var(--text-muted);">${ex.desc}</span>`;
            exBox.appendChild(d);
          });
          if (topic.reconheca.sinaisAlerta.length) {
            const sa = document.createElement('div');
            sa.style.marginTop = '14px';
            sa.style.paddingTop = '10px';
            sa.style.borderTop = '1px solid rgba(255,255,255,0.08)';
            sa.innerHTML = `<strong style="color: var(--accent-red); font-size: 0.8rem; display: block; margin-bottom: 6px;">⚠️ SINAIS DE ALERTA:</strong>`;
            const ul = document.createElement('ul');
            ul.className = 'topic-list-items';
            topic.reconheca.sinaisAlerta.forEach((s) => {
              const li = document.createElement('li');
              li.textContent = s;
              ul.appendChild(li);
            });
            sa.appendChild(ul);
            exBox.appendChild(sa);
          }
        }

        // Previna-se
        const prevList = $('#topicModalPrevinaseList');
        if (prevList) {
          prevList.innerHTML = '';
          topic.previnase.passos.forEach((p) => {
            const li = document.createElement('li');
            li.textContent = p;
            prevList.appendChild(li);
          });
        }

        // Saiba agir
        const agirList = $('#topicModalSaibaAgirList');
        if (agirList) {
          agirList.innerHTML = '';
          topic.saibaAgir.orientacoes.forEach((o) => {
            const li = document.createElement('li');
            li.textContent = o;
            agirList.appendChild(li);
          });
        }
        const acolhimento = $('#topicModalAcolhimento');
        if (acolhimento) {
          acolhimento.textContent = `🤝 ACOLHIMENTO E APOIO: ${topic.saibaAgir.acolhimento}`;
        }

        // Revise
        const chkList = $('#topicModalChecklist');
        if (chkList) {
          chkList.innerHTML = '';
          topic.revise.checklist.forEach((c) => {
            const li = document.createElement('li');
            li.textContent = c;
            chkList.appendChild(li);
          });
        }

        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        audio.playTone(920, 0.08, 'sine', 0.04);
      };

      const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        audio.playTone(540, 0.05, 'sine', 0.02);
      };

      // Abrir ao clicar no botão "Abrir Guia Didático" ou no card
      $$('.btn-open-topic-guide').forEach((btn) => {
        listen(btn, 'click', (e: Event) => {
          e.stopPropagation();
          const card = (btn.closest && btn.closest('.threat-card')) as HTMLElement | null;
          const tid = card?.dataset['topicId'] || '';
          if (tid) openModal(tid);
        });
      });

      cards.forEach((card) => {
        listen(card, 'click', (e: Event) => {
          const tid = card.dataset['topicId'] || '';
          if (tid) openModal(tid);
        });
      });

      if (closeBtn) listen(closeBtn, 'click', closeModal);
      if (dismissBtn) listen(dismissBtn, 'click', closeModal);
      if (goToQuizBtn) {
        listen(goToQuizBtn, 'click', () => {
          closeModal();
        });
      }

      const askBotTopicBtn = $('#btnAskBotAboutTopic');
      if (askBotTopicBtn) {
        listen(askBotTopicBtn, 'click', () => {
          const titleEl = $('#topicModalTitle');
          const topicTitle = titleEl ? titleEl.textContent?.trim() : 'segurança digital';
          closeModal();
          const chatSec = document.getElementById('chatbot');
          if (chatSec) {
            chatSec.scrollIntoView({ behavior: 'smooth' });
          }
          const chatInput = $('#chatInputText') as HTMLInputElement | null;
          if (chatInput) {
            chatInput.value = `Como me proteger no tema ${topicTitle}? Quais as principais orientações da CyberTech?`;
            chatInput.focus();
          }
        });
      }

      listen(modal, 'click', (e: Event) => {
        if (e.target === modal) closeModal();
      });

      listen(document, 'keydown', (e: Event) => {
        if ((e as KeyboardEvent).key === 'Escape' && modal.classList.contains('open')) {
          closeModal();
        }
      });
    };

    // -------------------------------------------------------------
    // 17.5. CHATBOT EDUCATIVO CYBERTECH
    // -------------------------------------------------------------
    const initChatbot = () => {
      const chatForm = $('#chatForm') as HTMLFormElement | null;
      const chatInput = $('#chatInputText') as HTMLInputElement | null;
      const chatSendBtn = $('#chatSendBtn') as HTMLButtonElement | null;
      const feed = $('#chatMessagesFeed');
      const typingIndicator = $('#chatTypingIndicator');

      let isSending = false;

      const formatBotText = (text: string): string => {
        let safe = text
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
        safe = safe.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        const paras = safe.split(/\n\n+/);
        return paras.map(p => {
          const lines = p.split(/\n/).map(l => {
            if (l.trim().startsWith('•') || l.trim().startsWith('-')) {
              return `<span style="display: block; padding-left: 14px; text-indent: -14px;">${l.trim()}</span>`;
            }
            return l;
          }).join('<br>');
          return `<p style="margin: 0 0 8px;">${lines}</p>`;
        }).join('');
      };

      const getTimeStr = (): string => {
        const d = new Date();
        return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
      };

      const appendMessage = (sender: 'user' | 'bot', contentHtml: string) => {
        if (!feed) return;
        const row = document.createElement('div');
        row.className = `chat-bubble-row ${sender === 'user' ? 'user-row' : 'bot-row'}`;

        const avatar = document.createElement('div');
        avatar.className = `chat-avatar ${sender === 'user' ? 'user-avatar' : 'bot-avatar'}`;
        avatar.textContent = sender === 'user' ? '👤' : '🤖';

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${sender === 'user' ? 'user-bubble' : 'bot-bubble'}`;
        bubble.innerHTML = `${contentHtml}<span class="chat-time">${getTimeStr()}</span>`;

        row.appendChild(avatar);
        row.appendChild(bubble);
        feed.appendChild(row);

        feed.scrollTop = feed.scrollHeight;
      };

      const sendMessage = (text: string) => {
        const msg = text.trim();
        if (!msg || isSending) return;

        isSending = true;
        if (chatSendBtn) chatSendBtn.disabled = true;

        const userHtml = `<p style="margin: 0;">${msg.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`;
        appendMessage('user', userHtml);
        if (chatInput) chatInput.value = '';

        if (typingIndicator) {
          typingIndicator.style.display = 'flex';
          if (feed) feed.scrollTop = feed.scrollHeight;
        }

        audio.playTone(950, 0.04, 'sine', 0.02);

        this.chat.enviarMensagem(msg).subscribe({
          next: (res) => {
            isSending = false;
            if (chatSendBtn) chatSendBtn.disabled = false;
            if (typingIndicator) typingIndicator.style.display = 'none';

            const replyHtml = formatBotText(res.reply || 'Recebi sua pergunta. Como mais posso te orientar sobre segurança digital?');
            appendMessage('bot', replyHtml);
            audio.playContainmentShield();
            Scroll.refresh();
          },
          error: () => {
            isSending = false;
            if (chatSendBtn) chatSendBtn.disabled = false;
            if (typingIndicator) typingIndicator.style.display = 'none';

            const errorHtml = `
              <p style="margin: 0 0 6px; color: var(--accent-red, #FF153D);"><strong>⚠️ O serviço de IA está temporariamente indisponível.</strong></p>
              <p style="margin: 0; font-size: 0.84rem; opacity: 0.9;">Verifique se o backend Spring Boot (porta 8080) e o Chatbot FastAPI (porta 8000) estão rodando com a chave Groq configurada. Você também pode conferir as orientações nos 11 temas didáticos da página!</p>
            `;
            appendMessage('bot', errorHtml);
            audio.playAlertTone();
            Scroll.refresh();
          }
        });
      };

      if (chatForm) {
        listen(chatForm, 'submit', (e: Event) => {
          e.preventDefault();
          if (chatInput) sendMessage(chatInput.value);
        });
      }

      $$('.suggestion-chip').forEach((chip) => {
        listen(chip, 'click', () => {
          const prompt = chip.getAttribute('data-prompt') || chip.textContent?.trim() || '';
          if (prompt) sendMessage(prompt);
        });
      });
    };

    // -------------------------------------------------------------
    // 18. QUIZ INTERATIVO DE CULTURA DIGITAL
    // -------------------------------------------------------------
    const initInteractiveQuiz = () => {
      const stepIndicator = $('#quizStepIndicator');
      const scoreBadge = $('#quizScoreText');
      const scenarioText = $('#quizScenarioText');
      const questionTitle = $('#quizQuestionTitle');
      const optionsContainer = $('#quizOptionsContainer');
      const feedbackBox = $('#quizFeedbackBox');
      const feedbackTitle = $('#quizFeedbackTitle');
      const feedbackExplanation = $('#quizFeedbackExplanation');
      const nextBtn = $('#quizNextBtn');
      const cardBody = $('#quizCardBody');
      const completedBox = $('#quizCompletedBox');
      const finalScoreText = $('#quizFinalScoreText');
      const finalFeedbackText = $('#quizFinalFeedbackText');
      const restartBtn = $('#quizRestartBtn');

      if (!questionTitle || !optionsContainer || !nextBtn) return;

      let currentQ = 0;
      let score = 0;
      let answered = false;

      const renderQuestion = (idx: number) => {
        answered = false;
        const q = QUIZ_QUESTIONS[idx];
        if (!q) return;

        if (stepIndicator) stepIndicator.textContent = `PERGUNTA ${idx + 1} DE ${QUIZ_QUESTIONS.length}`;
        if (scoreBadge) scoreBadge.textContent = `PONTUAÇÃO: ${score} / ${QUIZ_QUESTIONS.length}`;
        if (scenarioText) scenarioText.textContent = q.scenario;
        if (questionTitle) questionTitle.textContent = q.question;

        if (feedbackBox) {
          feedbackBox.className = 'quiz-feedback-box';
          feedbackBox.style.display = 'none';
        }
        nextBtn.style.display = 'none';

        optionsContainer.innerHTML = '';
        q.options.forEach((opt) => {
          const btn = document.createElement('button');
          btn.className = 'quiz-opt-btn';
          btn.type = 'button';
          btn.innerHTML = `<span class="quiz-opt-letter">${opt.letter}</span> <span>${opt.text}</span>`;

          listen(btn, 'click', () => {
            if (answered) return;
            answered = true;

            const allBtns = Array.from(optionsContainer.querySelectorAll<HTMLButtonElement>('.quiz-opt-btn'));
            allBtns.forEach((b) => (b.disabled = true));

            if (opt.isSafe) {
              btn.classList.add('correct');
              score++;
              if (scoreBadge) scoreBadge.textContent = `PONTUAÇÃO: ${score} / ${QUIZ_QUESTIONS.length}`;
              audio.playContainmentShield();

              if (feedbackBox && feedbackTitle && feedbackExplanation) {
                feedbackBox.className = 'quiz-feedback-box is-safe show-feedback';
                feedbackBox.style.display = 'block';
                feedbackTitle.textContent = '✓ Conduta Segura e Consciente!';
                feedbackExplanation.textContent = opt.explanation;
              }
            } else {
              btn.classList.add('incorrect');
              // Destacar a alternativa correta
              const safeIdx = q.options.findIndex((o) => o.isSafe);
              if (safeIdx >= 0 && allBtns[safeIdx]) {
                allBtns[safeIdx].classList.add('correct');
              }
              audio.playAlertTone();

              if (feedbackBox && feedbackTitle && feedbackExplanation) {
                feedbackBox.className = 'quiz-feedback-box is-risky show-feedback';
                feedbackBox.style.display = 'block';
                feedbackTitle.textContent = '⚠️ Atenção: Situação de Risco!';
                feedbackExplanation.textContent = opt.explanation;
              }
            }

            nextBtn.textContent = idx < QUIZ_QUESTIONS.length - 1 ? 'Próxima Pergunta ➔' : 'Ver Resultado Final 🏆';
            nextBtn.style.display = 'inline-flex';
          });

          optionsContainer.appendChild(btn);
        });
      };

      listen(nextBtn, 'click', () => {
        if (currentQ < QUIZ_QUESTIONS.length - 1) {
          currentQ++;
          renderQuestion(currentQ);
        } else {
          // Exibir tela de conclusão
          if (cardBody) cardBody.style.display = 'none';
          if (completedBox) {
            completedBox.style.display = 'block';
            if (finalScoreText) finalScoreText.textContent = `${score} de ${QUIZ_QUESTIONS.length} Acertos!`;
            if (finalFeedbackText) {
              if (score === QUIZ_QUESTIONS.length) {
                finalFeedbackText.textContent = 'Parabéns! Você demonstrou reflexos exemplares de defesa digital, empatia e cidadania. Está pronto para navegar com segurança e apoiar sua comunidade escolar!';
              } else if (score >= 3) {
                finalFeedbackText.textContent = 'Muito bom! Você já possui boa consciência sobre riscos e sabe tomar atitudes seguras na maioria dos casos. Revise os guias didáticos para ficar ainda mais protegido!';
              } else {
                finalFeedbackText.textContent = 'Bom esforço! Lembre-se de que no mundo digital a atenção e a cautela são suas melhores amigas. Explore os 11 temas no guia acima e tente novamente!';
              }
            }
          }
          audio.playContainmentShield();
        }
      });

      if (restartBtn) {
        listen(restartBtn, 'click', () => {
          currentQ = 0;
          score = 0;
          if (cardBody) cardBody.style.display = 'block';
          if (completedBox) completedBox.style.display = 'none';
          renderQuestion(0);
          audio.playTone(700, 0.06, 'sine', 0.03);
        });
      }

      renderQuestion(0);
    };

    // -------------------------------------------------------------
    // EXECUÇÃO DA ORQUESTRAÇÃO
    // -------------------------------------------------------------
    initCyberCursor();
    initHudControls();
    prepareReveals();
    initBackgroundCanvas();
    initHero();
    initTopicExplorer();
    initChatbot();
    initInteractiveQuiz();
    initFaqAccordion();
    initCardFX();
    initButtons();
    Scroll.init();
    initRevealObserver();

    listen(window, 'load', () => Scroll.refresh());

    // Teardown para evitar vazamentos de memória no Angular
    this.destroyRef.onDestroy(() => {
      Loop.stopAll();
      intervals.forEach(clearInterval);
      eventListeners.forEach(({ target, type, listener, opts }) => {
        target.removeEventListener(type, listener, opts);
      });
    });
  }
}
