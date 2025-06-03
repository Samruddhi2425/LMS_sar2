import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-register',
  imports: [NavbarComponent,RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup;
 
  constructor(private fb: FormBuilder,private router: Router, private userService:UserService){
    this.regForm=this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required, Validators.minLength(6)]],
      mobileNo: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')  // Only 10 digits allowed
      ]]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  
 onSubmit() {
    if (this.regForm.valid) {
      this.userService.registerUser(this.regForm.value).subscribe(
        res => {
          console.log('Form Submitted:', this.regForm.value);
          alert('User registered successfully!');
          this.regForm.reset(); 
        },
        err => {
          this.regForm.markAllAsTouched();
          console.error('Registration error:', err);
          alert('Registration failed. Please try again.');
          console.log(this.regForm.value);
        }
      );
    }
  }



}

