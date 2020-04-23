import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {  FormControl, FormBuilder, Validators } from '@angular/forms';
import {AuthenticationService} from '../service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'signUp',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
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
  }

  constructor(
    public formBuilder: FormBuilder,public securityservice: AuthenticationService,public router: Router,
  ) {
    this.form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
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
    debugger;
   
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
  
}
