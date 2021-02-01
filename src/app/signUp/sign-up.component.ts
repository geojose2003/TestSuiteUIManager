import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { HttpClientService, Portal } from "../service/httpclient.service";
import {  FormControl, FormBuilder, Validators } from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import { Router } from '@angular/router';
import {SignUpService} from '../service/sign-up.service';
import { NgxSpinnerService } from "ngx-spinner";

export class DropData {
  constructor(
    public id: number,
    public dropValue: string,
   
  ) {}
}

@Component({
  selector: 'signUp',
  templateUrl: './sign-up.component.html'
})
export class SignUpComponent implements OnInit {
  hide=true;
  userlist: any;
  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
    industry: new FormControl(''),
    categoryName: new FormControl(''), 
    clientName: new FormControl(''),
    emailId: new FormControl('')
  });
  
  pass :string='';
  cepass :string  ='';
  error :string  ='';

  error_messages = {
    'username': [
      { type: 'required', message: 'First Name is required.' },
    ],

    

    'password': [
      { type: 'required', message: 'password is required.' },
      { type: 'minlength', message: 'password length.' },
      { type: 'maxlength', message: 'password length.' }
      
    ],
    'confirmpassword': [
      
      {type: 'confirmPassword' ,message: 'password Not matched' }
    ],
    'industry': [
      { type: 'required', message: 'BusinessUnit is required.' },
    ],
    'emailId': [
      { type: 'required', message: 'EmailId is required.' },
    ],
    'categoryName': [
      { type: 'required', message: 'SubBusiness Unit is required.' },
    ],
    'clientName': [
      { type: 'required', message: 'Client Name is required.' },
    ],
  }

  constructor(
    public formBuilder: FormBuilder,public securityservice: AuthenticationService,public router: Router,public signUpService: SignUpService,private spinner: NgxSpinnerService
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.required
      ])),
      
      industry: new FormControl('', Validators.compose([
        Validators.required
      ])),
      categoryName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      clientName: new FormControl('', Validators.compose([
        Validators.required
      ])),
      emailId: new FormControl('', Validators.compose([
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)
      ])),

      confirmpassword: new FormControl('', Validators.compose([
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30),
        

      ])),
    }, { 
      validators: this.password.bind(this)
    });
  }

  ngOnInit() {
  }

  Industry: any = ['HealthCare','Retail']
  ClientName: any = []
  CategoryName: any = []
  PortalName: any =[]
  

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('password');
    const { value: confirmPassword } = formGroup.get('confirmpassword');
    return password === confirmPassword ? null : {
       passwordNotMatch: true 
       
      };
  }

  validatepassword(){
   
    if(this.pass==this.cepass){
        
        this.error=""
    }else{
      this.error="password mismatch"
    }

  }
  submit() {
   // debugger;
    

      this.securityservice.register(this.form.value).subscribe((data)=>{
        
        if(data){
          console.log("User regestired Successfully")
          alert("User created successfully")
          this.router.navigate(["/login"])
        }
      },(err)=>{
        console.log("failure")
      })
    }
    changeDrop(e,drop){
      
      this.spinner.show();
      var dropvalue=e.target.value;
      console.log("event value"+dropvalue);
      if(drop=='industry'){
      this.CategoryName=[];
      }else if(drop=='category'){
        this.ClientName=[];
      }else if(drop=='client'){
        this.PortalName=[];
      }
      this.signUpService.getvalueForRegistration(dropvalue,drop).subscribe((data)=>{
        if(data){
        this.userlist=data;
        for (let i = 0; i < data.length; i++) {
          let dropValue=this.userlist[i].dropValue;
         if(drop=='industry'){
          this.CategoryName.push(dropValue);
         }else if(drop=='category'){
          this.ClientName.push(dropValue);
         }else if(drop=='client'){
          this.PortalName.push(dropValue);
         }
         
        }
        this.spinner.hide();
      }
      },(err)=>{
        console.log("failure"+err.log);
      })
    }
  
}
  
