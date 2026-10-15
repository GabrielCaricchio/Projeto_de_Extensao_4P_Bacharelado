import { Component } from '@angular/core';
import { TopicoDetailComponent } from '../topico-detail/topico-detail';

@Component({
  selector: 'app-redes-sociais-page',
  standalone: true,
  imports: [TopicoDetailComponent],
  template: '<app-topico-detail slug="redes-sociais"></app-topico-detail>'
})
export class RedesSociaisPage {}