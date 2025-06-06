import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent } from '../../home_/navbar/navbar.component';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,NavbarComponent],
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  emailForm!: FormGroup;
  otpForm!: FormGroup;
  resetForm!: FormGroup;

  step: 'email' | 'otp' | 'reset' = 'email';
  generatedOtp: string = '';
  errorMsg: string = '';
  successMsg: string = '';

  constructor(private fb: FormBuilder,private http:HttpClient,private userService:UserService) { }

  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.otpForm = this.fb.group({
      otp: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]]
    });

    this.resetForm = this.fb.group({
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  

  verifyOtp(): void {
    const enteredOtp = this.otpForm.value.otp?.trim();
    if (enteredOtp === this.generatedOtp) {
      this.step = 'reset';
      this.errorMsg = '';
    } else {
      this.errorMsg = 'Invalid OTP. Please try again.';
    }
  }

  resetPassword(): void {
    const { newPassword, confirmPassword } = this.resetForm.value;

    if (newPassword !== confirmPassword) {
      this.errorMsg = 'Passwords do not match.';
      return;
    }

    this.successMsg = 'Password reset successful (simulated).';
    this.errorMsg = '';
    this.step = 'email'; // Reset to step 1
    this.emailForm.reset();
    this.otpForm.reset();
    this.resetForm.reset();
  }


  emailExists: boolean | null = null;

checkEmail() {
  const email = this.emailForm.get('email')?.value;

  if (!email) {
    alert('Please enter an email first.');
    return;
  }

  this.userService.checkEmailExistsfor(email).subscribe(
    exists => {
      this.emailExists = exists;
      if (exists) {
        
        alert('Email already exists in the system.');
      } else {
        alert('Email is available.');
      }
    },
    error => {
      console.error('Error checking email:', error);
      alert('Failed to check email.');
    }
  );
}
}
