import { Component } from '@angular/core';
import { TopicoDetailComponent } from '../topico-detail/topico-detail';

@Component({
  selector: 'app-uso-inadequado-ia-page',
  standalone: true,
  imports: [TopicoDetailComponent],
  template: '<app-topico-detail slug="uso-inadequado-ia"></app-topico-detail>'
})
export class UsoInadequadoIaPage {}