import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render brand logo', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-name')?.textContent).toContain('CyberTech');
  });

  it('should render only topics and materials from assuntos_extensao.txt and ideias.txt', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    // Seções didáticas e oficiais presentes
    expect(compiled.querySelector('#hero')).toBeTruthy();
    expect(compiled.querySelector('#ameacas')).toBeTruthy();
    expect(compiled.querySelector('#quiz')).toBeTruthy();
    expect(compiled.querySelector('#faq')).toBeTruthy();
    expect(compiled.querySelector('#canaisAjuda')).toBeTruthy();
    expect(compiled.querySelector('#topicModal')).toBeTruthy();

    // Elementos corporativos antigos removidos
    expect(compiled.querySelector('#holograma')).toBeNull();
    expect(compiled.querySelector('#fluxo')).toBeNull();
    expect(compiled.querySelector('#estatisticas')).toBeNull();
    expect(compiled.querySelector('#tipografia')).toBeNull();
    expect(compiled.querySelector('#importancia')).toBeNull();
    expect(compiled.querySelector('#conclusao')).toBeNull();
    expect(compiled.querySelector('#conteudos')).toBeNull();
    expect(compiled.querySelector('#contatoModal')).toBeNull();
    expect(compiled.querySelector('#threatMap')).toBeNull();
    expect(compiled.querySelector('#operacoes')).toBeNull();
    expect(compiled.querySelector('#investigacaoSim')).toBeNull();
  });
});
