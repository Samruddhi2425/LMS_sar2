import { Component } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent,RouterModule,ReactiveFormsModule,CommonModule,RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
      // Handle login logic here
      this.router.navigate(['/home']);
    }
    else{
      alert("login failed...!")
      this.loginForm.reset(); 
    }
  }
}
