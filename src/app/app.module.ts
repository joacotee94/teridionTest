import { SalesforceHashLocationStrategy } from './util/sf-path-location-strategy';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { StaticPathPipe } from './pipes/static-path.pipe';
import { SalesforceApiService } from './sf-api-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OtherPageComponent } from './components/other-page/other-page.component';
import { PersonalDetailsFormComponent } from './components/personal-details-form/personal-details-form.component';

import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule,MatCardModule,MatIconModule,MatButtonToggleModule} from '@angular/material';
import {MatSortModule,MatTableModule} from '@angular/material';
import { RemoteActionsService } from './services/remote-actions';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {MatOptionModule,MatFormFieldModule,MatToolbarModule,MatMenuModule,MatSelectModule,MatInputModule,MatSidenavModule,MatTabsModule } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {Globals} from './globals';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    StaticPathPipe,
    FirstPageComponent,
    OtherPageComponent,
    ToolbarComponent,
    PersonalDetailsFormComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'company-info', component:PersonalDetailsFormComponent},
      { path: 'other-page', component: OtherPageComponent},
      { path: "**", component: FirstPageComponent}
    ]),MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatOptionModule,MatTabsModule,
    MatButtonToggleModule,MatSortModule,MatTableModule,
    MatMenuModule,MatToolbarModule,MatSidenavModule,
   // NgbModule
    
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
