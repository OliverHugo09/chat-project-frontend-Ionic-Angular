import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthenGuard } from './service/admin/authen.guard';

const routes: Routes = [
  {
    path: 'chat-online',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule), canActivateChild:[AuthenGuard]
  },
  {
    path: '',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'chat-box',
    loadChildren: () => import('./chat-box/chat-box.module').then( m => m.ChatBoxPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: '**', redirectTo: '', pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
