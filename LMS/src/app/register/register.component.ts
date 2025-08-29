import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {
  FormBuilder, FormGroup, ReactiveFormsModule,
  Validators, AbstractControl, AsyncValidatorFn, ValidationErrors
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../service/user.service';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { NavbarComponent } from '../home_/navbar/navbar.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NavbarComponent, RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  regForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.regForm = this.fb.group({
      firstName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      lastName: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z]+$'),
        Validators.minLength(2),
        Validators.maxLength(20)
      ]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.maxLength(50)
        ],
        [this.emailExistsValidator(this.userService)]
      ],
      pass: ['', [
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*])[A-Za-z\\d!@#$%^&*]+$'),
        Validators.minLength(8),
        Validators.maxLength(20)
      ]],
      mobileNo: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],
      ubirthDate: ['', [
        Validators.required,
        this.futureDateValidator
      ]]
    });
  }

  onSubmit(): void {
    if (this.regForm.valid) {
      this.userService.registerUser(this.regForm.value).subscribe(
        res => {
          console.log('Form Submitted:', this.regForm.value);
          alert('User registered successfully!');
          this.regForm.reset();
          this.router.navigate(['/login']);
        },
        err => {
          this.regForm.markAllAsTouched();
          console.error('Registration error:', err);
          alert('Registration failed. Please try again.');
        }
      );
    }
  }

  emailExistsValidator(service: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }

      return service.checkEmailExists(control.value).pipe(
        map((exists: boolean) => (exists ? { emailTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }

  futureDateValidator(control: AbstractControl): ValidationErrors | null {
    const inputDate = new Date(control.value);
    const today = new Date();

    // Clear time for accurate comparison
    inputDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return inputDate > today ? { futureDate: true } : null;
  }
}
