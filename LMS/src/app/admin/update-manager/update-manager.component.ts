import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-update-manager',
  imports: [],
  templateUrl: './update-manager.component.html',
  styleUrl: './update-manager.component.css',
  providers: [UserService]
})

export class UpdateManagerComponent implements OnInit {
  managerForm!: FormGroup;
  managerId!: number;
  roles: string[] = ['Admin', 'Manager', 'Viewer'];

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.managerId = +this.route.snapshot.paramMap.get('id')!;
    this.buildForm();
    this.loadManager();
  }
 
  buildForm() {
    this.managerForm = this.fb.group({
      mfirstName: ['', Validators.required],
      mlastName:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobileNo: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  loadManager() {
    this.userService.getManagerById(this.managerId).subscribe(
      (data) => this.managerForm.patchValue(data),
      (error) => console.error('Error loading manager:', error)
    );
  }

  updateManager() {
    if (this.managerForm.invalid) {
      alert('Please fill all required fields correctly.');
      return;
    }

    this.userService.updateManager(this.managerId, this.managerForm.value).subscribe({
      next: () => {
        alert('Manager updated successfully!');
        this.router.navigate(['/admin/viewManagers']);
      },
      error: (err) => console.error('Error updating manager:', err)
    });
  }
}

