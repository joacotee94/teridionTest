import { Injectable } from '@angular/core';
import {Globals} from '../globals';
import { reject } from 'q';
declare class Visualforce {
    static remoting: { Manager: { invokeAction: any } };
  }

@Injectable()
export class RemoteActionsService {

    
    constructor(private globals: Globals) {
    }

    private callRemote(methodName, params, resolve, reject) {
        console.log(params)
        Visualforce.remoting.Manager.invokeAction(
          methodName,
          ...params,
          function (result, event) {
            console.log({ event })
            console.log({ result })
            if (event.status) {
              resolve(result)
            }
          }
        );
    }
    isAdmin() {
      return new Promise((resolve,reject) => {
        this.callRemote('CommunityFachadeController.getIsAdmin',[],resolve,reject)
      })
    }

    //Oportunity component
    getOpportunities(isAdmin,userIds,ownerSelected,useCaseSelected,stageSelected,account,createdDate,closeDate,probability) {
        return new Promise((resolve, reject) => {
          this.callRemote('CommunityFachadeController.getOpportunities', [isAdmin,userIds,ownerSelected,useCaseSelected,stageSelected,account,createdDate,closeDate,probability], resolve, reject)
        })
    }
    getAllUsers() {
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.getUser',[],resolve,reject)
      })
    }
    getUseCases() {
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.getUseCase',[],resolve,reject)
      })
    }
    getUseCasesForCreation() {
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.getUseCaseForCreation',[],resolve,reject)
      })
    }    

    getStage() {
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.getStage',[],resolve,reject)
      })
    }
    registerDeal(accountName,oppName,selectedUseCase,closeDate,mrr,contactFirstName, contactLastName,contactTitle,contactEmail,  contactPhone,contactDetails) {
      return new Promise((resolve,reject)=> { 
        this.callRemote('CommunityFachadeController.registerNewDeal',[accountName,oppName,selectedUseCase,closeDate,mrr,contactFirstName, contactLastName,contactTitle,contactEmail,  contactPhone,contactDetails],resolve,reject)
      }) 
    }
    getOppForHomePage() { 
      return new Promise((resolve,reject)=>{
        this.callRemote('CommunityFachadeController.getOppsForHomePage',[],resolve,reject)
      })
    }
    getSalesData() {
      return new Promise((resolve,reject)=>{
        this.callRemote('CommunityFachadeController.getSalesGraphData',[],resolve,reject)
      })
    }

    getDocuments() {
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.getPartnerDocs',[],resolve,reject)
      })
    }

    uploadDocument(docName,attachmentBody,attName,attDesctiption,docType,filetype) {
      return new Promise((resolve,reject)=> { 
        this.callRemote('CommunityFachadeController.uploadFile',[docName,attachmentBody,attName,attDesctiption,docType,filetype],resolve,reject)
      })
    }
    getUserName() {
      return new Promise((resolve,reject)=>{
        this.callRemote('CommunityFachadeController.getUserName',[],resolve,reject)
      })
    }
    getUserInfo(){
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.getUserInfo',[],resolve,reject)
      })
    }
    getPartnerInfo(){
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.getPartner',[],resolve,reject)
      })
    }

    saveUserInfo(user,recordType) {
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.saveUserInfo',[user,recordType],resolve,reject)
      })
    }
    savePartenerInfo(partner) {
      return new Promise((resolve,reject)=>{
        this.callRemote('CommunityFachadeController.savePartner',[partner],resolve,reject)
      })
    }
    getUserTypes(){ 
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.getUserTypes',[],resolve,reject)
      })
    }
    getCurrentUserType() {
      return new Promise((resolve,reject)=> {
        this.callRemote('CommunityFachadeController.getCurrentUserType',[],resolve,reject)
      })
    }
    updateOppNote(id,val) {
      return new Promise((resolve,reject)=>{
        this.callRemote('CommunityFachadeController.updateNote',[id,val],resolve,reject)
      })
    }
}