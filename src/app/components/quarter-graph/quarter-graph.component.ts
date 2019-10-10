import { Component, OnInit } from '@angular/core';
import {RemoteActionsService} from '../../services/remote-actions';
@Component({
  selector: 'app-quarter-graph',
  templateUrl: './quarter-graph.component.html',
  styleUrls: ['./quarter-graph.component.css']
})
export class QuarterGraphComponent implements OnInit {

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
      plottooltext:"<b>$seriesName</b> won <b>$dataValue</b> on $label",
      theme: "fusion"
    },
    categories:[
        {
        category:[
            ]
        }
    ],
    dataset:[
      ]
  };
  constructor(private remoteAction:RemoteActionsService) { 
    this.remoteAction.getQuarterGraph()
    .then((res)=>{
      var result = res as Array<Object>;
      console.log('GRAPH===============================');
      console.log(result);
      for(let index = 0 ; index < result[0]['allIds'].length ; index++ ) {
          this.data.dataset.push({ seriesName:result[0]['allIds'][index] as string, data:[] });
      }
      for ( let index = 0; index < result.length; index++ ) {
        const element = res[index];
        this.data.categories[0].category.push({label : element.name});
      }
      for(let index =0 ; index< result.length; index ++){
        for(let j =0 ; j <  this.data.dataset.length ; j++ ) {
          let user = this.data.dataset[j].seriesName;
          if(result[index]['oppMap'][user]== null){
            this.data.dataset[j].data.push({ value: 0});
          }else{
            this.data.dataset[j].data.push({ value: result[index]['oppMap'][user]});
          }
        }
      }
      console.log("Chart Quarter");
      console.log(this.data);
    }).catch((err)=>console.log(err));
    
  }

  ngOnInit() {
  }
}
