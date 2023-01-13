import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'chat-list',
        loadChildren: () => import('../chat-list/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'chat-box',
        loadChildren: () => import('../chat-box/chat-box.module').then(m => m.ChatBoxPageModule)
      },
      {
        path: 'chat-add',
        loadChildren: () => import('../chat-add/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'config',
        loadChildren: () => import('../config/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/chat-list',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/chat-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
