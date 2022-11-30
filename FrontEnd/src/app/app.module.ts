import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderInicioComponent } from './components/header-inicio/header-inicio.component';
import { HeaderLogoComponent } from './components/header-logo/header-logo.component';
import { FooterGeneralComponent } from './components/footer-general/footer-general.component';
import { LoginComponent } from './components/login/login.component';
import { RecaptchaFormsModule, RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings } from 'ng-recaptcha';
import { SolicitudCreacionUsuarioComponent } from './components/solicitud-creacion-usuario/solicitud-creacion-usuario.component';
import { PoliticasCondicionesComponent } from './components/politicas-condiciones/politicas-condiciones.component';
import { RestablecePassComponent } from './components/restablece-pass/restablece-pass.component';
import { IpService } from './services/helpers/ip.service';
import { LoginService } from './services/Login/login.service';
import { TokenService } from './services/Login/token.service';
import { SolicitudUsuarioService } from './services/usuario/solicitud-usuario.service';
import { environment } from 'src/environments/environment';
import { MaterialModule } from './shared/material-module';
import { CustomModalComponent } from './shared/custom-modal/custom-modal.component';
import { ReenviarSolicitudComponent } from './shared/custom-modal/reenviar-solicitud/reenviar-solicitud.component';
import { ActivarCuentaUsuarioComponent } from './components/activar-cuenta-usuario/activar-cuenta-usuario.component';
import { ConfirmarModalComponent } from './shared/custom-modal/confirmar-modal/confirmar-modal.component';
import { PortalTransaccionalModule } from './portal-transaccional/portal-transaccional.module';
import { AuthorizatedGuard } from './shared/guards/authorizated.guard';
import { AppInterceptor } from './shared/app-interceptor';

@NgModule({
  entryComponents: [
    CustomModalComponent,
    ReenviarSolicitudComponent,
    ConfirmarModalComponent
  ],
  declarations: [
    AppComponent,
    HeaderInicioComponent,
    HeaderLogoComponent,
    FooterGeneralComponent,
    LoginComponent,
    SolicitudCreacionUsuarioComponent,
    PoliticasCondicionesComponent,
    RestablecePassComponent,
    ActivarCuentaUsuarioComponent,
    CustomModalComponent,
    ReenviarSolicitudComponent,
    ConfirmarModalComponent,
  ],
  imports: [
    PortalTransaccionalModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    MaterialModule,
  ],
  providers: [{
    provide: RECAPTCHA_SETTINGS,
    useValue: {
      siteKey: environment.recaptchaKey,
    } as RecaptchaSettings
  },
  AuthorizatedGuard,
  { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
  IpService,
  LoginService,
  TokenService,
  SolicitudUsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
