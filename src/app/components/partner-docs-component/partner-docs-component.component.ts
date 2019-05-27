import { Component, OnInit } from '@angular/core';
import {Globals} from '../../globals';
import {Document} from '../../classes/Document'
import {RemoteActionsService} from '../../services/remote-actions'
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';
@Component({
  selector: 'app-partner-docs-component',
  templateUrl: './partner-docs-component.component.html',
  styleUrls: ['./partner-docs-component.component.css']
})
export class PartnerDocsComponentComponent implements OnInit {
  bussines: Array<Document>;
  comercial: Array<Document>;
  fileToUpload: File = null;

  constructor(private globals: Globals, private remoteActions :RemoteActionsService,public snackBar: MatSnackBar) {
    this.bussines= new Array<Document>();
    this.comercial= new Array<Document>();

    this.globals.title="DOCUMENTS";
    this.remoteActions.getDocuments()
    .then((result)=>{
      let res = result as object;
      this.bussines = result['business'] as Array<Document>;
      this.comercial = result['coMarketing'] as Array<Document>;
    }).catch((err)=>
      console.log(err)
    );


   }
   ngOnInit() {

   }
   loadDocs() {
    this.remoteActions.getDocuments()
    .then((result)=>{
      let res = result as object;
      this.bussines = result['business'] as Array<Document>;
      this.comercial = result['coMarketing'] as Array<Document>;
    }).catch((err)=>
      console.log(err)
    );
   }

    handleFileInput(files: FileList) {
      this.fileToUpload = files[0];
      var reader = new FileReader();
      reader.onload = (function(file, remoteActions,snackBar,page) {
        return function(e) {
          var contents =e.target.result.split(',')[1];
          if(contents.length < 6000000) {
            remoteActions.uploadDocument(file.name,contents,file.type,'Description','Business Document',file.type)
            .then((res)=>{
              let config = new MatSnackBarConfig();
              config.verticalPosition = 'bottom';
              config.horizontalPosition = 'center';
              config.duration = 2000;
              snackBar.open(res as string,'',config);
              page.loadDocs();
            }).catch((err)=>{
              let config = new MatSnackBarConfig();
              config.verticalPosition = 'bottom';
              config.horizontalPosition = 'center';
              config.duration = 2000;
              snackBar.open(err.message,'',config);
            } );
          } else {
            let config = new MatSnackBarConfig();
            config.verticalPosition = 'bottom';
            config.horizontalPosition = 'center';
            config.duration = 2000;
            snackBar.open("Base 64 Encoded file is too large.  Maximum size is " + 6000000 + " your file is " + contents.length + ".",'',config);
          }

        };
      })(this.fileToUpload,this.remoteActions,this.snackBar,this);   
      reader.readAsDataURL(this.fileToUpload);     

    }
    openSnackBar(message) {
      let config = new MatSnackBarConfig();
      config.verticalPosition = 'bottom';
      config.horizontalPosition = 'center';
      config.duration = 2000;
      this.snackBar.open(message, '', config)
    }


  


}
