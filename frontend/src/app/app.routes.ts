import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { ChatbotComponent } from './pages/chatbot/chatbot';
import { NotFoundComponent } from './pages/not-found/not-found';
import { GolpesDigitaisPage } from './pages/topicos/golpes-digitais';
import { CyberbullyingPage } from './pages/topicos/cyberbullying';
import { RedesSociaisPage } from './pages/topicos/redes-sociais';
import { MalwaresPage } from './pages/topicos/malwares';
import { UsoInadequadoIaPage } from './pages/topicos/uso-inadequado-ia';
import { IaEstudosPage } from './pages/topicos/ia-estudos';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Cultura Digital - Início' },
  { path: 'topicos/golpes-digitais', component: GolpesDigitaisPage, title: 'Cultura Digital - Golpes Digitais' },
  { path: 'topicos/cyberbullying', component: CyberbullyingPage, title: 'Cultura Digital - Cyberbullying' },
  { path: 'topicos/redes-sociais', component: RedesSociaisPage, title: 'Cultura Digital - Redes Sociais' },
  { path: 'topicos/malwares', component: MalwaresPage, title: 'Cultura Digital - Malwares' },
  { path: 'topicos/uso-inadequado-ia', component: UsoInadequadoIaPage, title: 'Cultura Digital - Uso Inadequado de IA' },
  { path: 'topicos/ia-estudos', component: IaEstudosPage, title: 'Cultura Digital - IA para Estudos' },
  { path: 'chatbot', component: ChatbotComponent, title: 'Cultura Digital - CyberBot IA' },
  { path: '**', component: NotFoundComponent, title: 'Cultura Digital - Página não encontrada' }
];