import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UpdateManagerComponent } from '../../admin/update-manager/update-manager.component';
import { UserService } from '../../service/user.service';
import { NavbarComponent } from '../../home_/navbar/navbar.component';
import { Observable, of, map, catchError } from 'rxjs';

@Component({
  selector: 'app-manager-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NavbarComponent,
    UpdateManagerComponent
  ],
  templateUrl: './manager-register.component.html',
  styleUrls: ['./manager-register.component.css']
})
export class ManagerRegisterComponent implements OnInit {
  registerManagerForm!: FormGroup;
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.registerManagerForm = this.fb.group({
      mfirstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]{2,30}$')]],
      mlastName: ['', [Validators.required, Validators.pattern('^[A-Za-z]{2,30}$')]],
      email: ['', [Validators.required, Validators.email],
    [this.emailExistsValidator(this.userService)]],
      pass: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$')
        ]
      ],
      mobileNo: ['', [Validators.required, Validators.pattern('^[6-9]\\d{9}$')]]
    });
  }

  onSubmit(): void {
    if (this.registerManagerForm.invalid) {
      this.registerManagerForm.markAllAsTouched();
      alert('Please fill in all required fields correctly.');
      return;
    }
    
    this.loading = true;
    this.userService.registerManager(this.registerManagerForm.value).subscribe(
      (res: any) => {
         this.loading = false;
        alert(res.message || 'Manager registered successfully!..... please wait for the admin approval as admin approve you get the mail..!');
        this.registerManagerForm.reset();
        this.router.navigate(['/login']);
      },
      (err: any) => {
         this.loading = false;
        console.error('Registration error:', err);
        alert(err.error?.message || 'Registration failed. Please try again.');
      }
    );
  }

  emailExistsValidator(service: UserService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        console.log("Email already exist");
        return of(null);
      }
        

      return service.checkManagerEmailExists(control.value).pipe(
        map((exists: boolean) => (exists ? { emailTaken: true } : null)),
        catchError(() => of(null))
      );
    };
  }

}
