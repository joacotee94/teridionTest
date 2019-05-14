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
  MatChipsModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSnackBarModule } from '@angular/material';



import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LocationStrategy} from '@angular/common';
import {Globals} from './globals';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RegisterDealComponent } from './components/register-deal/register-deal.component';
import { ListOppsComponent } from './components/list-opps/list-opps.component';
@NgModule({
  declarations: [
    AppComponent,
    StaticPathPipe,
    FirstPageComponent,
    OppComponent,
    ToolbarComponent,
    PersonalDetailsFormComponent,
    RegisterDealComponent,
    ListOppsComponent
  ],
  imports: [
    BrowserModule,
    MdePopoverModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: 'company-info', component:PersonalDetailsFormComponent},
      { path: 'opps', component: OppComponent},
      { path: 'home', component: FirstPageComponent},
      { path: 'register-deal', component: RegisterDealComponent}

    ]),MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,MatNativeDateModule,        
    MatDatepickerModule,MatSnackBarModule,
    MatOptionModule,MatTabsModule,MatChipsModule,
    MatButtonToggleModule,MatSortModule,MatTableModule,
    MatMenuModule,MatToolbarModule,MatSidenavModule,FormsModule,ReactiveFormsModule,
   NgbModule
    
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
