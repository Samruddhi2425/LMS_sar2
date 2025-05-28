import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-manager',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-manager.component.html',
  styleUrl: './add-manager.component.css'
})
export class AddManagerComponent{

  addManagerForm: FormGroup;

  constructor(private fb: FormBuilder,private router: Router, private userService:UserService){
    this.addManagerForm=this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      // pass:['',[Validators.required]],
      mobileNo:['',[Validators.required]],
    });  
    this.addManagerForm.get('firstName')?.valueChanges.subscribe(firstName => {
      const password = (firstName || '') + '123';
      this.addManagerForm.get('pass')?.setValue(password);
    });
  }
  // ngOnInit(): void {
  //   // Subscribe to changes in the firstName field
  //   this.addManagerForm.get('firstName')?.valueChanges.subscribe(firstName => {
  //     const password = (firstName || '') + '123';
  //     this.addManagerForm.get('pass')?.setValue(password);
  //   });
  // }

  
 onSubmit() {  
  const formValues = this.addManagerForm.value;
    
    const password = formValues.firstName + '123';

    const fullData = {
      ...formValues,
      pass: password
    };

    // Set password only now
    // this.addManagerForm.get('pass')?.setValue(password);

    console.log('Form submitted with:', fullData);

    if (this.addManagerForm.valid) {
      this.userService.registerManager(this.addManagerForm.value).subscribe(
        res => {
          const password = this.addManagerForm.get('firstName')?.value+'123';
          pass:password;
          alert('Manager registered successfully!');
          this.addManagerForm.reset(); 
        },
        err => {
          console.error('Registration error:', err);
          alert('Registration failed. Please try again.');
          console.log(this.addManagerForm.value);
        }
      );
    }
  }
}
