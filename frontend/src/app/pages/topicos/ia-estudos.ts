import { Component } from '@angular/core';
import { TopicoDetailComponent } from '../topico-detail/topico-detail';

@Component({
  selector: 'app-ia-estudos-page',
  standalone: true,
  imports: [TopicoDetailComponent],
  template: '<app-topico-detail slug="ia-estudos"></app-topico-detail>'
})
export class IaEstudosPage {}