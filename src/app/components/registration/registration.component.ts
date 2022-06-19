import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registered:boolean = false;
  
  registerUserData:FormGroup;
  isSuccessful:boolean = false;
  errMessage:string;
  get name(){
    return this.registerUserData.get('name');
  }
  get email(){
    return this.registerUserData.get('email');
  }
  constructor(private fb: FormBuilder, private jwt: JwtService, private _router: Router) { }

  ngOnInit(): void {
    this.buildForm()
  }

  registerUser(){
    this.registered = true;
    if(this.registerUserData.valid){
      
      this.jwt.register(this.registerUserData.value )
      .subscribe(
          (res:any) => {
            if(res.status == 'failed'){
              this.errMessage = res.message.email[0]
              console.log(res.message.email[0]);
            }
            else{
              // this.jwt.se
              this._router.navigate(['/login']);
            }
            
          },
          error=> (error: any) => {
            console.log(error.status);
            
              this.registered = false;
          }
      );
    }
  
       
  
  }
  get f (){
    return this.registerUserData.controls;
  }
  buildForm(){
    this.registerUserData = this.fb.group({
      'name':['',[Validators.required , Validators.minLength(5)]],
      'email': ['',[Validators.email, Validators.required]],
      'password': ['', [Validators.required, Validators.minLength(6)]]
    })
  }
 

}


