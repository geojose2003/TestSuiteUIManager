import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewPortalComponent } from './view-portal/view-portal.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { NewFieldDialogBoxComponent } from './newFieldDialog-box/newFieldDialog-box.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddPortalComponent } from './add-portal/add-portal.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import {JsonViewComponent} from './json-view/json-view.component'
import { SignUpComponent } from './signUp/sign-up.component'; 
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BasicAuthHtppInterceptorService } from './service/basic-auth-interceptor.service';
import {FlxUiDatatableModule,FlxUiDataTable} from 'flx-ui-datatable';
import { TagInputModule } from 'ngx-chips';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {MatInputModule, MatTableModule, MatToolbarModule ,MatSortModule,MatPaginatorModule, MatFormFieldModule,MatButtonModule,MAT_DIALOG_DATA} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogBoxService } from './service/dialog-box.service';
import { NgxSpinnerModule } from "ngx-spinner";
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AceEditorModule } from 'ng2-ace-editor';
;
@NgModule({
  declarations: [
    AppComponent,
    ViewPortalComponent,
    AdminPageComponent,
    AddPortalComponent,
    HeaderComponent,
    FooterComponent,
    DialogBoxComponent,
    NewFieldDialogBoxComponent,
    JsonViewComponent,
    LoginComponent,
    SignUpComponent,
    LogoutComponent  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    TagInputModule,
    ReactiveFormsModule,
    FlxUiDatatableModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    NgxSpinnerModule,
    AceEditorModule,
    NgxJsonViewerModule,
    MatToolbarModule, MatInputModule,
  ], exports: [MatToolbarModule, MatInputModule, MatTableModule],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: BasicAuthHtppInterceptorService, multi: true },{provide: MAT_DIALOG_DATA,useValue: {}},FlxUiDataTable,DialogBoxService],
  bootstrap: [AppComponent]
})
export class AppModule { }
