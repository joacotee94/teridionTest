import { SalesforceHashLocationStrategy } from './util/sf-path-location-strategy';
import { LocationStrategy } from '@angular/common';
import { FirstPageComponent } from './components/first-page/first-page.component';
import { StaticPathPipe } from './pipes/static-path.pipe';
import { SalesforceApiService } from './sf-api-service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OtherPageComponent } from './components/other-page/other-page.component';
import { RouterModule } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule,MatCardModule,MatIconModule,MatButtonToggleModule} from '@angular/material';
import {MatSortModule,MatTableModule} from '@angular/material';
import { RemoteActionsService } from './services/remote-actions';



@NgModule({
  declarations: [
    AppComponent,
    StaticPathPipe,
    FirstPageComponent,
    OtherPageComponent 
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'other-page', component: OtherPageComponent},
      { path: "**", component: FirstPageComponent}
    ]),MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonToggleModule,MatSortModule,MatTableModule
    
  ],
  providers: [
    SalesforceApiService,
    {
      provide: LocationStrategy,
      useClass: SalesforceHashLocationStrategy
    },
    RemoteActionsService
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
