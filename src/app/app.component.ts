import { SalesforceApiService } from './sf-api-service';
import { Component, OnInit } from '@angular/core';
import {Globals} from './globals';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private _sfApi: SalesforceApiService, private globals: Globals) {

  }

  title = 'app';

  ngOnInit() {
    this._sfApi.helloAngular("Joacote")
    .subscribe((name) => {
      this.title = name;
    })
  }

}
