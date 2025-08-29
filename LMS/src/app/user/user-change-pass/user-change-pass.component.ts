import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-change-pass',
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './user-change-pass.component.html',
  styleUrl: './user-change-pass.component.css'
})
export class UserChangePassComponent implements OnInit {
  myPass!: string;
  myOldPass!: string;
  confirmPassword!: string;
  passChangeForm!: FormGroup;
  oldPassCheckForm!: FormGroup;
  uId!: number;
  passCheck: boolean = false;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.passChangeForm = this.fb.group({
      pass: ['', [Validators.required, Validators.minLength(6)]],
      confirmPass: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });

    this.oldPassCheckForm = this.fb.group({
      oldPass: ['', [Validators.required]]
    })

    const storedId = localStorage.getItem('userId');
    this.uId = storedId ? parseInt(storedId, 10) : 0;
  }

  passwordMatchValidator(group: AbstractControl): { [key: string]: boolean } | null {
    const password = group.get('pass')?.value;
    const confirmPassword = group.get('confirmPass')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit() {
    if (this.passChangeForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    const newPassword = this.passChangeForm.get('pass')?.value;

    this.userService.updateUserPassword(this.uId, newPassword).subscribe({
      next: res => {
        alert('Password updated successfully!');
        this.router.navigate(['/user/userDashboard']);
      },
      error: err => {
        alert('Failed to update password.');
        console.error(err); // ✅ You'll now see clearer error if it fails
      }
    });
  }

  checkOldPass(): void {
    const enteredOldPass = this.oldPassCheckForm.get('oldPass')?.value;

    this.userService.getUserById(this.uId).subscribe({
      next: (user) => {
        this.myPass = user.pass;

        if (enteredOldPass === this.myPass) {
          alert('Old password match');
          this.passCheck = true;
        } else {
          alert('Old password is incorrect.');
          this.passCheck = false;
        }
      },
      error: (error) => {
        this.passCheck = false;
        if (error.status === 404) {
          console.error('Manager not found');
        } else {
          console.error('Error fetching manager:', error);
        }
      }
    });
  }
}
