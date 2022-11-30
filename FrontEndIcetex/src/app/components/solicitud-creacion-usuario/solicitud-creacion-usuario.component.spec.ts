import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BasicoService } from 'src/app/services/helpers/basico.service';
import { SolicitudUsuarioService } from 'src/app/services/usuario/solicitud-usuario.service';
import { BasicoServiceMock } from 'src/app/shared/mocks/basico.service.mock';
import { MatDialogMock } from 'src/app/shared/mocks/mat-dialog.mock';
import { RouterMockService } from 'src/app/shared/mocks/router.service.mock';
import { SolicitudUsuarioServiceMock } from 'src/app/shared/mocks/solicitud-usuario.service.mock';

import { SolicitudCreacionUsuarioComponent } from './solicitud-creacion-usuario.component';

describe('SolicitudCreacionUsuarioComponent', () => {
  let component: SolicitudCreacionUsuarioComponent;
  let fixture: ComponentFixture<SolicitudCreacionUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitudCreacionUsuarioComponent ],
      providers: [
        { provide: BasicoService, useClass: BasicoServiceMock },
        { provide: SolicitudUsuarioService, useClass: SolicitudUsuarioServiceMock },
        { provide: MatDialog, useClass: MatDialogMock },
        { provide: Router, useClass: RouterMockService },
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudCreacionUsuarioComponent);
    component = fixture.componentInstance;
    spyOn(component as any, 'ObtenerTiposDocumento');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
