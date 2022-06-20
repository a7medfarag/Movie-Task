import { JwtService } from '../../core/services/jwt.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  loginForm: FormGroup;
  constructor(private fb: FormBuilder, private jwt: JwtService, private router: Router , private toastr:ToastrService) { }

  ngOnInit(): void {
    this.buildForm()
  }

  onSubmit(){
    this.submitted =true;
    if(this.loginForm.valid){
        this.jwt.login(this.loginForm.value).subscribe(res=>{
          this.toastr.success('You Logged In Successfully' , 'Logged In')
        this.jwt.setToken(res['authorisation'].token);
        this.router.navigate(['/movie-list'])
      },
      err=>{
        this.toastr.error(err.message , 'Please Follow The Log in criteria')
      }
      )
    }
  }

  get f (){
    return this.loginForm.controls;
  }
  buildForm(){
    this.loginForm = this.fb.group({
      'email': ['',[Validators.email, Validators.required]],
      'password': ['', [Validators.required, Validators.min(2)]]
    })
  }
}
