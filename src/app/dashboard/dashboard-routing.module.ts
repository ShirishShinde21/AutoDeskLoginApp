import { NgModule } from '@angular/core';
import { Routes, RouterModule  } from '@angular/router';
import { AuthGuardService as AuthGuard } from '../Services/auth-guard.service'
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [{ path: '', component: DashboardComponent, canActivate:[AuthGuard] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
  