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
      mfirstName: ['',Validators.required],
      mlastName: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
      // pass:['',[Validators.required]],
      mobileNo:['',[Validators.required]],
    });  
    
  }
  

  
 onSubmit() {  
  const formValues = this.addManagerForm.value;
    
    const password = formValues.mfirstName + '123';

    const fullData = {
      ...formValues,
      pass:password
    };

    // Set password only now
     this.addManagerForm.get('pass')?.setValue(password);

    if (this.addManagerForm.valid) {
      this.userService.registerManager(fullData).subscribe(
        res => {
          const password = this.addManagerForm.get('mfirstName')?.value+'123';
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
