import { Injectable } from '@angular/core';

declare class Visualforce {
    static remoting: { Manager: { invokeAction: any } };
  }

@Injectable()
export class RemoteActionsService {

    
    constructor() {
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

    getOpportunities() {
        return new Promise((resolve, reject) => {
          this.callRemote('sftestcontroller.getOpportunities', [], resolve, reject)
        })
      }
}