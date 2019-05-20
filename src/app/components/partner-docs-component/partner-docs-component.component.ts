import { Component, OnInit } from '@angular/core';
import {Globals} from '../../globals';
import {Document} from '../../classes/Document'
import {RemoteActionsService} from '../../services/remote-actions'
@Component({
  selector: 'app-partner-docs-component',
  templateUrl: './partner-docs-component.component.html',
  styleUrls: ['./partner-docs-component.component.css']
})
export class PartnerDocsComponentComponent implements OnInit {
  bussines: Array<Document>;
  comercial: Array<Document>;
  fileToUpload: File = null;

  constructor(private globals: Globals, private remoteActions :RemoteActionsService) {
    this.bussines= new Array<Document>();
    this.comercial= new Array<Document>();

    this.globals.title="DOCUMENTS";
    this.remoteActions.getDocuments()
    .then((result)=>{
      let res = result as object;
      this.bussines = result['business'] as Array<Document>;
      this.comercial = result['coMarketing'] as Array<Document>;
      let obj={
        id:'identifierModuleUrl',
        attName:'BUSSINES DOCUMENT TITLE',
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
        documentName:'BUSSINES DOCUMENT TITLE'
      }
      let docc= new Document(obj);
      this.bussines.push(docc);
      this.comercial.push(docc);
    }).catch((err)=>
      console.log(err)
    );


   }
   ngOnInit() {

   }
    handleFileInput(files: FileList) {
      const formData: FormData = new FormData();
      formData.append('fileKey',this.fileToUpload,this.fileToUpload.name);
      var reader = new FileReader();
      reader.onload = function(e) {
        var text = reader.result;
        console.log(text );
        var body =reader.readAsText(files.item(0) , 'utf-8');
      }    
     

    }


  


}
