import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css'],
  imports:[CommonModule,ReactiveFormsModule],
  providers: [UserService]
})
export class AddManagerComponent implements OnInit {

  addManagerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.addManagerForm = this.fb.group({
      mfirstName: ['', Validators.required],
      mlastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.addManagerForm.invalid) {
      this.addManagerForm.markAllAsTouched();
      alert('Please fill in all required fields correctly.');
      return;
    }

    const formValues = this.addManagerForm.value;
    const password = formValues.mfirstName + '123';

    const fullData = {
      ...formValues,
      pass: password
    };

    this.userService.registerManager(fullData).subscribe(
  (res: any) => {
    alert(res.message || 'Manager registered successfully!');
    this.addManagerForm.reset();
    this.router.navigate(['/login']);
  },
  (err: any) => {
    console.error('Registration error:', err);
    alert(err.error?.message || 'Registration failed. Please try again.');
  }
);
  }
}
