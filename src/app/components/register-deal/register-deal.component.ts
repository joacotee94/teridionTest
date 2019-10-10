import { Component, OnInit } from '@angular/core';
import { Globals } from '../../globals';
import { SelectOption } from '../../classes/SelectOption';
import { RemoteActionsService } from '../../services/remote-actions';
import {
  MatSnackBar,
  MatSnackBarConfig
} from '@angular/material';
import { FormControl, Validators, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-register-deal',
  templateUrl: './register-deal.component.html',
  styleUrls: ['./register-deal.component.css']
})
export class RegisterDealComponent implements OnInit {
  dealForm: FormGroup;

  public allUseCases: Array<SelectOption>;

  constructor(private globals: Globals, private remoteActions: RemoteActionsService, public snackBar: MatSnackBar) {
    this.dealForm = this.createDealForm();
    globals.title = 'REGISTER DEAL';
    this.remoteActions.getUseCasesForCreation()
    .then(res => {
      this.allUseCases = res as Array<SelectOption>;
      console.log(res);
    }).catch(err => console.log(err));
  }
  createDealForm() {
    return new FormGroup({
      accountName: new FormControl('', [Validators.required]),
      oppName: new FormControl('', [Validators.required]),
      selectedUseCase: new FormControl('', [Validators.required]),
      closeDate: new FormControl(new Date(), [Validators.required]),
      mrr: new FormControl(0, []),
      contactFirstName: new FormControl('', [Validators.required]),
      contactLastName: new FormControl('', [Validators.required]),
      contactTitle: new FormControl('', [Validators.required]),
      contactEmail: new FormControl('', [Validators.required,Validators.email]),
      contactPhone: new FormControl('', []),
      contactDetails: new FormControl('', [])
    });
  }

  ngOnInit() {
  }

  createNewDeal() {
    this.remoteActions.registerDeal(this.dealForm.get('accountName').value, this.dealForm.get('oppName').value, this.dealForm.get('selectedUseCase').value.join(';'), this.dealForm.get('closeDate').value.toUTCString(), this.dealForm.get('mrr').value, this.dealForm.get('contactFirstName').value, this.dealForm.get('contactLastName').value, this.dealForm.get('contactTitle').value, this.dealForm.get('contactEmail').value, this.dealForm.get('contactPhone').value, this.dealForm.get('contactDetails').value)
      .then(res => {
        this.openSnackBar(res);
        var s = res as string;
        if(s.includes('submitted')) {
          this.dealForm.reset();
        }
      })
      .catch(err => this.openSnackBar(err));

  }
  openSnackBar(message) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = 'bottom';
    config.horizontalPosition = 'center';
    config.duration = 2000;
    this.snackBar.open(message, '', config)
  }
  get accountName() {
    return this.dealForm.get('accountName');
  }
  get oppName() {
    return this.dealForm.get('oppName');
  }
  get selectedUseCase() {
    return this.dealForm.get('selectedUseCase');
  } 
  get closeDate() {
    return this.dealForm.get('closeDate');
  } 
  get mrr() {
    return this.dealForm.get('mrr');
  } 
  get contactFirstName() {
    return this.dealForm.get('contactFirstName');
  } 
  get contactLastName() {
    return this.dealForm.get('contactLastName');
  } 
  get contactTitle() {
    return this.dealForm.get('contactTitle');
  }
  get contactEmail() {
    return this.dealForm.get('contactEmail');
  } 
  get contactPhone() {
    return this.dealForm.get('contactPhone');
  } 
  get contactDetails() {
    return this.dealForm.get('contactDetails');
  }
}
