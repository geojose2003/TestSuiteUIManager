import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../service/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  uname ='';
  constructor(private loginService:AuthenticationService){ }
  ngOnInit() {
  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    this.uname = user;    
    return !(user === null);
  }

}
