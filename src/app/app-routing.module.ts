import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './login/auth.guard';
import { TeamPage } from './team/team.page';


const routes: Routes = [

  {
    path: '',
    //component: TeamPage,
    redirectTo: 'team',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  /* {
    path: 'dash-board',
    loadChildren: () => import('./dash-board/dash-board.module').then(m => m.DashBoardPageModule)
  }, */
  {
    path: 'team',
    loadChildren: () => import('./team/team.module').then(m => m.TeamPageModule),
    canLoad: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
