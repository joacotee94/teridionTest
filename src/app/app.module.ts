import { SalesforceHashLocationStrategy } from './util/sf-path-location-strategy';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { StaticPathPipe } from './pipes/static-path.pipe';
import { SalesforceApiService } from './sf-api-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MdePopoverModule } from '@material-extended/mde'
import { AppComponent } from './app.component';
import { OppComponent } from './components/opportunities/opp-component.component';
import { PersonalDetailsFormComponent } from './components/personal-details-form/personal-details-form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule,MatCardModule,MatIconModule,MatButtonToggleModule} from '@angular/material';
import {MatSortModule,MatTableModule} from '@angular/material';
import { RemoteActionsService } from './services/remote-actions';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatOptionModule,
  MatFormFieldModule,MatToolbarModule
  ,MatMenuModule,
  MatSelectModule
  ,MatInputModule,
  MatSidenavModule,
  MatTabsModule,
  MatPaginatorModule,
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatGridListModule,
  MatSnackBarModule } from '@angular/material';
  

  import * as Ocean from 'fusioncharts/themes/fusioncharts.theme.ocean';
  import * as Fint from 'fusioncharts/themes/fusioncharts.theme.fint';
  import * as Candy from 'fusioncharts/themes/fusioncharts.theme.candy';
  import * as Gammel from 'fusioncharts/themes/fusioncharts.theme.gammel';
  import * as Zune from 'fusioncharts/themes/fusioncharts.theme.zune';
  import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
  import * as Carbon from 'fusioncharts/themes/fusioncharts.theme.carbon';


import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy} from '@angular/common';
import {Globals} from './globals';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterDealComponent } from './components/register-deal/register-deal.component';
import { ListOppsComponent } from './components/list-opps/list-opps.component';

import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library
import * as FusionCharts from 'fusioncharts';

// Load FusionCharts Individual Charts
import * as Charts from 'fusioncharts/fusioncharts.charts';
import { SalesGraphComponent } from './components/sales-graph/sales-graph.component';
import { HomeComponentComponent } from './components/home-component/home-component.component';
import { PartnerDocsComponentComponent } from './components/partner-docs-component/partner-docs-component.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { CompanySectionComponent } from './components/company-section/company-section.component';
FusionChartsModule.fcRoot(
  FusionCharts,
  Charts,
  Ocean,
  Fint,
  Candy,
  Gammel,
  Zune,
  Carbon,
  FusionTheme
)



@NgModule({
  declarations: [
    AppComponent,
    StaticPathPipe,
    FirstPageComponent,
    OppComponent,
    ToolbarComponent,
    PersonalDetailsFormComponent,
    RegisterDealComponent,
    ListOppsComponent,
    SalesGraphComponent,
    HomeComponentComponent,
    PartnerDocsComponentComponent,
    CompanyInfoComponent,
    CompanySectionComponent
  ],
  imports: [
    BrowserModule,
    MdePopoverModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'company-info', component:CompanySectionComponent},
      { path: 'opps', component: OppComponent},
      { path: 'home', component: HomeComponentComponent},
      { path: 'register-deal', component: RegisterDealComponent},
      { path: 'partner-docs', component: PartnerDocsComponentComponent},
      { path: '*', component: HomeComponentComponent}

    ]),MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatGridListModule,
    MatInputModule,MatPaginatorModule,
    MatSelectModule,MatNativeDateModule,
    MatDatepickerModule,MatSnackBarModule,
    MatOptionModule,MatTabsModule,MatChipsModule,
    MatButtonToggleModule,MatSortModule,MatTableModule,
    MatMenuModule,MatToolbarModule,MatSidenavModule,FormsModule,ReactiveFormsModule,
   NgbModule,FusionChartsModule
    
  ],
  providers: [
    SalesforceApiService,
    {
      provide: LocationStrategy,
      useClass: SalesforceHashLocationStrategy
    },
    RemoteActionsService,Globals
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
