import { Component } from '@angular/core';
import { NavbarComponent } from '../home_/navbar/navbar.component';
import { BookdescriptionComponent } from '../home_/bookdescription/bookdescription.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-genre',
  imports: [NavbarComponent,BookdescriptionComponent,RouterModule,NavbarComponent],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.css'
})
export class GenreComponent {

}
