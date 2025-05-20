import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './home_/home/home.component';
import { NavbarComponent } from './home_/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HomeComponent,NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LMS';
}
