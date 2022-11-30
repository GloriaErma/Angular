import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../shared/material-module';
import { PortalTransaccionalComponent } from './portal-transaccional.component';
import { JerarquiaService } from '../services/jerarquia/jerarquia.service';
import { ProductosService } from '../services/productos/productos.service';
import { StorageService } from '../shared/storage.service';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderIcetexComponent } from './header-icetex/header-icetex.component';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    PortalTransaccionalComponent,
    DashboardComponent,
    HeaderIcetexComponent,
    //SidebarComponent,
  ],
  imports: [
    RouterModule,
    CommonModule,
    MaterialModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circleSwish,
      backdropBorderRadius: '4px',
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff',
    }),
  ],
  exports: [
    RouterModule,
    NgxLoadingModule,
  ],
  providers: [
  JerarquiaService,
  ProductosService,
  StorageService]
})
export class PortalTransaccionalModule { }
