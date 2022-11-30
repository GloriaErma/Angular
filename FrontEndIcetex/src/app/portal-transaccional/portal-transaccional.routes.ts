import { Routes } from '@angular/router';
import { AuthorizatedGuard } from '../shared/guards/authorizated.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PortalTransaccionalComponent } from './portal-transaccional.component';

export const portalRoutes: Routes = [
    {
        path: '',
        component: PortalTransaccionalComponent,
        canActivate: [AuthorizatedGuard],
        children: [
          {
            path: 'dashboard',
            component: DashboardComponent,
          },
          { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
        ],
      },
    ];