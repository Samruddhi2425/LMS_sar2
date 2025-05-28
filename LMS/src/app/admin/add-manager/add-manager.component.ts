import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

interface Managers {
  mId: number;
  mfirstName: string;
  mlastName: string;
  email: string;
  pass: string;
  mobileNo: string;
}

@Component({
  selector: 'app-add-manager',
  templateUrl: './add-manager.component.html',
  styleUrls: ['./add-manager.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
  providers: [UserService]
})
export class AddManagerComponent implements OnInit {

  addManagerForm!: FormGroup;
  managers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.addManagerForm = this.fb.group({
      mfirstName: ['', Validators.required],
      mlastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required]
    });

    this.userService.getManagers().subscribe(
      (data) => {
        this.managers = data;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching managers:', error);
      }
    )
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

  updateManagerBtn() {
    this.router.navigate(['/admin/updateManager']);
  }

  deleteManagerBtn(mId: number) {
    const confirmed = window.confirm('Are you sure you want to delete this item?');

    if (confirmed) {
      // Call your delete service or logic
      this.userService.deleteManager(mId).subscribe(() => {
        console.log('Item deleted:', mId);
        // You can also refresh a list, show success message, etc.
      }, error => {
        console.error('Delete failed:', error);
      });
    } else {
      console.log('Delete cancelled');
    }
  }



}
