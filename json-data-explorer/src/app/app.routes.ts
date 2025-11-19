import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/upload',
    pathMatch: 'full'
  },
  {
    path: 'upload',
    loadComponent: () => import('./components/json-uploader/json-uploader.component')
      .then(m => m.JsonUploaderComponent)
  },
  {
    path: 'table',
    loadComponent: () => import('./components/json-table/json-table.component')
      .then(m => m.JsonTableComponent)
  },
  {
    path: 'tree',
    loadComponent: () => import('./components/json-tree/json-tree.component')
      .then(m => m.JsonTreeComponent)
  },
  {
    path: 'beautify',
    loadComponent: () => import('./components/beautifier/beautifier.component')
      .then(m => m.BeautifierComponent)
  },
  {
    path: 'raw',
    loadComponent: () => import('./components/syntax-highlighter/syntax-highlighter.component')
      .then(m => m.SyntaxHighlighterComponent)
  },
  {
    path: '**',
    redirectTo: '/upload'
  }
];
