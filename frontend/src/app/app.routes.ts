import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { TopicoDetailComponent } from './pages/topico-detail/topico-detail';
import { ChatbotComponent } from './pages/chatbot/chatbot';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Cultura Digital - Início'
  },
  {
    path: 'topicos/:slug',
    component: TopicoDetailComponent,
    title: 'Cultura Digital - Tópico Educativo'
  },
  // Redirecionamentos diretos para as rotas nomeadas no PDF
  {
    path: 'golpes-digitais',
    redirectTo: 'topicos/golpes-digitais',
    pathMatch: 'full'
  },
  {
    path: 'cyberbullying',
    redirectTo: 'topicos/cyberbullying',
    pathMatch: 'full'
  },
  {
    path: 'redes-sociais',
    redirectTo: 'topicos/redes-sociais',
    pathMatch: 'full'
  },
  {
    path: 'malwares',
    redirectTo: 'topicos/malwares',
    pathMatch: 'full'
  },
  {
    path: 'uso-inadequado-ia',
    redirectTo: 'topicos/uso-inadequado-ia',
    pathMatch: 'full'
  },
  {
    path: 'ia-estudos',
    redirectTo: 'topicos/ia-estudos',
    pathMatch: 'full'
  },
  {
    path: 'chatbot',
    component: ChatbotComponent,
    title: 'Cultura Digital - CyberBot IA'
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Cultura Digital - Página não encontrada'
  }
];
