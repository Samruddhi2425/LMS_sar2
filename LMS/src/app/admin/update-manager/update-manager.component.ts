import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-update-manager',
  imports: [RouterModule,FormsModule ,CommonModule],
  templateUrl: './update-manager.component.html',
  styleUrl: './update-manager.component.css'
})
export class UpdateManagerComponent {

  mId!: number;
  // book: any = {
  //   base64Image: '',
  // imageName: '' // Stores the filename
  // };
  manager:any={
    mfirstName:'',
    mlastName:'',
    email:'',
    mobileNo:''
  };

   constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}


  ngOnInit(): void {
    this.mId = +this.route.snapshot.paramMap.get('id')!;
    this.loadManager();
  }
  loadManager() {

    this.userService.getManagerById(this.mId).subscribe(
      next => {  this.manager = next;console.log("data:",next)},
    
      error => { console.error('Error loading book:', error)}
    );
      //console.log(this.book.bookIamage);

  }

  // onFileChange(event: any) {
  // const file = event.target.files[0];
  // if (!file) return;
  
  // }

  updateManager() {
     console.log("Submitting book to backend:", this.manager); // Add this line
    this.userService.updateManager(this.manager).subscribe({
      next: res => {
        console.log("res"+res);
        alert('Manager updated successfully!');
        this.router.navigate(['/admin/addManager']); // Navigate back after update
      
      },
      error: err => console.error('Error updating manager:', err)
      
    });
  }

  deleteManager(){
    
  }
}
