import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [NavbarComponent,RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  regForm!: FormGroup;

  constructor(private fb: FormBuilder,private router: Router){}

  ngOnInit(): void {
    this.regForm = this.fb.group({
      fname: ['',Validators.required],
      lname: ['',Validators.required],
      email: ['',[Validators.required,Validators.email]],
    })
  }

  onSubmit(){
    if(this.regForm.valid){
      alert("Success...");
      this.router.navigate(['/login']);
    }
    else{
      console.log("Error...");
    }
  }

  register():void
  {
    
  }
}
