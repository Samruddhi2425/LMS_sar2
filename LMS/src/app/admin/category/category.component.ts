import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { GetbooksService } from '../../service/getbooks.service';
import { FormBuilder } from '@angular/forms';
interface Genre {
  genreId: number;
  genre: string;
}
@Component({
  selector: 'app-category',
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent implements OnInit {
  // fb: any;
  addGenreForm!: FormGroup;
  genres: any[] = [];


  constructor(private getBooksService: GetbooksService,private router: Router,private fb: FormBuilder ) { }
  ngOnInit(): void {
    this.addGenreForm = this.fb.group({
       genre: ['', Validators.required],
    });
        this.loadgenre();
   
  }
  loadgenre(){
   this.getBooksService.getGenre().subscribe(
      (data) => {
        this.genres = data;
        console.log(this.genres);
      },
      (error) => {
        console.error('Error fetching managers:', error);
      }
    )
  }

  onSubmit(): void {
    if (this.addGenreForm.invalid) {
      this.addGenreForm.markAllAsTouched();
      alert('Please fill in all required fields correctly.');
      return;
    }

    this.getBooksService.addGenre(this.addGenreForm.value).subscribe(
      (res: any) => {
        alert(res.message || 'Genre added successfully!');
        this.addGenreForm.reset();
          this.loadgenre();
   
      },
      (err: any) => {
        console.error('error:', err);
        alert(err.error?.message || 'Something went wrong!. Please try again.');
      }
    );
  }
  

  deleteCategory(Id: number) {
    const confirmed = window.confirm('Are you sure you want to delete this category?');
    if (confirmed) {
      // Call your delete service or logic
      this.getBooksService.deleteGenre(Id).subscribe(() => {
        console.log('Item deleted:', Id);
        // You can also refresh a list, show success message, etc.
      }, error => {
        console.error('Delete failed:', error);
      });
    } else {
      console.log('Delete cancelled');
    }
  }
}
