import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-manager',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './update-manager.component.html',
  styleUrl: './update-manager.component.css',
  providers: [UserService]
})

export class UpdateManagerComponent implements OnInit {
  managerForm!: FormGroup;
  managerId!: number;
  managerData: any = {
    mfirstName: '',
    mlastName: '',
    email: '',
    pass: '',
    mobileNo: ''
  };

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.managerId = +this.route.snapshot.paramMap.get('id')!;

    this.loadManager();

    this.managerForm = this.fb.group({
      mfirstName: ['', Validators.required],
      mlastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      pass: ['']

      // role: ['', Validators.required]
    });
  }

  // buildForm() {

  // }

  loadManager() {
    this.userService.getManagerById(this.managerId).subscribe(
      // next =>{this.manager = next; console.log("data:",next)},      
      (data) => this.managerForm.patchValue(data),
      (error) => console.error('Error loading manager:', error)
    );
  }

 updateManager() {
  if (this.managerForm.invalid) {
    alert('Please fill all required fields correctly.');
    return;
  }

  const updatedManager = {
    ...this.managerForm.value,
    mId: this.managerId   // 👈 Ensure this is assigned correctly
  };
 
  console.log("Payload sent to backend:", updatedManager); // ✅ Debug this

  this.userService.updateManager(updatedManager).subscribe({
    next: res => {
      alert('Manager updated successfully!');
      this.router.navigate(['/admin/viewManagers']);
    },
    error: err => console.error('Error updating manager:', err)
  });
}


}

