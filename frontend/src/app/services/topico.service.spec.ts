import { TestBed } from '@angular/core/testing';
import { TopicoService } from './topico.service';

describe('TopicoService', () => {
  let service: TopicoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TopicoService]
    });

    service = TestBed.inject(TopicoService);
  });

  it('lists all six topics with ten quiz questions each', () => {
    service.listarTodos().subscribe(topicos => {
      expect(topicos).toHaveLength(6);
      expect(topicos.every(topico => topico.quiz.length === 10)).toBe(true);
    });
  });

  it('finds a topic by slug', () => {
    service.buscarPorSlug('golpes-digitais').subscribe(topico => {
      expect(topico?.titulo).toBe('Golpes Digitais');
      expect(topico?.quiz).toHaveLength(10);
    });
  });
});