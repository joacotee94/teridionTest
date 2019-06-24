import { Component, OnInit } from '@angular/core';
import {Globals} from '../../globals';
import { RemoteActionsService } from '../../services/remote-actions';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.css']
})
export class ResourcesComponent implements OnInit {
  allResources:Array<Object>;
  caseStudies: Array<Object>;
  whitepapers: Array<Object>;
  dataSheets:Array<Object>;
  deploymentGuides:Array<Object>;
  videos:Array<Object>;
  solutionsBriefs:Array<Object>;
  playbooks:Array<Object>;
  competitive:Array<Object>;
  constructor(private globals:Globals,private remoteActions : RemoteActionsService) { 
    this.allResources= new Array<Object>();
    this.globals.title="RESOURCES";
    this.remoteActions.getResource('Case Studies').then((res)=> { 
        this.caseStudies = res as Array<Object>;
        this.allResources = this.allResources.concat(this.caseStudies);
        
    });
    this.remoteActions.getResource('Whitepapers').then((res)=> { 
      this.whitepapers = res as Array<Object>;
      this.allResources =this.allResources.concat(this.whitepapers);

    });
    this.remoteActions.getResource('Data Sheets').then((res)=> { 
      this.dataSheets = res as Array<Object>;
      this.allResources = this.allResources.concat(this.dataSheets);

    });
    this.remoteActions.getResource('Deployment Guides').then((res)=> { 
      this.deploymentGuides = res as Array<Object>;
      this.allResources = this.allResources.concat(this.deploymentGuides);

    });
    this.remoteActions.getResource('Videos').then((res)=> { 
      this.videos = res as Array<Object>;
      this.allResources = this.allResources.concat(this.videos);

    });
    this.remoteActions.getResource('Solutions Briefs').then((res)=> { 
      this.solutionsBriefs = res as Array<Object>;
     this.allResources = this.allResources.concat(this.solutionsBriefs);

    });
    this.remoteActions.getResource('Playbooks').then((res)=> { 
      this.playbooks = res as Array<Object>;
      this.allResources = this.allResources.concat(this.playbooks);

    });
    this.remoteActions.getResource('Competitive').then((res)=> { 
      this.competitive = res as Array<Object>;
      this.allResources = this.allResources.concat(this.competitive);

    });


  }

  ngOnInit() {
  }



}
