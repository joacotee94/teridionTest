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
      caption:"",
      yaxisname:"",
      subcaption:"",
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
    dataset:[]
  };
  constructor(private remoteAction:RemoteActionsService) { 
    this.remoteAction.getSalesData()
    .then((res)=>{
      var result = res as Array<Object>;
      var getKeys=  Object.keys(res[0].oppMap);
      for(var keyI=0;keyI<getKeys.length;keyI++) {
        var label = getKeys[keyI] as string;
        this.data.dataset.push({seriesName: label,data:[]});
      }

      for (let index = 0; index < result.length; index++) {
        const element = res[index];
        this.data.categories[0].category.push({label : element.name});
        var keys = Object.keys(element.oppMap);
        for(var keyI = 0; keyI < keys.length; keyI++) {
          
          this.data.dataset[keyI].data.push({value: element.oppMap[this.data.dataset[keyI].seriesName]});
        }
      }
      console.log(this.data);
    }).catch((err)=>console.log(err));
    
  }

  ngOnInit() {
  }

}
