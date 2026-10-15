import { Component } from '@angular/core';
import { TopicoDetailComponent } from '../topico-detail/topico-detail';

@Component({
  selector: 'app-cyberbullying-page',
  standalone: true,
  imports: [TopicoDetailComponent],
  template: '<app-topico-detail slug="cyberbullying"></app-topico-detail>'
})
export class CyberbullyingPage {}