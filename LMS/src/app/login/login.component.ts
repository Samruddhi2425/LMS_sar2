import { Component } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent,RouterModule,ReactiveFormsModule,CommonModule,RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm: FormGroup;

constructor(fb: FormBuilder){
  this.loginForm = fb.group({
    email: fb.control('',[Validators.required]),
    pass: fb.control('',Validators.required)
  })
}

onSubmit() {
throw new Error('Method not implemented.');
}

login(){
  
}

}
