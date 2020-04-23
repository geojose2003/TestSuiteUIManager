import { Injectable } from '@angular/core';
import {Portal} from "../service/view-portal.service";
import {SpinnerService} from "../service/spinner.service";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";

@Injectable()
export class DialogBoxService {

  _contactList: Portal[] = [];

  constructor(private httpClient: HttpClient,private spinner: NgxSpinnerService) { }
  private jwt() {

    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    //return new RequestOptions({ headers: headers });
    var token = localStorage.getItem("token")
    let options = {};
    if (token) {
      options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' ,
          'x-access-token':token,
          'Authorization':token
        }
      }
    }
    else {
      options = {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    }
    return options;

  }
  addContact(contact: Portal) {
    contact.portalID = this._contactList.length + 1;
    this._contactList.push(contact);
  }

  editPortal(field: FormData) {
    
    let portal = {
      "portalID" : field.get("portalID").toString(),
      "portalName" : field.get("portalName").toString(),
      "moduleName" : field.get("moduleName").toString(),
      "field" : field.get("field").toString(),
      "sampleData" : field.get("sampleData").toString(),
      "portalUrl" : field.get("portalUrl").toString(),
      "clientName" : field.get("clientName").toString(),
      "industry" : field.get("industry").toString(),
      "navigate" : field.get("navigate").toString()
     
    };
    this.spinner.show();
    return this.httpClient
    .post<any>("http://localhost:8083/testSuiteAPIService/editPortal", portal,this.jwt())
    .pipe(
      map(userData => {
        this.spinner.hide();
        return userData;
      })
    );
  }

  deleteContact(id: number) {
    const contact = this._contactList.findIndex(c => c.portalID === id);
    this._contactList.splice(contact, 1);
  }

  getAllContacts() {
    return this._contactList;
  }

}
