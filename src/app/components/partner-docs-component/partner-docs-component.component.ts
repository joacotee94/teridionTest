import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
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
  defaultDialogConfig = new MatDialogConfig();
  config = {
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '60%',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: '60%',
    maxHeight: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },

  };

  constructor(private globals: Globals, private remoteActions :RemoteActionsService,public snackBar: MatSnackBar,public dialog: MatDialog) {
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
   openDialog(): void {
    let dialogRef = this.dialog.open(DocDialog, this.config);

    dialogRef.afterClosed().subscribe(result => {
      this.loadDocs();
      console.log('The dialog was closed');
    });
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


@Component({
  selector: 'upload-doc-dialog',
  template: `
  <p>Document Description</p>
  <div class="example-container">
  <mat-form-field>
    <input matInput class="input" placeholder="Name" (input)="name = $event.target.value;" >
  </mat-form-field>
  <mat-form-field>
    <input matInput class="input" placeholder="Description" (input)="description = $event.target.value;">
  </mat-form-field>
  <input type="file" id="file" (change)="changefile($event.target.files)">
  </div>

  <button type="button" (click)="handleFileInput()">Upload</button>`,
  styleUrls: ['modal-style.css']
})
export class DocDialog {
  fileToUpload:File;
  name:string;
  description:string;
  constructor(
    public dialogRef: MatDialogRef<DocDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private remoteActions: RemoteActionsService,public snackBar: MatSnackBar) { }

  onNoClick(): void {
   
  }
  changefile(files: FileList) {
    this.fileToUpload = files[0];
  }
  handleFileInput() {
    if(this.fileToUpload!=null){
      var reader = new FileReader();
      reader.onload = (function(file, remoteActions,snackBar,dialogRef,name,desc) {
        return function(e) {
          var contents =e.target.result.split(',')[1];
          if(contents.length < 6000000) {
            remoteActions.uploadDocument(file.name,contents,name,desc,'Business Document',file.type)
            .then((res)=>{
              let config = new MatSnackBarConfig();
              config.verticalPosition = 'bottom';
              config.horizontalPosition = 'center';
              config.duration = 2000;
              snackBar.open(res as string,'',config);
              dialogRef.close();

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
      })(this.fileToUpload,this.remoteActions,this.snackBar,this.dialogRef,this.name,this.description);   
      reader.readAsDataURL(this.fileToUpload);
    }     

  }

}
