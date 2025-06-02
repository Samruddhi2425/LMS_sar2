import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { RegisterComponent } from '../register/register.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  imports: [NavbarComponent, RouterModule, ReactiveFormsModule, CommonModule, RegisterComponent],
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
  ) { }


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
    });

    const pending = localStorage.getItem('pendingAction');

    if (pending) {
      const action = JSON.parse(pending);

      if (action.type === 'issue') {
        this.router.navigate(['/issue-book', action.bookId]); // or call issueBookToUser(action.bookId)
      }

      localStorage.removeItem('pendingAction'); // Clear after use
    } else {
      // default redirect logic
      this.router.navigate(['/userProfile']);
    }
  }

  login(): void {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.pass;

    if (email === 'admin123@gmail.com' && password === 'admin123') {
      localStorage.setItem('userType', 'admin');
      localStorage.setItem('isLoggedIn', 'true'); // optional if used
      this.router.navigate(['/admin']);
    }
    else {
      this.authService.login(email, password).subscribe(
        (res: any) => {
          if (res.status === 'success') {
            // Save user info in localStorage
            localStorage.setItem('userType', res.userType);
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userId', res.userId);
            console.log(res);
            // localStorage.setItem('token', res.token); // optional, if your API returns a token

            // Redirect based on user type
            if (res.userType === 'manager') {
              this.router.navigate(['/manager']);
            } else {
              this.router.navigate(['/home']);
              this.issueBookToUserAfterLogin();
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

  issueBookToUserAfterLogin() {
  //const userId = this.authService.getUserId(); // From token/session
  ///make 
  // const issuedBook = {
  //   userId: userId,
  //   bookId: this.selectedBook.id,
  //   issueDate: new Date(),
  // };

  // this.bookService.issueBook(issuedBook).subscribe((res) => {
  //   if (res.success) {
  //     alert('Book issued successfully!');
  //   }
  // });
}

}