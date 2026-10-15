import { Component } from '@angular/core';
import { TopicoDetailComponent } from '../topico-detail/topico-detail';

@Component({
  selector: 'app-golpes-digitais-page',
  standalone: true,
  imports: [TopicoDetailComponent],
  template: '<app-topico-detail slug="golpes-digitais"></app-topico-detail>'
})
export class GolpesDigitaisPage {}