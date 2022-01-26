import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LakeListComponent } from './lake-list/lake-list.component';
import { LakeAddComponent } from './lake-add/lake-add.component';
import { LakeDetailsComponent } from './lake-details/lake-details.component';
import { AnalysisListComponent } from './analysis-list/analysis-list.component';
import { AnalysisAddComponent } from './analysis-add/analysis-add.component';
import { AnalysisDetailsComponent } from './analysis-details/analysis-details.component';
import { OverviewComponent } from './overview/overview.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OverviewElementsComponent } from './overview-elements/overview-elements.component';
import { BackgroundComponent } from './background/background.component';
import { HomeComponent } from './home/home.component';
import { BgPopupComponent } from './bg-popup/bg-popup.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { LogoutPopupComponent } from './logout-popup/logout-popup.component';
import { DropdownPopupComponent } from './dropdown-popup/dropdown-popup.component';
import { MatMenuModule} from '@angular/material/menu';
import { AuthService } from './services/auth.service';
import { LoginPopupComponent } from './login-popup/login-popup.component';
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { DataAddComponent } from './data-add/data-add.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientXsrfModule} from "@angular/common/http";
import {HttpXsrfInterceptorService} from "./interceptors/http-xsrf-interceptor/http-xsrf-interceptor.service";
import { LicenceComponent } from './licence/licence.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxEchartsModule } from 'ngx-echarts';
import {MatExpansionModule} from "@angular/material/expansion";
import { RegisterPopupComponent } from './register-popup/register-popup.component';
import { AccountComponent } from './account/account.component';
import { PersonalDataComponent } from './personal-data/personal-data.component';
import { UserDocComponent } from './user-doc/user-doc.component';
import {CdkAccordionModule} from "@angular/cdk/accordion";

@NgModule({
  declarations: [
    AppComponent,
    LakeListComponent,
    LakeAddComponent,
    LakeDetailsComponent,
    AnalysisListComponent,
    AnalysisAddComponent,
    AnalysisDetailsComponent,
    LakeListComponent,
    OverviewComponent,
    FourOhFourComponent,
    TopbarComponent,
    SidebarComponent,
    OverviewElementsComponent,
    BackgroundComponent,
    HomeComponent,
    BgPopupComponent,
    LogoutPopupComponent,
    DropdownPopupComponent,
    LoginPopupComponent,
    DataAddComponent,
    LicenceComponent,
    RegisterPopupComponent,
    AccountComponent,
    PersonalDataComponent,
    UserDocComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NoopAnimationsModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken'
    }),
    MatAutocompleteModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), // or import('./path-to-my-custom-echarts')
    }),
    MatExpansionModule,
    CdkAccordionModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptorService, multi: true },
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
