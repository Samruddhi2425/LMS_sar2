import { Component, OnInit } from '@angular/core';
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
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
    });
  }

  // login(): void {
  //   const email = this.loginForm.value.email;
  //   const password = this.loginForm.value.pass;

  //   this.authService.login(email, password).subscribe(
  //     (res: any) => {
  //       if (res.status === 'success') {
  //         if (res.userType === 'manager') {
  //           this.router.navigate(['/manager']);
  //         } else {
  //           this.router.navigate(['/userProfile']);
  //         }
  //       } else {
  //         this.error = 'Invalid login attempt';
  //       }
  //     },
  //     (err) => {
  //       this.error = 'Login failed';
  //     }
  //   );
  // }


  login(): void {
  const email = this.loginForm.value.email;
  const password = this.loginForm.value.pass;

  this.authService.login(email, password).subscribe(
    (res: any) => {
      if (res.status === 'success') {
        // Save user info in localStorage
        localStorage.setItem('userType', res.userType);

        // Redirect based on user type
        if (res.userType === 'manager') {
          this.router.navigate(['/manager']);
        } else {
          this.router.navigate(['/userProfile']);
        }
      } else {
        this.error = 'Invalid login attempt';
      }
    },
    (err) => {
      this.error = 'Login failed';
    }
  );
}


}