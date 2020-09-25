import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'all-notes',
    loadChildren: () => import('./pages/all-notes/all-notes.module').then( m => m.AllNotesPageModule)
  },
  {
    path: 'notebooks',
    loadChildren: () => import('./pages/notebooks/notebooks.module').then( m => m.NotebooksPageModule)
  },
  {
    path: 'shared',
    loadChildren: () => import('./pages/shared/shared.module').then( m => m.SharedPageModule)
  },
  {
    path: 'work-chat',
    loadChildren: () => import('./pages/work-chat/work-chat.module').then( m => m.WorkChatPageModule)
  },
  {
    path: 'trash',
    loadChildren: () => import('./pages/trash/trash.module').then( m => m.TrashPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'blank-note',
    loadChildren: () => import('./pages/blank-note/blank-note.module').then( m => m.BlankNotePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
