import { Component, OnInit,Inject } from '@angular/core';
import { RemoteActionsService } from '../../services/remote-actions';
import { Globals } from '../../globals';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogConfig} from '@angular/material';
import {SelectOption} from '../../classes/SelectOption';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  dataSource: Array<Object>;
  displayedColumns = ['FirstName', 'LastName', 'userType', 'Role','Phone','email', 'edit'];
  defaultDialogConfig = new MatDialogConfig();
  config = {
    data:{},
    disableClose: false,
    panelClass: 'custom-overlay-pane-class',
    hasBackdrop: true,
    backdropClass: '',
    width: '60%',
    height: '',
    minWidth: '',
    minHeight: '',
    maxWidth: this.defaultDialogConfig.maxWidth,
    maxHeight: '',
    position: {
      top: '',
      bottom: '',
      left: '',
      right: ''
    },
  };
  constructor(private remoteAction: RemoteActionsService,private globals: Globals,public dialog: MatDialog) {
    this.globals.title='USERS';
   }

  openDialog(): void {
    let dialogRef = this.dialog.open(NewUserDialog, this.config);

    dialogRef.afterClosed().subscribe(result => {
      this.remoteAction.getUsers().then((res) => {this.dataSource = res as Array<Object>}).catch(err=>console.log(err));
    });
  }

  openEditUserDialog(element) {
    this.config.data={userToModify:element};
    let dialogRef = this.dialog.open(EditUserDialog,this.config);
    dialogRef.afterClosed().subscribe(result => {
      this.remoteAction.getUsers().then((res) => {this.dataSource = res as Array<Object>}).catch(err=>console.log(err));
    });
  }

  ngOnInit() {
    this.remoteAction.getUsers().then((res) => {this.dataSource = res as Array<Object>}).catch(err=>console.log(err));
  }

}

@Component({
  selector: 'new-user-dialog',
  templateUrl: './new-user-dialog.html',
  styleUrls: ['./modal-style.css']
})
export class NewUserDialog {

  userTypes:Array<SelectOption>;
  user:FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private remoteActions: RemoteActionsService,public snackBar: MatSnackBar) {
      this.user = this.createUserFrom();
      this.remoteActions.getUserTypes()
      .then((result)=>{
        this.userTypes = result as Array<SelectOption>;
      }).catch();
      
  }
  createUserFrom() {
    return new FormGroup({
      firstName: new FormControl('',[Validators.required]),
      lastName: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      title: new FormControl('',[Validators.required]),
      phone: new FormControl('',[Validators.required]),
      role: new FormControl('',[Validators.required])
    });

   }
  onNoClick(): void {
    this.dialogRef.close();
  }
  closeFile() {
    this.dialogRef.close();
  }
  createUser() {
    this.remoteActions.createUser(this.user.get('firstName').value,this.user.get('lastName').value,this.user.get('email').value,this.user.get('phone').value,this.user.get('title').value,this.user.get('role').value)
    .then(res=> {
      console.log(res);
      this.user.reset();
      this.openSnackBar(res);
      this.dialogRef.close()
    })
    .catch(err=> {
      console.log(err);
      this.openSnackBar(err);
    });
  }

  openSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    this.snackBar.open(message, '', config)
  }

  get firstName() {
    return this.user.get('firstName');
  }

  get lastName() {
    return this.user.get('lastName');
  }
  get email() {
    return this.user.get('email');
  }
  get title() {
    return this.user.get('title');
  }
  get phone() { 
    return this.user.get('phone');
  }
  get role() {
    return this.user.get('role');
  }


}

@Component({
  selector: 'new-user-dialog',
  templateUrl: './new-user-dialog.html',
  styleUrls: ['./modal-style.css']
})
export class EditUserDialog {

  userTypes:Array<SelectOption>;
  user:FormGroup;
  userId:string;
  userToModify;
  constructor(
    public dialogRef: MatDialogRef<NewUserDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,private remoteActions: RemoteActionsService,public snackBar: MatSnackBar) {
      this.userId= data.userToModify.user.Id;
      this.userToModify = data.userToModify
      this.user = this.createUserFrom();
      this.remoteActions.getUserTypes()
      .then((result)=>{
        this.userTypes = result as Array<SelectOption>;
      }).catch();
      
  }
  createUserFrom() {
    return new FormGroup({
      firstName: new FormControl(this.userToModify.user.FirstName,[Validators.required]),
      lastName: new FormControl(this.userToModify.user.LastName,[Validators.required]),
      email: new FormControl(this.userToModify.user.Email,[Validators.required,Validators.email]),
      title: new FormControl(this.userToModify.user.Title,[Validators.required]),
      phone: new FormControl(this.userToModify.user.Phone,[Validators.required]),
      role: new FormControl(this.userToModify.userType,[Validators.required])
    });

   }
  onNoClick(): void {
    this.dialogRef.close();
  }
  closeFile() {
    this.dialogRef.close();
  }
  createUser() {
    this.remoteActions.updateUser(this.userId,this.user.get('firstName').value,this.user.get('lastName').value,this.user.get('email').value,this.user.get('phone').value,this.user.get('title').value,this.user.get('role').value)
    .then(res=> {
      console.log(res);
      this.user.reset();
      this.openSnackBar(res);
      this.dialogRef.close()
    })
    .catch(err=> {
      console.log(err);
      this.openSnackBar(err);
    });
  }

  openSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    this.snackBar.open(message, '', config)
  }

  get firstName() {
    return this.user.get('firstName');
  }

  get lastName() {
    return this.user.get('lastName');
  }
  get email() {
    return this.user.get('email');
  }
  get title() {
    return this.user.get('title');
  }
  get phone() { 
    return this.user.get('phone');
  }
  get role() {
    return this.user.get('role');
  }


}