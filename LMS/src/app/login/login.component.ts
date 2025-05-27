import { Component } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent,RouterModule,ReactiveFormsModule,CommonModule,RegisterComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
loginForm: FormGroup;

email = '';
  pass = '';

  constructor(private fb: FormBuilder,private router: Router,private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]]
    });
  }



  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     console.log('Form Submitted', this.loginForm.value);
  //     // Handle login logic here
  //     this.router.navigate(['/home']);
  //   }
  //   else{
  //     alert("login failed...!")
  //     this.loginForm.reset(); 
  //   }
  // }

  onLogin() {
    this.authService.login(this.email, this.pass).subscribe(res => {
      if (res.status === 'success') {
        // Save role and redirect
        localStorage.setItem('role', res.role);
        // if (res.role === 'admin') this.router.navigate(['/admin']);
        // else 
        if (res.role === 'manager') this.router.navigate(['/manager']);
        else this.router.navigate(['/userProfile']);
      } else {
        alert('Login failed');
      }
    });
  }
}
