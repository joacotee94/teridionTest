import { Component, OnInit } from '@angular/core';
import {Globals} from '../../globals';
import { RemoteActionsService } from '../../services/remote-actions';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import {User} from '../../classes/User';
import {SelectOption} from '../../classes/SelectOption';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';

@Component({
  selector: 'app-personal-details-form',
  templateUrl: './personal-details-form.component.html',
  styleUrls: ['./personal-details-form.component.css']
})
export class PersonalDetailsFormComponent implements OnInit {
  user:FormGroup;
  userTypes: Array<SelectOption>
  constructor(private globals: Globals, private remoteActions: RemoteActionsService, private snackBar:MatSnackBar) {
    this.user= this.createDealForm(new User({}));
    this.globals.title='MY COMPANY DETAILS';

    this.remoteActions.getUserInfo()
    .then((result)=> {
      this.user = this.createDealForm(result as User)
    }).catch((err)=>{console.log()})

    this.remoteActions.getUserTypes()
    .then((result)=>{
      this.userTypes = result as Array<SelectOption>;
    }).catch();
    this.remoteActions.getCurrentUserType()
    .then((res)=>{
      let selOpt = res as SelectOption;
      this.user.patchValue({Type:selOpt.value});
    }).catch((err)=>{console.log(err)});
  }

  ngOnInit() {
  }
  createDealForm(user: User) {
    return new FormGroup({
      FirstName: new FormControl(user.FirstName, [Validators.required]),
      LastName: new FormControl(user.LastName, [Validators.required]),
      Title: new FormControl(user.Title, [Validators.required]),
      Email: new FormControl(user.Email, [Validators.required]),
      Phone: new FormControl(user.Phone, [Validators.required]),
      Type: new FormControl('', [Validators.required])
    })
  } 
  
  updateUser(){
    let userObj = new User(this.user.getRawValue());
    this.remoteActions.saveUserInfo(userObj,this.user.getRawValue().Type).then(result=>{this.openSnackBar(result)}).catch(err=>{this.openSnackBar(err)});
  } 

  openSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    this.snackBar.open(message, '', config)
  } 

  get FirstName() {
    return this.user.get('firstName');
  }
  get LastName() {
    return this.user.get('lastName');
  }
  get Title() {
    return this.user.get('title');
  }
  get Email() {
    return this.user.get('email');
  }
  get Phone() {
    return this.user.get('phone');
  }
  get Type() {
    return this.user.get('type');
  }
}
