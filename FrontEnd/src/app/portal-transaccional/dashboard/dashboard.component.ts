import { AfterContentChecked, AfterContentInit, Component, OnInit } from '@angular/core';
import { PermisosConRolesResponse } from 'src/app/classes/PermisoConRoles';
import { ProductosResponse } from 'src/app/classes/ProductosResponse';
import { JerarquiaService } from 'src/app/services/jerarquia/jerarquia.service';
import { ProductosService } from 'src/app/services/productos/productos.service';
import { StorageService } from 'src/app/shared/storage.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements AfterContentInit {
  public visibleProductos = false;
  public loading = false;
  public productos: ProductosResponse[];
  public permisos: PermisosConRolesResponse[];
  constructor(
    private jerarquiaService: JerarquiaService,
    private productosService: ProductosService,
    private storageService: StorageService) { }

  ngAfterContentInit(): void {
    this.loading = true;
    this.jerarquiaService.ObtenerJerarquia({
      accessToken: this.storageService.getCurrentSession().TokenAcceso,
      idAplicacion: 1
    }).subscribe(
      (data: PermisosConRolesResponse[]) => {
        this.permisos = data;
        if (this.permisos.length > 0) {
          if (this.permisos.filter(permiso => permiso.idModulo === 2).length >= 1) {
            this.visibleProductos = true;
            this.productosService.ObtenerProductos().subscribe(
              (data: ProductosResponse[]) => {
                this.loading = false;
                this.productos = data;
              });
          } else {
            this.loading = false;
          }
        } else {
          this.loading = false;
        }
      });
  }

}
