import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LakeListComponent } from './lake-list/lake-list.component'
import { LakeAddComponent } from './lake-add/lake-add.component'
import { LakeDetailsComponent } from './lake-details/lake-details.component'

import { AnalysisListComponent } from './analysis-list/analysis-list.component'
import { AnalysisAddComponent } from './analysis-add/analysis-add.component'
import { AnalysisDetailsComponent } from './analysis-details/analysis-details.component'

import { OverviewComponent } from './overview/overview.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { TopbarComponent } from './topbar/topbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { OverviewElementsComponent } from './overview-elements/overview-elements.component';
import { HomeComponent } from './home/home.component';
import { BgPopupComponent } from './bg-popup/bg-popup.component';
import {AccountComponent} from "./account/account.component";

import { LicenceComponent } from './licence/licence.component';
import {PersonalDataComponent} from "./personal-data/personal-data.component";
import {UserDocComponent} from "./user-doc/user-doc.component";

const routes: Routes = [

  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'account', component: AccountComponent},
  { path: 'lakes-list', component: LakeListComponent },
  { path: 'lake-add', component: LakeAddComponent },
  { path: 'lake-details/:id', component: LakeDetailsComponent },
  { path: 'protection-of-personal-data', component: PersonalDataComponent },
  { path: 'analysis-list', component: AnalysisListComponent },
  { path: 'analysis-add', component: AnalysisAddComponent },
  { path: 'analysis-details/:id', component: AnalysisDetailsComponent },

  { path: 'licence', component: LicenceComponent },
  { path: 'user-doc', component: UserDocComponent},

  { path: 'not-found', component: FourOhFourComponent },

  { path: '**', redirectTo: 'not-found' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
