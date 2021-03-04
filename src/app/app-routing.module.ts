import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewPortalComponent } from './view-portal/view-portal.component';
import { AddPortalComponent } from './add-portal/add-portal.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthGaurdService } from './service/auth-gaurd.service';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NewFieldDialogBoxComponent } from './newFieldDialog-box/newFieldDialog-box.component';
import {SignUpComponent} from './signUp/sign-up.component';
import {JsonViewComponent} from './json-view/json-view.component';

const routes: Routes = [
  { path: '', component: ViewPortalComponent,canActivate:[AuthGaurdService] },
  { path: 'viewPortal', component: ViewPortalComponent,canActivate:[AuthGaurdService] },
  { path: 'addportal', component: AddPortalComponent,canActivate:[AuthGaurdService]},
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent,canActivate:[AuthGaurdService] },
  { path: 'dialogBox', component: DialogBoxComponent,canActivate:[AuthGaurdService] },
  { path: 'newFieldDialogBox', component: NewFieldDialogBoxComponent,canActivate:[AuthGaurdService] },
  { path: 'signup',component:SignUpComponent},
  { path: 'jsonView',component:JsonViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
