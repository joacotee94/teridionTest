import { Component, OnInit } from '@angular/core';
import {RemoteActionsService} from '../../services/remote-actions';

@Component({
  selector: 'app-sales-graph',
  templateUrl: './sales-graph.component.html',
  styleUrls: ['./sales-graph.component.css']
})
export class SalesGraphComponent implements OnInit {
  chartConfig: Object;
  width = 600;
  height = 400;
  type = "mscolumn2d";
  dataFormat = "json";
  chart:any;
  data ={
    chart:{
      caption:"TOTAL SALES",
      yaxisname:"",
      subcaption:"Current Quarter + Next 3 Calendars Quarters",
      flatscrollbars: "0",
      scrollheight: "12",
      numvisibleplot: "8",
      plottooltext:"<b>$dataValue</b>  $seriesName in $label",
      theme: "fusion"
    },
    categories:[
        {
        category:[
            ]
        }
    ],
    dataset:[
      {
        seriesName:'Qualification',
        data:[]
      },
      {
        seriesName:'Pending Approval',
        data:[]
      }
    ]
  };
  constructor(private remoteAction:RemoteActionsService) { 
    this.remoteAction.getSalesData()
    .then((res)=>{
      var result = res as Array<Object>;
      for (let index = 0; index < result.length; index++) {
        const element = res[index];
        this.data.categories[0].category.push({label : element.name});
        this.data.dataset[0].data.push({value: element.oppMap['Qualification']});
        this.data.dataset[1].data.push({value: element.oppMap['Pending approval']});
      }
      console.log(this.data);
    }).catch((err)=>console.log(err));
    
  }

  ngOnInit() {
  }

}
